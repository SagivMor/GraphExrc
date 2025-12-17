  import {useState, useEffect } from "react";
  import ReactFlow, { useNodesState, useEdgesState, Background, Controls, MarkerType} from "reactflow";
  import type { Node, Edge } from "reactflow";
  import type { FullGraphDTO, GraphEdgeDTO, GraphNodeDTO } from "@models/graph";
  import { graphApi } from "@api/graphApi";
  import { useAttackHighlight } from "@hooks/useAttackHighlight";
  import { generateEdgeKey } from "@helpers/graphHelpers";
  import { GraphEdge } from "./edge/GraphEdge";
  import { layoutGraph } from "./graphLayout";
  import { AttackPathSelect } from "./attackSelect/AttackSelect";
  import { graphPalette } from "@styles/graph/graphPalette";
  import { GraphNode } from "./node/GraphNode";
  import "reactflow/dist/style.css";

  export function GraphView() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [graph, setGraph] = useState<FullGraphDTO  | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const { attackPaths, activeNodeIds, activeEdgeKeys, selectAttackPath, selectedAttackPathId} = useAttackHighlight();

    useEffect(() => {
      graphApi.getGraph()
        .then(setGraph)
        .catch(() => setError("Failed to load graph"))
        .finally(() => setLoading(false));
    }, []);

    
    useEffect(() => {
        if (!graph) return;
        
        const rfNodes = mapNodes()
        const rfEdges = mapEdges()

        setNodes(layoutGraph(rfNodes, rfEdges, "LR"));
        setEdges(rfEdges);
    }, [graph, activeNodeIds, activeEdgeKeys, setNodes, setEdges]);

    const mapNodes = () => {
      if(!graph) return [];

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
            position: { x: 0, y: 0 },
            style: {
              opacity: muted ? 0.35 : 1,
              background: isActive ? graphPalette.node.activeBg : graphPalette.node.defaultBg,
              border: isActive ? `4px solid ${graphPalette.node.activeBorder}` : `1px solid ${graphPalette.node.defaultBorder}`,
            },
          };
        });
    }

    const mapEdges = () => {
      if(!graph) return [];

      return graph.edges.map((e: GraphEdgeDTO) => {
      const isActive = activeEdgeKeys.has(generateEdgeKey(e));
      const muted = activeEdgeKeys.size > 0 && !isActive;

        const color = isActive ? graphPalette.edge.active : muted ? graphPalette.edge.muted : graphPalette.edge.default

        return {
          id: e.id,
          source: e.source,
          target: e.target,
          type:"graphEdge",
          data: {
            type:e.type,
            id:e.id,
            muted:muted
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
    }

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


export const EDGE_TYPES = {graphEdge: GraphEdge} as const;
export const NODE_TYPES = {graphNode: GraphNode} as const;

