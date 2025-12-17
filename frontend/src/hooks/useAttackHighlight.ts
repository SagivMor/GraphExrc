import { useEffect, useState } from "react";
import type { AttackPathListItemDTO, GraphEdgeDTO } from "@models/graph";
import { generateEdgeKey } from "@helpers/graphHelpers";
import { graphApi } from "@api/graphApi";

export function useAttackHighlight() {
  const [attackPaths, setAttackPaths] = useState<AttackPathListItemDTO[]>([]);
  const [activeNodeIds, setActiveNodeIds] = useState<Set<string>>(new Set());
  const [activeEdgeKeys, setActiveEdgeKeys] = useState<Set<string>>(new Set());
  const [selectedAttackPathId, setSelectedAttackPathId] = useState<string | null>(null);

  useEffect(() => {
    graphApi.getAttackPaths().then(setAttackPaths);
  }, []);

  function selectAttackPath(id: string) {
    if (!id) {
      setActiveNodeIds(new Set());
      setActiveEdgeKeys(new Set());
      setSelectedAttackPathId(null);
      return;
    }
    setSelectedAttackPathId(id);

    graphApi.getAttackPath(id).then((path) => {
      const edgesKeys = new Set(path.edges.map((e: GraphEdgeDTO) => generateEdgeKey(e)));
      const nodes = new Set<string>();

      path.edges.forEach((e: GraphEdgeDTO) => {
        nodes.add(e.source);
        nodes.add(e.target);
      });

      setActiveEdgeKeys(edgesKeys);
      setActiveNodeIds(nodes);
    });
  }

  return {
    attackPaths,
    activeNodeIds,
    activeEdgeKeys,
    selectAttackPath,
    selectedAttackPathId,
  };
}
