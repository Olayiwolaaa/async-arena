import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import express, { Request, Response } from "express";
import { PriceEngine, PriceUpdate } from "./priceEngine";

const app = express();
const engine = new PriceEngine();
const server = createServer(app);

// --- Pattern 1: Short Polling ---
app.get("/api/short-poll", (_req: Request, res: Response) => {
    res.json(engine.getLatest());
});

// --- Pattern 2: Long Polling ---
app.get("/api/long-poll", (req: Request, res: Response) => {
    const onPrice = (update: PriceUpdate) => {
        res.json(update);
    };

    engine.once("price", onPrice);

    req.on("close", () => {
        engine.removeListener("price", onPrice);
    });
});

// --- Pattern 3: Server-Sent Events ---
app.get("/api/sse", (req: Request, res: Response) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    res.write(":\n\n");

    const onPrice = (update: PriceUpdate) => {
        res.write(`data: ${JSON.stringify(update)}\n\n`);
    };

    engine.on("price", onPrice);

    req.on("close", () => {
        engine.removeListener("price", onPrice);
    });
});

// --- Pattern 4: WebSocket ---
const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws: WebSocket) => {
    let subscribed = true;

    const onPrice = (update: PriceUpdate) => {
        if (subscribed && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(update));
        }
    };

    engine.on("price", onPrice);

    // clients can send "subscribe" / "unsubscribe" to control the stream
    ws.on("message", (msg: Buffer) => {
        const command = msg.toString().trim().toLowerCase();
        if (!["subscribe", "unsubscribe"].includes(command)) {
            ws.send(JSON.stringify({ error: "Unknown command. Use `subscribe` or `unsubscribe`." }));
            return;
        }
        subscribed = command === "subscribe";
    });

    ws.on("close", () => {
        engine.removeListener("price", onPrice);
    });
});

const PORT = 3001;
engine.start();
server.listen(PORT, () => {
    console.log(`Async Arena running on http://localhost:${PORT}`);
});
