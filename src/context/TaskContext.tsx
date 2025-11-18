import { createContext, useContext, useState, ReactNode } from "react";
import { getTaskList, createTask } from "../services/taskService.mock";
import type { Task,TaskNote } from "../types/Task";

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createNewTask: (taskData: any) => Promise<void>;
  addNote: (taskId: number, body: string) => void;
  recordUpdate: (
    taskId: number,
    status: string,
    nextActionDate: string,
    nextActionNotes: string
  ) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTaskList();
      setTasks(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createNewTask = async (taskData: any) => {
    try {
      setLoading(true);
      await createTask(taskData);
      await fetchTasks(); // refresh after creation
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };
  const addNote = (taskId: number, body: string) => {
  setTasks((prev) =>
    prev.map((t) =>
      t.id === taskId
        ? {
            ...t,
            notes: [
              ...t.notes,
              {
                id: Date.now(),
                body,
                author: t.ownerName || "Owner",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
            lastUpdated: new Date().toISOString(),
          }
        : t
    )
  );
};


const recordUpdate = (
  taskId: number,
  status: string,
  nextActionDate: string,
  nextActionNotes: string
) => {
  setTasks((prev) =>
    prev.map((t) => {
      if (t.id !== taskId) return t;

      const notesToAdd: TaskNote[] = [];

      // --- STATUS UPDATE ---
      // Add note ONLY if:
      //   • status exists
      //   • status is not "Requested"
      if (status && status.trim() && status !== "Requested") {
        notesToAdd.push({
          id: Date.now() + 1,
          body: `Updated status to ${status}`,
          author: t.ownerName || "Owner",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          kind: "update",
        });
      }

      // --- NEXT ACTION UPDATE ---
      // Add ONLY if nextActionDate is provided.
      // nextActionNotes alone is invalid → skip entirely.
      if (nextActionDate && nextActionDate.trim()) {
        notesToAdd.push({
          id: Date.now() + 2,
          body: `Next action date: ${nextActionDate}`,
          author: t.ownerName || "Owner",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          kind: "nextAction",
        });
      }

      // If user didn't set ANY valid fields → do NOT update
      if (notesToAdd.length === 0) {
        return t;
      }

      return {
        ...t,
        status: status || t.status,
        nextActionDate: nextActionDate || t.nextActionDate,
        nextActionNotes: nextActionNotes || t.nextActionNotes,
        notes: [...(t.notes || []), ...notesToAdd],
        lastUpdated: new Date().toISOString(),
      };
    })
  );
};



  

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createNewTask,
        addNote,
        recordUpdate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within TaskProvider");
  return ctx;
};
