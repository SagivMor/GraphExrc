import { useState, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Background, Controls, type Node, type Edge } from "reactflow";
import type { FullGraphDTO } from "@models/graph";
import { graphApi } from "@api/graphApi";
import { useAttackHighlight } from "@hooks/useAttackHighlight";
import { GraphEdge } from "./edge/GraphEdge";
import { layoutGraph } from "./graphLayout";
import { AttackPathSelect } from "./attackSelect/AttackSelect";
import { GraphNode } from "./node/GraphNode";
import "reactflow/dist/style.css";
import "./GraphView.scss";

import { mapEdges, mapNodes } from "./graphMappers";

export function GraphView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [graph, setGraph] = useState<FullGraphDTO | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { attackPaths, activeNodeIds, activeEdgeKeys, selectAttackPath, selectedAttackPathId } = useAttackHighlight();

  useEffect(() => {
    graphApi
      .getGraph()
      .then(setGraph)
      .catch(() => setError("Failed to load graph"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!graph) return;

    const rfNodes = mapNodes(graph, activeNodeIds);
    const rfEdges = mapEdges(graph, activeEdgeKeys);

    setNodes(layoutGraph(rfNodes, rfEdges, "LR"));
    setEdges(rfEdges);
  }, [graph, activeNodeIds, activeEdgeKeys]);

  if (loading) return <div>Loading graph…</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <AttackPathSelect
        attackPaths={attackPaths}
        value={selectedAttackPathId ?? undefined}
        onChange={selectAttackPath}
      />

      <ReactFlow
        nodesConnectable={false}
        edgesUpdatable={false}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={EDGE_TYPES}
        nodeTypes={NODE_TYPES}
        fitView
      >
        <Background gap={16} />
        <Controls />
      </ReactFlow>
    </>
  );
}

export const EDGE_TYPES = { graphEdge: GraphEdge } as const;
export const NODE_TYPES = { graphNode: GraphNode } as const;
