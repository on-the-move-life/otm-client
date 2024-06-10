import React, { useMemo } from 'react'
// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    format,
    parse
} from 'date-fns';

function CalendarTile({ date, percentCompletion, isSelected, setSelectedDate, isToday }) {
    const colors = useMemo(() => [
        { threshold: 25, color: '#e74c3c' },
        { threshold: 50, color: '#F5C563' },
        { threshold: 75, color: '#7E87EF' },
        { threshold: 100, color: '#5ECC7B' }
    ], []);

    // Determine the color based on the percentage
    const getColor = () => {
        for (let i = 0; i < colors.length; i++) {
            if (percentCompletion <= colors[i].threshold) {
                return colors[i].color;
            }
        }
        return colors[colors.length - 1].color; // Default to the last color if not matched
    };

    /**
     * Returns the day of the week as a short string (e.g. "Fri", "Thu", "Mon", etc.)
     * for a given input string in the format "May 30 2024".
     *
     * @param {string} inputString - The input string in the format "May 30 2024".
     * @returns {string} The day of the week as a short string (e.g. "Fri", "Thu", "Mon", etc.).
     */
    const getDayOfWeek = (inputString) => {
        const date = parse(inputString, 'MMMM d yyyy', new Date());
        return format(date, 'EEE');
    };

    /**
     * Extracts the day from a string input with a date in the format "Month Day Year".
     * Handles various month names and abbreviations.
     *
     * @param {string} dateString - The input string with a date in the format "Month Day Year" (e.g. "May 24 2024", "May 24, 2024", "May-24-2024", "May 24th 2024", "May 24 2,024").
     * @returns {number} The day of the month (e.g. 24).
     */
    const extractDay = (dateString) => {
        /**
         * Regular expression to match the day part of the date string.
         * Matches one or more digits (\d+) surrounded by optional whitespace characters (\s*)
         * and/or punctuation characters ([-,\.])
         */
        const dayRegex = /\s*[-,\.]?\s*(\d+)\s*[-,\.]?\s*/;

        try {
            const match = dateString.match(dayRegex);
            if (match) {
                return parseInt(match[1], 10); // Return the day as an integer
            } else {
                throw new Error(`Invalid date format: ${dateString}`);
            }
        } catch (err) {
            console.error(`extractDay error: ${err}`);
            return NaN; // Return NaN if an error occurs
        }
    };

    const color = getColor();
    const weekDay = getDayOfWeek(date);
    const day = extractDay(date);
    return (
        <div className={`relative w-fit h-[100px] px-3 flex flex-col justify-center items-center gap-0 rounded-[7.5px] ${isSelected ? 'bg-[#929292]/30' : ''}`} onClick={() => {
            setSelectedDate(date);
        }}>
            {isToday && <p className='absolute text-center top-[-15px] mb-1 text-[#929292] text-[20px]'>.</p>}
            <h3 className={`text-[15px] ${isSelected ? 'text-[#7E87EF]' : 'text-[#929292]'}`}>{weekDay}</h3>
            <h4 className={`text-[18px]  ${isSelected ? 'text-[#7E87EF]' : 'text-[#f8f8f8]'}`}>{day}</h4>
            <div>
                <CircularProgressbar
                    value={percentCompletion}
                    circleRatio={0.50}
                    strokeWidth={14}
                    styles={buildStyles({
                        rotation: 0.75,
                        strokeLinecap: 'round',
                        trailColor: '#ffffff1f',
                        pathColor: color,
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                    })}
                    className='w-20 h-8' // Set the size of the progress bar
                />
            </div>
        </div>
    )
}

export default CalendarTile