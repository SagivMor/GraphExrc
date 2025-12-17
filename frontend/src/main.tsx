// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Todo(Sagiv): Dont forget to uncomment Strict mode for real deployment, i will keep it for the task display
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
