import { generateEdgeKey } from "@helpers/graphHelpers";
import type { FullGraphDTO, GraphEdgeDTO, GraphNodeDTO } from "@models/graph";
import { graphEdgePalette } from "@styles/graph/graphPalette";
import classNames from "classnames";
import { MarkerType } from "reactflow";

export const mapNodes = (graph: FullGraphDTO, activeNodeIds: Set<string>) => {
  return graph.nodes.map((n: GraphNodeDTO) => {
    const isActive = activeNodeIds.has(n.id);
    const muted = activeNodeIds.size > 0 && !isActive;

    return {
      id: n.id,
      type: "graphNode",
      data: {
        type: n.label,
        name: n.name,
        id: n.id,
      },
      className: classNames("sg-node", { muted, active: isActive }),
      position: { x: 0, y: 0 },
    };
  });
};

export const mapEdges = (graph: FullGraphDTO, activeEdgeKeys: Set<string>) => {
  return graph.edges.map((e: GraphEdgeDTO) => {
    const isActive = activeEdgeKeys.has(generateEdgeKey(e));
    const muted = activeEdgeKeys.size > 0 && !isActive;

    const color = isActive ? graphEdgePalette.active : muted ? graphEdgePalette.muted : graphEdgePalette.default;

    return {
      id: e.id,
      source: e.source,
      target: e.target,
      type: "graphEdge",
      data: {
        type: e.type,
        id: e.id,
        muted: muted,
      },
      animated: isActive,
      style: {
        stroke: color,
        strokeWidth: isActive ? 2.5 : 1,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: color,
      },
    };
  });
};
