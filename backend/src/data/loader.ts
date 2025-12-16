const ASSETS_URL =
  "https://coding-test-graph-data.s3.eu-central-1.amazonaws.com/assets.json";
const ATTACK_PATHS_URL =
  "https://coding-test-graph-data.s3.eu-central-1.amazonaws.com/attack-paths.json";

export async function loadAssetsGraph() {
  const res = await fetch(ASSETS_URL);
  return res.json();
}

export async function loadAttackPaths() {
  const res = await fetch(ATTACK_PATHS_URL);
  return res.json();
}
