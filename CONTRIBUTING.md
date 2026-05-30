# Contributing to Async Arena

Thanks for your interest in contributing!

## How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run and test locally (see README for setup)
5. Commit with a clear message: `git commit -m "add: SSE route handler"`
6. Push to your fork: `git push origin feature/your-feature`
7. Open a Pull Request

## Commit Message Convention

Use a short prefix to categorize your commit:

- `add:` — new feature or pattern
- `fix:` — bug fix
- `refactor:` — code improvement without behavior change
- `docs:` — documentation only
- `style:` — formatting, no logic change

## Development Setup

```bash
npm install
node server/index.js
```

Requires Node.js 18+ and Redis running on localhost:6379.

Code Style

- Use ‎`const`/‎`let`, never ‎`var`

- Descriptive variable names over comments

- One file per async pattern in ‎`server/routes/`

- One custom hook per pattern in ‎`client/src/transports/`

Questions?

Open an issue — happy to help.