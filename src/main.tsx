import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./router";
import { TaskProvider } from "./context/TaskContext";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskProvider>
      <AppRouter />
    </TaskProvider>
  </React.StrictMode>
);
