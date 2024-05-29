import React, { useMemo } from 'react'
// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Fire from './icons/Fire';

function CalendarTile({ day, date, percentCompletion, isSelected, setSelectedDate, todayDate, todayDay }) {
    const angle = (percentCompletion / 100) * 180;
    const weekDays = useMemo(() => (
            {'Mon': 1,
            'Tue': 2,
            'Wed': 3,
            'Thu': 4,
            'Fri': 5,
            'Sat': 6,
            'Sun': 0}), [])
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

    const color = getColor();
    return (
        <div className={`relative w-fit h-[100px] px-3 flex flex-col justify-center items-center gap-0 rounded-[7.5px] ${isSelected ? 'bg-[#929292]/30' : ''}`} onClick={() => {
            if(todayDay !== 0 && weekDays[day] <= todayDay && weekDays[day] !== 0)
                setSelectedDate(date);
            else if(todayDay === 0)
                setSelectedDate(date);
        }}>
            {todayDate === date && <p className='absolute text-center top-[-15px] mb-1 text-[#929292] text-[20px]'>.</p>}
            <h3 className={`text-[15px] ${(todayDay !== 0 && weekDays[day] <= todayDay && weekDays[day] !== 0) ? 'text-[#929292]' : 'text-[#ffffff1f]'}`}>{day}</h3>
            <h4 className={`text-[18px] ${(todayDay !== 0 && weekDays[day] <= todayDay && weekDays[day] !== 0) ? 'text-[#f8f8f8]' : 'text-[#ffffff1f]'}`}>{date}</h4>
            {
                percentCompletion === 100 ? (
                    <CircularProgressbarWithChildren
                        value={(todayDay !== 0 && weekDays[day] <= todayDay && weekDays[day] !== 0) ? percentCompletion : 0}
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
                    >
                        <Fire />
                    </CircularProgressbarWithChildren>
                ) : (
                    <CircularProgressbar
                        value={(todayDay !== 0 && weekDays[day] <= todayDay && weekDays[day] !== 0) ? percentCompletion : 0}
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
                )
            }

        </div>
    )
}

export default CalendarTile