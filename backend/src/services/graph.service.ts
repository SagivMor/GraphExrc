import { Graph, AttackPath } from "../types/graph.types";
import { loadAssetsGraph, loadAttackPaths } from "../data/loader";

let fullGraph: Graph;
let attackPaths: AttackPath[];

export async function initGraphData() {
  fullGraph = await loadAssetsGraph();
  const raw = await loadAttackPaths();
  attackPaths = raw.paths;
}

export function getFullGraph(): Graph {
  return fullGraph;
}

export function getAttackPaths(): AttackPath[] {
  return attackPaths;
}

export function getAttackPathGraph(id: string): Graph | null {
  const path = attackPaths.find((p) => p.id === id);
  if (!path) return null;

  const nodeIds = new Set<string>();
  path.edges.forEach((e) => {
    nodeIds.add(e.source);
    nodeIds.add(e.target);
  });

  const nodes = fullGraph.nodes.filter((n) => nodeIds.has(n.id));
  return { nodes, edges: path.edges };
}
