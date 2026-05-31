# Async Arena

A real-time playground for comparing async API patterns side by side.

Pick a pattern, watch it work, and see the raw network traffic — all powered by the same live stock ticker data source.

[<img width="1664" height="1942" alt="image" src="https://github.com/user-attachments/assets/d72164d2-0075-49e1-85a8-6a033cb6142e" />](https://substack.com/home/post/p-197567426)

## Patterns Covered

| # | Pattern | Description |
|---|---------|-------------|
| 1 | Short Polling | Client requests on a fixed interval |
| 2 | Long Polling | Server holds the connection until new data arrives |
| 3 | Server-Sent Events | Server pushes updates over a persistent HTTP stream |
| 4 | WebSockets | Persistent bidirectional connection |
| 5 | Webhooks | Server POSTs to a registered callback URL |
| 6 | Async Job + Status Polling | Submit a job, poll for completion |
| 7 | Message Queue | Pull-based consumption from a Redis Stream |
| 8 | GraphQL Subscriptions | Real-time updates via GraphQL over WebSocket |

## Tech Stack

- **Backend:** Node.js, Express
- **Message Broker:** Redis (Pub/Sub + Streams)
- **GraphQL:** Apollo Server
- **Frontend:** React

## Getting Started

```bash
# clone the repo
git clone https://github.com/YOUR_USERNAME/async-arena.git
cd async-arena

# install dependencies
npm install

# start Redis (Docker)
docker run -d -p 6379:6379 redis

# start the server
node server/index.js
```

## Project Structure

```
async-arena/
├── server/
│   ├── index.js            # Express app, mounts all routes
│   ├── priceEngine.js      # Simulated stock ticker
│   └── routes/             # One file per async pattern
├── client/                 # React frontend
├── docker-compose.yml
└── README.md
```

## Status

🚧 Under active development. Building each pattern incrementally.

## License

MIT
