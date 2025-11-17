import { CheckIcon } from "@heroicons/react/24/outline";
import { STEPS } from "../../constants/steps";

interface Props {
  status: string;
}

export default function StatusSteps({ status }: Props) {
  const currentIndex = STEPS.indexOf(status);

  return (

      <div className="flex justify-center items-center gap-6 p-6">

        {STEPS.map((label, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={label} className="flex items-center gap-6">
              {/* CIRCLE */}
              <div
                className={`
                  h-8 w-8 flex items-center justify-center rounded-full border 
                  text-sm font-semibold 
                  ${
                    isDone
                      ? "bg-green-500 text-white border-green-600"
                      : isCurrent
                      ? "bg-green-800 text-white border-green-900"
                      : "bg-gray-200 text-gray-700 border-gray-400"
                  }
                `}
              >
                {isDone ? (
                  <CheckIcon className="h-5 w-5 text-white" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  text-sm
                  ${isCurrent ? "font-semibold text-green-800" : "text-gray-600"}
                `}
              >
                {label}
              </span>

              {/* Arrow > (except last) */}
              {index < STEPS.length - 1 && (
                <span className="text-gray-400 text-lg">›</span>
              )}
            </div>
          );
        })}

      </div>
  );
}
