import dagre from "dagre";
import type { Node, Edge } from "reactflow";

const NODE_WIDTH = 180;
const NODE_HEIGHT = 40;

export function layoutGraph(nodes: Node[], edges: Edge[], direction: "TB" | "LR" = "LR"): Node[] {
  const g = new dagre.graphlib.Graph();

  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: direction, // Layout direction (LR = left→right, TB = top→bottom)
    ranksep: 80, // Spacing between layers (columns or rows)
    nodesep: 40, // Spacing between nodes within the same layer
  });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map((node) => {
    const { x, y } = g.node(node.id);
    return {
      ...node,
      position: { x, y },
    };
  });
}
