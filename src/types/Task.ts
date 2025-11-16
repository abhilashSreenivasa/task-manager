export interface Task {
  id: number;
  taskName: string;
  status: string;
  description: string;
  ownerId: number;
  isUrgent: boolean;
  nextActionDate?: string;
  nextActionNotes?: string;
  personId?: number;
  taskType?: string;
}
