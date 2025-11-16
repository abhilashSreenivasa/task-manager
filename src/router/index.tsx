import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TaskPage from "../pages/TaskPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
