import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/Task";

import StatusTimeline from "../components/task/StatusTimeline";
import RecentActivityItem from "../components/task/RecentActivityItem";
import NotesInput from "../components/task/NotesInput";

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
  const { tasks, fetchTasks, loading, addNote } = useTaskContext();

  const [task, setTask] = useState<Task | null>(null);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [id]);

  useEffect(() => {
    setTask(tasks.find((t) => t.id === Number(id)) || null);
  }, [tasks, id]);

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

  return (
    <>
      <StatusTimeline status={task.status} />

      {/* MAIN LAYOUT */}
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

        {/* LEFT SIDE — FULL HEIGHT */}
        <div className="lg:col-span-2 flex flex-col h-full">

          {/* HEADER CARD (no rounded corners) */}
          <div
            className={
              task.isUrgent
                ? "shadow p-6 mb-6 bg-[linear-gradient(180deg,#FDECEA_0%,#FDECEA_15%,#FFF5F3_25%,#FFFFFF_60%,#FFFFFF_100%)]"
                : "shadow p-6 mb-6 bg-white"
            }
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
              <div className="flex items-center gap-2 bg-white p-2">
                <img
                  src="https://ui-avatars.com/api/?name=Owner"
                  className="h-8 w-8 rounded-full"
                />
                <div className="text-left">
                  <p className="font-medium text-[#BCA105]">
                    {task.ownerName}
                  </p>
                  <p className="text-xs text-gray-500">Owner</p>
                </div>
              </div>
            </div>

            {/* YELLOW BOX */}
            <div className="bg-yellow-50 p-4 mt-4 text-sm text-gray-700">
              <p className="font-semibold mb-1 text-left">
                {daysSinceRequested} days since requested
              </p>

              <div className="flex gap-2 px-4 py-2 rounded-lg border-l-2 bg-[#F6F2E5]">
                <p>
                  <span className="font-semibold">Next Action:</span>{" "}
                  {formatDate(task.nextActionDate)}
                </p>

                {task.nextActionNotes && (
                  <p className="mt-1">{task.nextActionNotes}</p>
                )}
              </div>

              {task.lastUpdated && (
                <p className="mt-2 text-xs text-gray-500">
                  Attempt Recorded on {formatDate(task.lastUpdated)}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-3 text-left">
              <div className="flex gap-[8px] items-center">
                <p className="text-[14px]">Task Description</p>
                <img src={icon} className="h-[16px] w-[16px]" />
              </div>

              <div className="bg-gray-100 p-4 text-gray-700 min-h-[166px] mt-1">
                {task.description || "No description provided."}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FULL HEIGHT */}
        <div className="lg:col-span-1 flex flex-col h-full">

          <div className="bg-white shadow p-4 flex flex-col h-full">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">Recent Activity</h3>

              <button className="bg-[#007F5F] text-white px-3 py-1.5 text-sm">
                Record Update
              </button>
            </div>

            {/* ADD NOTE */}
            <NotesInput
              value={noteInput}
              onChange={setNoteInput}
              onSend={handleAddNote}
            />

            <hr className="my-4" />

            {/* NOTES LIST (auto height, scrolls inside) */}
            <div className="flex-1 overflow-y-scroll space-y-3 pr-1">

              {task.notes?.length ? (
                task.notes.map((note) => (
                  <RecentActivityItem
                    key={note.id}
                    userName={note.author}
                    activityDescription="Added a new note."
                    noteContent={note.body}
                    timestamp={formatDate(note.createdAt)}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No activity yet.</p>
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
