// Simulated in-memory DB
let mockTasks: any[] = [];
let idCounter = 1;

export async function getTaskList() {
  return {
    data: {
      data: mockTasks
    }
  };
}

export async function createTask(data: any) {
  const newTask = {
    id: idCounter++,
    taskName: `T-${String(idCounter).padStart(5, "0")}`,
    status: "Requested",
    dateCreated: new Date().toISOString(),
    ...data
  };

  mockTasks.push(newTask);

  return {
    data: newTask
  };
}

export async function updateTask(id: number, updates: any) {
  mockTasks = mockTasks.map((task) =>
    task.id === id ? { ...task, ...updates } : task
  );

  return {
    data: mockTasks.find((t) => t.id === id)
  };
}

export async function getTaskById(id: number) {
  return {
    data: mockTasks.find((t) => t.id === id)
  };
}
