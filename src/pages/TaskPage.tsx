// src/pages/TaskPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { Task } from "../types/Task";

// Task-specific components
import StatusTimeline from "../components/task/StatusTimeline";
import StepperHorizontal from "../components/task/StepperHorizontal";

// New task components
import TaskHeader from "../components/task/TaskHeader";
import TaskAlertBox from "../components/task/TaskAlertBox";
import TaskDescription from "../components/task/TaskDescription";
import ActivitySection from "../components/task/ActivitySection";

// UI components
import OwnerCard from "../components/ui/OwnerCard";
import UrgentBadge from "../components/ui/UrgentBadge";

// Assets
import owner from '../assets/Owner.png'
import icon from "../assets/Icon.png";
import groupIcon from "../assets/Group.png";
import plus from "../assets/plus.png"

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
              <TaskHeader 
                task={task}
                ownerCard={
                  <OwnerCard 
                    avatar={owner}
                    name={task.ownerName}
                    role="Owner"
                    accentColor="#BCA105"
                  />
                }
                urgentBadge={
                  task.isUrgent && (
                    <UrgentBadge 
                      icon={groupIcon}
                      text="Urgent"
                    />
                  )
                }
              />

              {/* ALERT BOX */}
              { (task.status !=="Completed" && task.status !== "Cancelled") && (
                <TaskAlertBox 
                  daysSinceRequested={daysSinceRequested}
                  nextActionDate={task.nextActionDate}
                  nextActionNotes={task.nextActionNotes}
                  lastUpdated={task.lastUpdated}
                  formatDate={formatDate}
                />
              )}

              {/* DESCRIPTION */}
              <TaskDescription 
                description={task.description}
                icon={icon}
              />
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT COLUMN ---------------- */}
        <ActivitySection
          task={task}
          noteInput={noteInput}
          onNoteInputChange={setNoteInput}
          onAddNote={handleAddNote}
          showRecordUpdate={showRecordUpdate}
          onShowRecordUpdateChange={setShowRecordUpdate}
          onRecordUpdateSave={handleRecordUpdateSave}
          leftColumnHeight={leftColumnHeight}
          plusIcon={plus}
        />
      </div>
    </>
  );
}