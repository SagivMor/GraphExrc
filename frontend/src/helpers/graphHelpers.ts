export function generateEdgeKey(e: {
  source: string;
  target: string;
  type: string;
}) {
  return `${e.source}|${e.type}|${e.target}`;
}
