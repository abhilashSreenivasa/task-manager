import { Task } from "../types/Task";
let mockTasks: Task[] = [];
let idCounter = 1;

export async function getTaskList() {
  return {
    data: {
      data: mockTasks,
    },
  };
}

export async function createTask(data: any) {
  const newTask = {
    id: idCounter,
    taskName: `T-${String(idCounter).padStart(5, "0")}`,
    status: "Allocated",

    description: data.Description || "",
    taskType: data.TaskType || "",

    ownerId: data.OwnerId,
    ownerName: data.ownerName,

    personId: data.PersonId,
    clientName: data.clientName,

    isUrgent: data.IsUrgent,
    isAssignedToQueue: data.IsAssignedToQueue,

    dateCreated: new Date().toISOString(),
    nextActionDate: new Date().toISOString(),
    nextActionNotes: "",
    lastUpdated: "",
  };

  idCounter++;
  mockTasks.push(newTask);

  return { data: newTask };
}

export async function getTaskById(id: number) {
  return {
    data: mockTasks.find((t) => t.id === id),
  };
}

export async function updateTask(id: number, updates: any) {
  mockTasks = mockTasks.map((t) =>
    t.id === id ? { ...t, ...updates } : t
  );

  return {
    data: mockTasks.find((t) => t.id === id),
  };
}
