import type { FullGraphDTO, AttackPathListItemDTO, AttackPathGraphDTO } from "@models/graph";
import { env } from "@configs/env";

export const graphApi = {
  getGraph: () => apiGet<FullGraphDTO>("/graph"),
  getAttackPaths: () => apiGet<AttackPathListItemDTO[]>("/attack-paths"),
  getAttackPath: (id: string) => apiGet<AttackPathGraphDTO>(`/attack-paths/${id}`),
};

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${env.apiBaseUrl}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}
