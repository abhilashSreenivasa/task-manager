import { useEffect, useState } from "react";

// --- Type Definitions ---
interface StepperHorizontalProps {
    status: 'Cancelled' | string; // Explicitly showing 'Cancelled' as a possible value
}

// --- Date Formatting Helper Function ---
// This function determines the correct ordinal suffix for the day (st, nd, rd, th)
function formatOrdinalDate(date: Date): string {
    // 1. Get day, month, and year parts
    const day = date.getDate();
    const year = date.getFullYear();

    // Array of abbreviated months (e.g., 'Jan', 'Feb', 'Mar')
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    // getMonth() returns 0-11, so we index into the array
    const month = monthNames[date.getMonth()]; 

    // 2. Determine the correct ordinal suffix
    function getSuffix(d: number): string {
        // Handle 11th, 12th, 13th explicitly, as they break the standard rule
        if (d > 3 && d < 21) return 'th'; 
        
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    // 3. Combine parts into the final string
    return `${day}${getSuffix(day)} ${month} ${year}`;
}

// --- Main Component ---
const StepperHorizontal = ({ status }: StepperHorizontalProps) => {
    const [dateStr, setDateStr] = useState<string>("");

    // Use useEffect to calculate and set the date string only once on mount
    useEffect(() => {
        setDateStr(formatOrdinalDate(new Date()));
    }, []); // Empty dependency array ensures it runs once

    // Determine the background color class conditionally
    const backgroundColorClass = status === "Cancelled" ? 'bg-red-600' : 'bg-lime-600';

    return (
        <div 
            // Combined Tailwind classes: structure, padding, rounded corners, shadow, and conditional color
            className={`
                flex flex-1 p-4 justify-center items-center text-center
                shadow-lg transition-colors duration-300
                text-white font-extrabold text-lg tracking-wide m-0
                ${backgroundColorClass}
            `}
        >
            {/* Display status text conditionally */}
            <span className="truncate">
                {status === "Cancelled" ? 'Cancelled on ' : 'Completed on '} 
            </span>
            {/* Display the formatted date */}
            <span className="ml-1">
                {dateStr}
            </span>
        </div>
    );
}

// --- Application Wrapper (for demonstration) ---
// This is required to make the component runnable in a single file environment.


export default StepperHorizontal;