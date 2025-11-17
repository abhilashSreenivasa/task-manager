interface Props {
  notes: {
    id: number;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
  }[];
  onAddNote: (body: string) => void;
}

export default function ActivityPane({ notes, onAddNote }: Props) {
  let noteText = "";

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      {/* ADD NOTE */}
      <div>
        <textarea
          placeholder="Add a note..."
          className="w-full border rounded p-2"
          onChange={(e) => (noteText = e.target.value)}
        />
        <button
          onClick={() => {
            if (noteText.trim()) onAddNote(noteText.trim());
          }}
          className="mt-2 px-4 py-2 bg-green-700 text-white rounded"
        >
          Add Note
        </button>
      </div>

      {/* NOTES LIST */}
      <div className="mt-4 space-y-3">
        {notes.length === 0 && (
          <p className="text-gray-500 text-sm">No notes yet.</p>
        )}

        {notes.map((note) => (
          <div key={note.id} className="border rounded p-3">
            <p className="text-sm">{note.body}</p>
            <p className="text-xs text-gray-500">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
