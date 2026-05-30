import { EventEmitter } from "events";

export interface PriceUpdate {
    symbol: string;
    price: number;
    change: number;
    timestamp: number;
}

export class PriceEngine extends EventEmitter {
    private prices: Record<string, number> = {};
    private interval: ReturnType<typeof setInterval> | null = null;

    constructor(symbols: string[] = ["GTCO", "DANGCEM", "MTNN"]) {
        super();
        for (const symbol of symbols) {
            this.prices[symbol] = +(100 + Math.random() * 50).toFixed(2);
        }
    }

    start(): void {
        const tick = () => {
            const symbols = Object.keys(this.prices);
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];

            const change = this.prices[symbol] * (Math.random() * 0.04 - 0.02);
            this.prices[symbol] = +(this.prices[symbol] + change).toFixed(2);

            const update: PriceUpdate = {
                symbol,
                price: this.prices[symbol],
                change: +change.toFixed(2),
                timestamp: Date.now(),
            };

            this.emit("price", update);

            // schedule next tick at a random interval (1-3s)
            this.interval = setTimeout(tick, 1000 + Math.random() * 2000);
        };

        tick();
    }

    stop(): void {
        if (this.interval) clearTimeout(this.interval);
    }

    getLatest(): Record<string, number> {
        return { ...this.prices };
    }
}
