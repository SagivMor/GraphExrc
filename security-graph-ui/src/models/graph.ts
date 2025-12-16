export type GraphNodeDTO = {
  id: string;
  label: string;
  name: string;
};

export type GraphEdgeDTO = {
  id: string;
  source: string;
  target: string;
  type: string;
};

export type FullGraphDTO = {
  nodes: GraphNodeDTO[];
  edges: GraphEdgeDTO[];
};

export type AttackPathListItemDTO = {
  id: string;
  name: string;
  description: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
};

export type AttackPathGraphDTO = FullGraphDTO;
