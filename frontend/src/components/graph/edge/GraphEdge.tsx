import { EdgeProps, getBezierPath } from "reactflow";
import "./GraphEdge.scss";
import classNames from "classnames";

export type GraphEdgeData = {
  id: string;
  type: string;
  muted: boolean;
};

export function GraphEdge({ sourceX, sourceY, targetX, targetY, data, style, markerEnd }: EdgeProps<GraphEdgeData>) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const { id, muted, type } = data ?? {};

  return (
    <>
      <path d={path} fill="none" style={style} markerEnd={markerEnd} />
      <foreignObject x={labelX} y={labelY} style={{ overflow: "visible" }}>
        <div className={classNames("graph-edge", { muted })}>
          <span className="label-type">{type}</span>

          {/* <span  className="label-id">id: {id}</span> */}
        </div>
      </foreignObject>
    </>
  );
}
