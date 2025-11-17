import { createContext, useContext, useState, ReactNode } from "react";
import { getTaskList, createTask,updateTask } from "../services/taskService.mock";
import type { Task } from "../types/Task";

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
    prev.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status,
            nextActionDate,
            nextActionNotes,
            lastUpdated: new Date().toISOString(),
          }
        : t
    )
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
