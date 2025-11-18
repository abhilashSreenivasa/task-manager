export interface TaskNote {
  id: number;
  body: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  kind?: "note" | "update" | "nextAction";
}

export interface Task {
  id: number;
  taskName: string;
  status: string;

  description: string;
  taskType: string;

  ownerId: number;
  ownerName: string;

  personId: number;
  clientName: string;

  isUrgent: boolean;
  isAssignedToQueue: boolean;

  dateCreated: string;
  lastUpdated?: string;

  // next action fields
  nextActionDate?: string;
  nextActionNotes?: string;

  // activity pane
  notes: TaskNote[];
  
}
