import { Task } from "../../types/Task";
import NotesInput from "./NotesInput";
import RecordUpdateModal from "./RecordUpdateModal";
import RecentActivityItem from "./RecentActivityItem";

interface Props {
  task: Task;
  noteInput: string;
  onNoteInputChange: (value: string) => void;
  onAddNote: () => void;
  showRecordUpdate: boolean;
  onShowRecordUpdateChange: (show: boolean) => void;
  onRecordUpdateSave: (status?: string, nextActionDate?: string, nextActionNotes?: string) => void;
  leftColumnHeight: number | null;
  plusIcon: string;
}

export default function ActivitySection({
  task,
  noteInput,
  onNoteInputChange,
  onAddNote,
  showRecordUpdate,
  onShowRecordUpdateChange,
  onRecordUpdateSave,
  leftColumnHeight,
  plusIcon
}: Props) {
  return (
    <div
      style={{
        width: "35%",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        height: leftColumnHeight ? `${leftColumnHeight}px` : 'auto',
      }}
    >
      <div
        className="bg-white shadow p-4"
        style={{
          borderRadius: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: '100%',
        }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3 relative" style={{ flexShrink: 0 }}>
          <h3 className="font-semibold text-gray-700">Recent Activity</h3>

          <div className="relative">
            <button
              onClick={() => onShowRecordUpdateChange(!showRecordUpdate)}
              className="bg-[#007F5F] text-white px-3 py-1.5 rounded text-sm"
            >
              <div className="flex gap-1 items-center">
                <img src={plusIcon} className="h-[16px] w-[16px]" />
                <p>Record Update</p>
              </div> 
            </button>

            {showRecordUpdate && (
              <div className="absolute right-0 mt-2 z-50">
                <RecordUpdateModal
                  isOpen={showRecordUpdate}
                  onClose={() => onShowRecordUpdateChange(false)}
                  onSave={onRecordUpdateSave}
                />
              </div>
            )}
          </div>
        </div>

        {/* ADD NOTE */}
        <div style={{ flexShrink: 0 }}>
          <NotesInput
            value={noteInput}
            onChange={onNoteInputChange}
            onSend={onAddNote}
          />
        </div>

        <hr className="my-4" style={{ flexShrink: 0 }} />

        {/* RIGHT SCROLL AREA */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            paddingRight: 6,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {task.notes?.length ? (
            task.notes.map((note) => (
              <RecentActivityItem key={note.id} note={note} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">No activity yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}