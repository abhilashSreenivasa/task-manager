import React, { useState } from "react";
import { STATUS_TO_STEP } from "../../constants/steps";

export interface RecordUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (status: string | undefined, nextActionDate: string | undefined, nextActionNotes: string | undefined) => void;
}

const RecordUpdateModal: React.FC<RecordUpdateModalProps> = ({ isOpen, onClose, onSave }) => {
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const maxLength = 100;

  if (!isOpen) return null;

  // Build status options from STATUS_TO_STEP keys
  const statusOptions = Object.keys(STATUS_TO_STEP)
    // exclude Requested as requested
    .filter((s) => s !== "Requested")
    // sort by mapped step number (ascending)
    .sort((a, b) => (STATUS_TO_STEP[a] ?? 0) - (STATUS_TO_STEP[b] ?? 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(status || undefined, date || undefined, notes || undefined);
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 z-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 justify-center p-3 bg-white shadow-lg rounded-xl w-[303px]"
        aria-modal="true"
        role="dialog"
      >
        <fieldset className="w-full">
          <label className="block text-xs pb-1 text-zinc-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-zinc-50 border border-stone-200 rounded pt-1.5 pb-1.5 pl-3 text-sm text-stone-600"
            aria-label="Select status"
          >
            <option value="">Select Status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="w-full">
          <label className="block text-xs pb-1 text-zinc-600">Next Action Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-zinc-50 border border-stone-200 rounded pt-1.5 pb-1.5 pl-3 text-sm text-stone-600"
            aria-label="Next action date"
          />
        </fieldset>

        <fieldset className="w-full">
          <label className="block text-xs pb-1 text-zinc-600">Next Action Notes</label>

          <div className="relative w-full bg-zinc-50 border border-stone-200 rounded min-h-[66px]">
            <textarea
              value={notes}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) setNotes(e.target.value);
              }}
              placeholder="Add your notes here..."
              className="w-full p-2 text-sm text-stone-700 bg-transparent resize-none outline-none"
              rows={2}
              aria-label="Next action notes"
            />
            <span className="absolute right-2 bottom-2 text-xs text-stone-400">
              {notes.length}/{maxLength}
            </span>
          </div>
        </fieldset>

        <div className="flex gap-3 justify-end mt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-2 bg-stone-500 text-white rounded-lg shadow-sm text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordUpdateModal;
