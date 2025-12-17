# Security Graph – Full Stack

Full-stack application for visualizing a security graph and attack paths.

**Frontend:** React + TypeScript + Vite + React Flow  
**Backend:** API server providing graph and attack-path data

---

## Project Structure

```text
/
├── frontend/       # React application
├── backend/        # API server
└── README.md
```

---

## Frontend

### Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Run the development server:

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## Backend

### Setup

```bash
cd backend
npm install
npm run dev
```

Backend will be available at:

```
http://localhost:3001
```

---

## Notes

- Frontend communicates with the backend via `VITE_API_BASE_URL`
- Graph layout is calculated using Dagre
- Nodes and edges are rendered using custom React Flow components
- Styling is handled via SCSS tokens (no inline UI logic in orchestration code)

---

## Requirements

- Node.js 18+
- npm / pnpm / yarn

---
