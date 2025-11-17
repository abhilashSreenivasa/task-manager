// src/components/task/StatusTimeline.tsx
import {STEP_ORDER}  from "../../constants/statusus";

interface Props {
  status: string;
}

export default function StatusTimeline({ status }: Props) {
  // Determine which steps are "completed"
  const currentIndex = STEP_ORDER.indexOf(status);

  // If status is Completed, everything is done
  const isCompleted = status === "Completed";

  // If Cancelled → show only a cancelled banner
  if (status === "Cancelled") {
    return (
      <div className="bg-red-100 border border-red-300 p-4 rounded text-red-700 text-center font-medium mb-6">
        Task Cancelled
      </div>
    );
  }

  return (
    <div className="bg-white shadow p-6 rounded mb-6">
      <h2 className="font-semibold mb-4">Status</h2>

      <div className="flex flex-col gap-4">

        {STEP_ORDER.map((step, index) => {
          const done =
            isCompleted || index <= currentIndex;

          return (
            <div key={step} className="flex items-center gap-3">

              {/* Dot */}
              <div
                className={`
                  h-4 w-4 rounded-full border
                  ${done ? "bg-green-600 border-green-700" : "bg-gray-300 border-gray-400"}
                `}
              />

              {/* Line */}
              <div
                className={`
                  flex-1 h-[2px]
                  ${index < STEP_ORDER.length - 1
                    ? done ? "bg-green-600" : "bg-gray-300"
                    : ""}
                `}
              />

              {/* Label */}
              <span className={done ? "text-green-700 font-medium" : "text-gray-600"}>
                {step}
              </span>

            </div>
          );
        })}
      </div>
    </div>
  );
}
