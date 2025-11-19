import { useTaskContext } from "../hooks/useTaskContext";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { tasks, loading, error, createNewTask, fetchTasks } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Create Task
        </button>
      </div>

      {/* CREATE TASK MODAL */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createNewTask}
      />

      {/* SEARCH BAR (not implemented yet, just UI placeholder) */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 border rounded mb-4"
      />

      {/* TASK LIST */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available</p>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className="p-4 border rounded mb-2 cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/task/${t.id}`)}
            >
              <p className="font-medium">Task: {t.taskName}</p>
              <p className="text-gray-600">Status: {t.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
