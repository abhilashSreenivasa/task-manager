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
    notes: [],
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
  let updated: any = null;

  mockTasks = mockTasks.map((t) => {
    if (t.id === id) {
      updated = {
        ...t,
        ...updates,
        lastUpdated: new Date().toISOString(),
        notes: updates.notes || t.notes, 
      };
      return updated;
    }
    return t;
  });

  return { data: updated };
}

export async function addNote(taskId: number, body: string, author: string) {
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task) return { data: null };

  const newNote = {
    id: task.notes.length + 1,
    body,
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  task.notes.push(newNote);

  return { data: newNote };
}

