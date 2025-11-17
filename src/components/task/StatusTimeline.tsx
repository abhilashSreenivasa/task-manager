import { STEPS, STATUS_TO_STEP } from "../../constants/steps";
import { CheckIcon } from "@heroicons/react/24/solid";

interface Props {
  status: string;
}

export default function StatusTimeline({ status }: Props) {
  const currentIndex = STATUS_TO_STEP[status] ?? 0;

  // If final state (Completed, Cancelled)
  if (currentIndex >= STEPS.length) return null;

  return (
    <div className="flex items-center justify-center gap-6 py-6">

      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <div key={step} className="flex items-center gap-4">

            {/* CIRCLE */}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center 
                text-sm font-semibold border
                ${
                  isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : isActive
                    ? "bg-green-800 border-green-800 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }
              `}
            >
              {isCompleted ? (
                <CheckIcon className="w-5 h-5 text-white" />
              ) : (
                index + 1
              )}
            </div>

            {/* STEP LABEL */}
            <span
              className={`text-sm font-medium ${
                isCompleted || isActive ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {step}
            </span>

            {/* ARROW */}
            {index !== STEPS.length - 1 && (
              <span className="text-gray-400 text-lg">{">"}</span>
            )}
          </div>
        );
      })}

    </div>
  );
}
