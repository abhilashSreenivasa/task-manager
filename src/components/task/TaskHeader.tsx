import { Task } from "../../types/Task";

interface Props {
  task: Task;
  ownerCard: React.ReactNode;
  urgentBadge: React.ReactNode;
}

export default function TaskHeader({ task, ownerCard, urgentBadge }: Props) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <h1 className="text-2xl font-semibold">{task.taskName}</h1>
          {urgentBadge}
        </div>
        <p className="text-[#134648] mt-1">
          {task.taskType} for {task.clientName}
        </p>
      </div>
      {ownerCard}
    </div>
  );
}