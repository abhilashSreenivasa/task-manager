import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import type { Task } from "../types/Task";
import icon from '../assets/Icon.png'

function formatDate(dateString?: string) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TaskPage() {
  const { id } = useParams();
  const { tasks, fetchTasks, loading } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [id]);

  useEffect(() => {
    const taskId = Number(id);
    setTask(tasks.find((t) => t.id === taskId) || null);
  }, [tasks, id]);

  if (loading) {
    return <div className="p-6 text-center">Loading task...</div>;
  }

  if (!task) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
        <p>This task does not exist or may have been removed.</p>
      </div>
    );
  }

  const daysSinceRequested = Math.floor(
    (Date.now() - new Date(task.dateCreated).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER CARD */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{task.taskName}</h1>
            <p className="text-gray-700 mt-1 font-medium">
              {task.taskType} for {task.clientName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://ui-avatars.com/api/?name=Owner"
              className="h-8 w-8 rounded-full"
            />
            <div className="text-right">
              <p className="font-medium">{task.ownerName}</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
        </div>

        {/* YELLOW BOX */}
        <div className="bg-yellow-50 p-4 rounded mt-4  border text-sm text-gray-700">
          <p className="font-semibold mb-1 text-left">
            {daysSinceRequested} days since requested
          </p>
         
         <div className="flex gap-2 px-4 py-2 opacity-100 rounded-lg border-l-2">
            <p>
                <span className="font-semibold">Next Action on:</span>{" "}
                {formatDate(task.nextActionDate)}
            </p>

            {task.nextActionNotes && (
                <p className="mt-1">{task.nextActionNotes}</p>
            )}
         </div>
          {task.lastUpdated && (
            <p className="mt-2 text-xs text-gray-500">
              Attempt Recorded on {formatDate(task.lastUpdated)}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6 text-left">
          <div className="flex flex-1 gap-[8px]">
            <p className="text-[12px]">Task Description</p>
            <img src={icon} className="h-[16px] w-[16px]"/>
          </div>  
          
          <div className="bg-gray-100 rounded p-4 text-gray-700 min-h-[166px]">
            {task.description || "No description provided."}
          </div>
        </div>
      </div>

    </div>
  );
}
