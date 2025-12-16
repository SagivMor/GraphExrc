import { Router } from "express";
import {
  getFullGraph,
  getAttackPaths,
  getAttackPathGraph,
} from "../services/graph.service";

const router = Router();

router.get("/graph", (_, res) => {
  res.json(getFullGraph());
});

router.get("/attack-paths", (_, res) => {
  res.json(getAttackPaths());
});

router.get("/attack-paths/:id", (req, res) => {
  const graph = getAttackPathGraph(req.params.id);
  if (!graph) return res.status(404).json({ error: "Not found" });
  res.json(graph);
});

export default router;
