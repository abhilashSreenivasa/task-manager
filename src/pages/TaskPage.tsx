import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";

export default function TaskPage() {
  const { id } = useParams();
  const { tasks, fetchTasks } = useTaskContext();

  // Fetch task details (later we will fetch by ID)
  useEffect(() => {
    fetchTasks();
  }, []);

  const task = tasks.find(t => t.id === Number(id));

  return (
    <div className="p-6">
      {!task ? (
        <p className="text-gray-500">Loading task...</p>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            {task.taskName}
          </h1>

          <div className="bg-white shadow-sm rounded-lg p-4 mb-4">
            <p><span className="font-semibold">Status:</span> {task.status}</p>
            <p><span className="font-semibold">Owner ID:</span> {task.ownerId}</p>
            <p><span className="font-semibold">Urgent:</span> {task.isUrgent ? "Yes" : "No"}</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Activity</h2>
            <p className="text-gray-500">Activity log will go here...</p>
          </div>
        </div>
      )}
    </div>
  );
}
