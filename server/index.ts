import express, { Request, Response } from "express";
import { PriceEngine, PriceUpdate } from "./priceEngine";

const app = express();
const engine = new PriceEngine();

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

const PORT = 3001;
engine.start();
app.listen(PORT, () => {
    console.log(`Async Arena running on http://localhost:${PORT}`);
});
