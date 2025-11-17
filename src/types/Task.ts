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

  nextActionDate?: string;
  nextActionNotes?: string;

  lastUpdated?: string; 
}
