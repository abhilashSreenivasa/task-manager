// src/pages/TaskPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/Task";

import StatusTimeline from "../components/task/StatusTimeline";
import RecentActivityItem from "../components/task/RecentActivityItem";
import NotesInput from "../components/task/NotesInput";
import RecordUpdateModal from "../components/task/RecordUpdateModal";
import StepperHorizontal from "../components/task/StepperHorizontal";

import icon from "../assets/Icon.png";
import groupIcon from "../assets/Group.png";

function formatDate(dateString?: string) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TaskPage() {
  const { id } = useParams();
  const { tasks, fetchTasks, loading, addNote, recordUpdate } = useTaskContext();

  const [task, setTask] = useState<Task | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [showRecordUpdate, setShowRecordUpdate] = useState(false);
  const [leftColumnHeight, setLeftColumnHeight] = useState<number | null>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTasks();
  }, [id]);

  useEffect(() => {
    setTask(tasks.find((t) => t.id === Number(id)) || null);
  }, [tasks, id]);

  useEffect(() => {
    const updateHeight = () => {
      if (leftColumnRef.current) {
        setLeftColumnHeight(leftColumnRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, [task]);

  if (loading) return <div className="p-6 text-center">Loading task...</div>;

  if (!task) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
        <p>This task does not exist.</p>
      </div>
    );
  }

  const daysSinceRequested = Math.floor(
    (Date.now() - new Date(task.dateCreated || "").getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addNote(task.id, noteInput.trim());
    setNoteInput("");
  };

  const handleRecordUpdateSave = (
    status?: string,
    nextActionDate?: string,
    nextActionNotes?: string
  ) => {
    recordUpdate(task.id, status || "", nextActionDate || "", nextActionNotes || "");
    setShowRecordUpdate(false);
  };

  return (
    <>
      <StatusTimeline status={task.status} />
      
      {(task.status ==="Completed"||task.status === "Cancelled") && <StepperHorizontal status={task.status}/>}
      
      {/* MAIN WRAPPER */}
      <div
        className="max-w-7xl mx-auto"
        style={{
          display: "flex",
          gap: 0,
          height: leftColumnHeight ? `${leftColumnHeight}px` : 'auto',
          alignItems: "flex-start",
        }}
      >
        
        {/* ---------------- LEFT COLUMN ---------------- */}
        <div
          ref={leftColumnRef}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: '65%'
          }}
        >
          <div
            className="bg-white shadow"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              className={
                task.isUrgent
                  ? "shadow p-6 bg-[linear-gradient(180deg,#FDECEA_0%,#FDECEA_15%,#FFF5F3_25%,#FFFFFF_60%,#FFFFFF_100%)]"
                  : "shadow p-6 bg-white"
              }
              style={{ borderRadius: 0 }}
            >
              {/* TOP ROW */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <h1 className="text-2xl font-semibold">{task.taskName}</h1>

                    {task.isUrgent && (
                      <div className="flex gap-2 bg-[#D53C32] text-white pl-2 pr-2 items-center rounded">
                        <img src={groupIcon} className="w-3 h-3" />
                        <p>Urgent</p>
                      </div>
                    )}
                  </div>

                  <p className="text-[#134648] mt-1">
                    {task.taskType} for {task.clientName}
                  </p>
                </div>

                {/* OWNER CARD */}
                <div
                  className="flex items-center gap-2 bg-white p-2"
                  style={{ borderRadius: 0 }}
                >
                  <img
                    src="https://ui-avatars.com/api/?name=Owner"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="text-left">
                    <p className="font-medium text-[#BCA105]">{task.ownerName}</p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                </div>
              </div>

              {/* YELLOW BOX */}
              { (task.status !=="Completed" && task.status !== "Cancelled") && (
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
                    {task.nextActionDate ? formatDate(task.nextActionDate) : "—"}
                  </p>

                  <p className="text-sm text-[#666]">
                    {task.nextActionNotes || "No next action notes yet"}
                  </p>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  {task.lastUpdated
                    ? `Attempt Recorded on ${formatDate(task.lastUpdated)}`
                    : "No attempts recorded yet"}
                </div>
              </div>
              )}

              {/* DESCRIPTION */}
              <div className="mt-3 text-left">
                <div className="flex gap-[8px] items-center">
                  <p className="text-[14px]">Task Description</p>
                  <img src={icon} className="h-[16px] w-[16px]" />
                </div>

                <div className="flex flex-1 bg-gray-100 p-4 text-[#909090] min-h-[166px] mt-1">
                  {task.description || "No description provided."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT COLUMN ---------------- */}
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
                  onClick={() => setShowRecordUpdate((v) => !v)}
                  className="bg-[#007F5F] text-white px-3 py-1.5 rounded text-sm"
                >
                  Record Update
                </button>

                {showRecordUpdate && (
                  <div className="absolute right-0 mt-2 z-50">
                    <RecordUpdateModal
                      isOpen={showRecordUpdate}
                      onClose={() => setShowRecordUpdate(false)}
                      onSave={handleRecordUpdateSave}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ADD NOTE */}
            <div style={{ flexShrink: 0 }}>
              <NotesInput
                value={noteInput}
                onChange={setNoteInput}
                onSend={handleAddNote}
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
      </div>
    </>
  );
}