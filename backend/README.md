# Security Graph – Backend

API server providing graph data and attack-path calculations for the Security Graph application.

The backend exposes endpoints used by the frontend to fetch the full security graph and to compute or retrieve predefined attack paths.

---

## Tech Stack

- Node.js 18+
- TypeScript
- Express / Fastify (depending on implementation)
- In-memory or mock data source
- Dagre-compatible graph structure

---

## Project Structure

```text
backend/
├── src/
│   ├── routes/          # API routes
│   ├── services/        # Graph and attack-path logic
│   ├── models/          # DTOs and graph types
│   └── index.ts         # App entry point
├── package.json
└── tsconfig.json
```
