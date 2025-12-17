export type Node = {
  id: string;
  label: string;
  name: string;
  [key: string]: unknown;
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  type: string;
};

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};

export type AttackPath = {
  id: string;
  name: string;
  description: string;
  severity: string;
  edges: Edge[];
};
