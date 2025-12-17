import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import "./GraphNode.scss";

type GraphNodeData = {
  type: string;
  name: string;
  id: string;
};

export function GraphNode({ data }: NodeProps<GraphNodeData>) {
  const { type, name, id } = data;

  return (
    <div className="graph-node">
      {/* ENTRYIES */}
      <Handle type="target" position={Position.Left} isConnectable={false} />

      <div className="title">{name}</div>

      <div className="id">id: {id}</div>

      <div className="type">({type})</div>

      {/* EXITS */}
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </div>
  );
}
