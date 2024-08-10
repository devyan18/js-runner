import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { CodeProvider } from "./CodeProvider";

const $root = document.getElementById("root");

ReactDOM.createRoot($root).render(
  <CodeProvider>
    <App />
  </CodeProvider>
);
