
interface RecentActivityItemProps {
  userName?: string;
  activityDescription?: string;
  noteContent?: string;
  timestamp?: string;
}

export default function RecentActivityItem({
  userName = "Adam Wais",
  activityDescription = "Added a new note.",
  noteContent = "New note comes here",
  timestamp = "6:00 PM, 04/08/2025"
}: RecentActivityItemProps) {
  
  // Color logic
  const color =
    userName === "Adam Wais" ? "#BCA105" : "#007F5F"; // adjust if needed

  return (
    <div className="flex gap-2 items-start text-xs leading-none">

      {/* LEFT TIMELINE COLUMN */}
      <div className="flex flex-col items-center mt-1">

        {/* CIRCLE */}
        <div
          className="rounded-full"
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: color
          }}
        />

        {/* VERTICAL LINE */}
        <div
          style={{
            width: "1px",
            height: "35px",
            backgroundColor: color,
            opacity: 0.8,
            marginTop: "4px"
          }}
        />
      </div>

      {/* RIGHT CONTENT (YOUR EXISTING UI) */}
      <div className="flex flex-1 shrink gap-2 items-start w-full rounded-lg basis-0 min-w-60">

        <div className="flex-1 shrink basis-0 min-w-60">
          <div className="flex gap-1 items-start w-full font-semibold">
            <div className="flex gap-1 items-center text-yellow-600">
              <div className="self-stretch my-auto">
                {userName}
              </div>
            </div>
            <div className="text-zinc-700">
              {activityDescription}
            </div>
          </div>

          <div className="mt-1 w-full text-zinc-700">
            <div className="flex flex-col justify-center items-start px-3.5 py-2.5 bg-lime-50 rounded-lg border-b border-stone-300">
              <div className="text-zinc-700">
                {noteContent}
              </div>
            </div>
          </div>

          <div className="flex gap-1 items-center mt-1 w-full text-zinc-500">
            <div className="self-stretch my-auto">
              {timestamp}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
