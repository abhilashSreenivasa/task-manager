
interface NotesInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export default function NotesInput({ value, onChange, onSend }: NotesInputProps) {
  return (
    <div className="relative h-8 bg-lime-50 rounded border-t border-r border-l border-solid border-t-stone-300 border-x-stone-300 w-full">
      
      {/* Input (real input, invisible styling) */}
      <input
        className="
          absolute left-0 top-0 w-full h-full 
          bg-transparent border-none outline-none
          px-3 text-sm text-gray-700
        "
        value={value}
        
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSend();
          }
        }}
      />

      {/* Placeholder (only when empty) */}
      {value === "" && (
        <div className="absolute left-0 top-1.5 pl-3 text-sm text-neutral-400 pointer-events-none">
          Add your notes here...
        </div>
      )}

      {/* Send Icon */}
      <button
        onClick={onSend}
        className="absolute top-2 right-2 w-4 h-4 flex justify-center items-center"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1954 8.81586L2.40258 13.4329C2.14798 13.5275 1.90612 13.5071 1.67701 13.3719C1.4479 13.2366 1.33334 13.0402 1.33334 12.7827V3.53323C1.33334 3.27575 1.4479 3.07933 1.67701 2.94399C1.90612 2.80877 2.14798 2.78844 2.40258 2.88298L14.1954 7.50006C14.5096 7.62887 14.6667 7.84817 14.6667 8.15796C14.6667 8.46775 14.5096 8.68705 14.1954 8.81586ZM2.60071 12.081L12.6129 8.15796L2.60071 4.23488V7.13188L7.18266 8.15796L2.60071 9.18404V12.081Z"
            fill="#584C70"
          />
        </svg>
      </button>

      {/* Bottom border */}
      <div className="absolute left-0 bottom-0 h-0.5 bg-stone-300 w-full" />
    </div>
  );
}
