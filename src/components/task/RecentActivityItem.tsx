import type { TaskNote } from "../../types/Task";

// helper: format timestamp "HH:MM, DD/MM/YYYY"
function formatTimestamp(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const mmn = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${hh}:${mm}, ${dd}/${mmn}/${yyyy}`;
}

interface Props {
  note: TaskNote;
}

export default function RecentActivityItem({ note }: Props) {
  const { author, body, createdAt, kind } = note;

  return (
    <div className="relative flex gap-2 items-start text-xs leading-none w-full min-w-0 mt-1">

      {/* Left: dot + line */}
      <div className="flex flex-col items-center pt-1">
        <div
          style={{ width: 6, height: 6, borderRadius: 999, background: "#BCA105" }}
        />
        <div
          style={{
            width: 1,
            background: "#BCA105",
            height: 36,
            marginTop: 8,
            opacity: 0.35,
          }}
        />
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Row with author + text */}
        <div className="flex gap-2 items-start min-w-0">
          <div className="font-semibold text-[12px] text-[#BCA105] whitespace-nowrap">
            {author}
          </div>

          <div className="text-[12px] break-words min-w-0">
            {kind === "update" && <strong>{body}</strong>}
            {kind === "nextAction" && <strong>{body}</strong>}
            {(!kind || kind === "note") && <strong>Added a new note.</strong>}
          </div>
        </div>

        {/* Note content (for note only) */}
        {(!kind || kind === "note") && (
          <div className="mt-2 text-left">
            <div className="px-1 py-1 bg-lime-50 rounded-lg border border-stone-200 text-sm text-zinc-700 break-words">
              {body}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="mt-2 text-xs w-full text-left">
          {formatTimestamp(createdAt)}
        </div>
      </div>
    </div>
  );
}
