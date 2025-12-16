import express from "express";
import graphRoutes from "./routes/graph.routes";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));


app.use(express.json());
app.use("/api", graphRoutes);

export default app;
