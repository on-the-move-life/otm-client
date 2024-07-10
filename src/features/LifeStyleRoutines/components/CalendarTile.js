import React, { useMemo } from 'react'
// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getDayOfWeek, extractDay, getColor } from '../utils';
import Fire from './Fire';

function CalendarTile({ date, percentCompletion, isSelected, setSelectedDate, isToday }) {
    const colors = useMemo(() => [
        { threshold: 25, color: '#e74c3c' },
        { threshold: 50, color: '#F5C563' },
        { threshold: 75, color: '#7E87EF' },
        { threshold: 100, color: '#5ECC7B' }
    ], []);

    const color = getColor(colors, percentCompletion);
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
                {percentCompletion !== 100 ?
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
                    /> :
                    <CircularProgressbarWithChildren
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
                    >
                        <Fire className={'relative top-[-5px]'}/>
                    </CircularProgressbarWithChildren>
                }
            </div>
        </div>
    )
}

export default CalendarTile