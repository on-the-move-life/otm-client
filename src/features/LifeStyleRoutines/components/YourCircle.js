import React, { useMemo, useEffect, useState } from 'react'
import {
    MorningCircleIcon,
    AfternoonCircleIcon,
    EveningCircleIcon,
    NightCircleIcon,
    AlwaysActiveIcon,
} from "../index";
// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CircleTask from './CircleTask';

function YourCircle({ name, tasks, percentCompletion, date }) {
    const [tasksName, setTasksName] = useState("");
    const [showCircleDetails, setShowCircleDetails] = useState(false);
    const circleIcons = useMemo(() => (
        {
            "Morning Circle": <MorningCircleIcon />,
            "Afternoon Circle": <AfternoonCircleIcon />,
            "Evening Circle": <EveningCircleIcon />,
            "Night Circle": <NightCircleIcon />,
            "Always Active Circle": <AlwaysActiveIcon />
        }
    ), [])
    const circleTime = useMemo(() => (
        {
            "Morning Circle": "8 AM",
            "Afternoon Circle": "12 PM",
            "Evening Circle": "5 PM",
            "Night Circle": "9 PM",
            "Always Active Circle": "ALL DAY"
        }
    ), [])
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

    useEffect(() => {
        if (tasks.length > 0) {
            setTasksName(tasks.map(task => task.name).join(", "));
        }
    }, [])

    return (
        <>
            {!showCircleDetails &&
                <div className='w-full flex flex-row justify-between items-center px-4 py-2 bg-[#1C1C1E] rounded-[12px]' onClick={() => setShowCircleDetails(true)}>
                    <div className='w-full flex flex-row justify-start items-center gap-5'>
                        <div>{circleIcons[name]}</div>
                        <div className='flex flex-col justify-center items-start'>
                            <p className='text-[12px] text-[#7E87EF] uppercase' style={{ fontWeight: 600 }}>{circleTime[name]}</p>
                            <p className='text-[#F8F8F8] text-[18.5px] capitalize'>{name}</p>
                            <p className='w-[200px] text-[#545454] text-[12px] whitespace-nowrap overflow-hidden text-ellipsis'>{tasksName}</p>
                        </div>
                    </div>
                    <div className='relative top-[8px]'>
                        <CircularProgressbar
                            value={percentCompletion}
                            circleRatio={0.50}
                            strokeWidth={14}
                            styles={buildStyles({
                                rotation: 0.75,
                                strokeLinecap: 'round',
                                trailColor: '#ffffff1f',
                                pathColor: color,
                                pathTransitionDuration: 0.5,
                            })}
                            className='h-[50px] w-full'
                        />
                    </div>
                </div>}
            {showCircleDetails && <CircleTask SelectedCircle={name} tasks={tasks} date={date} setShowCircleDetails={setShowCircleDetails}/>}
        </>
    )
}

export default YourCircle