import { createContext, useContext, useState, ReactNode } from "react";
import { getTaskList, createTask } from "../services/taskService.mock";
import type { Task } from "../types/Task";

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createNewTask: (taskData: any) => Promise<void>;
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

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createNewTask,
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
