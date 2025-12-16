import app from "./app";
import { initGraphData } from "./services/graph.service";

const PORT = 3001;

async function start() {
  await initGraphData();
  app.listen(PORT, () =>
    console.log(`Graph API running on http://localhost:${PORT}`)
  );
}

start();
