interface Props {
  daysSinceRequested: number;
  nextActionDate?: string;
  nextActionNotes?: string;
  lastUpdated?: string;
  formatDate: (dateString?: string) => string;
}

export default function TaskAlertBox({ 
  daysSinceRequested, 
  nextActionDate, 
  nextActionNotes, 
  lastUpdated, 
  formatDate 
}: Props) {
  return (
    <div className="bg-yellow-50 p-4 mt-4 text-sm text-gray-700">
      <p className="font-semibold mb-1 text-left">
        {daysSinceRequested}
        <span className="text-[#909090] text-sm"> days since requested</span>
      </p>

      <div className="flex flex-col text-left gap-2 px-4 py-2 rounded-lg border-l-2 bg-[#F6F2E5]">
        <p>
          <span className="font-semibold text-[#909090]">
            Next Action on:
          </span>{" "}
          {nextActionDate ? formatDate(nextActionDate) : "—"}
        </p>

        <p className="text-sm text-[#666]">
          {nextActionNotes || "No next action notes yet"}
        </p>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        {lastUpdated
          ? `Attempt Recorded on ${formatDate(lastUpdated)}`
          : "No attempts recorded yet"}
      </div>
    </div>
  );
}