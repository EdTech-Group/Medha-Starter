import "bootstrap/dist/css/bootstrap.min.css";
import "./medha/styles/theme.css";
import "./medha/styles/pages.css";
import "./styles/app.css";
import "./components/medha/bootstrap";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("index.html has no #root element.");

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
