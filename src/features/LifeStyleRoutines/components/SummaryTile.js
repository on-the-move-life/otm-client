import React, { useMemo, useState, useEffect } from 'react'
import {
    GrayMorningCircleIcon,
    GrayAfternoonCircleIcon,
    GrayEveningCircleIcon,
    GrayNightCircleIcon,
    GrayAlwaysActiveCircleIcon,
} from "../index"
// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SummaryTag from './SummaryTag';
import CircleSummary from './CircleSummary';

/**
 * 
 * @returns a component which shows the list of completed and incompleted tasks
 */

function SummaryTile({ circle, date }) {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [incompletedTasks, setIncompletedTasks] = useState([]);
    const [showSummary, setShowSummary] = useState(false);

    const grayIcons = useMemo(() => {
        return (
            {
                "Morning Circle": <GrayMorningCircleIcon />,
                "Afternoon Circle": <GrayAfternoonCircleIcon />,
                "Evening Circle": <GrayEveningCircleIcon />,
                "Night Circle": <GrayNightCircleIcon />,
                "Always Active Circle": <GrayAlwaysActiveCircleIcon />
            }
        )
    }, [])

    const colors = useMemo(() => [
        { threshold: 25, color: '#e74c3c' },
        { threshold: 50, color: '#F5C563' },
        { threshold: 75, color: '#7E87EF' },
        { threshold: 100, color: '#5ECC7B' }
    ], []);

    // Determine the color based on the percentage
    const getColor = () => {
        for (let i = 0; i < colors.length; i++) {
            if (circle?.completionPercentage <= colors[i].threshold) {
                return colors[i].color;
            }
        }
        return colors[colors.length - 1].color; // Default to the last color if not matched
    };

    const color = getColor();

    useEffect(() => {
        setCompletedTasks(circle?.tasks.filter(task => task?.completed === true));
        setIncompletedTasks(circle?.tasks.filter(task => task?.completed !== true));
    }, [circle])

    return (
        <>
            {!showSummary && <div className='w-full flex flex-col justify-start items-start bg-transparent gap-[2px]' onClick={() => setShowSummary(true)}>
                <div className='w-full flex flex-row justify-between items-center  px-4 py-2 bg-[#1C1C1E] rounded-t-[12px]'>
                    <div className='flex flex-row justify-start items-center gap-[3px]'>
                        {grayIcons[circle?.name]}
                        <p className='text-[14px] text-[#F8F8F8]'>{circle?.name}</p>
                    </div>
                    <div className='relative top-[5px]'>
                        <CircularProgressbar
                            value={circle?.completionPercentage}
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
                            className='w-fit h-8' // Set the size of the progress bar
                        />
                    </div>
                </div>
                {completedTasks.length > 0 &&
                    <div className='w-full flex flex-row justify-start items-center gap-2 px-4 py-2 flex-wrap bg-[#1C1C1E]'>
                        {
                            circle?.tasks.map(task => {
                                return task?.completed === true && <SummaryTag key={task?.taskId} name={task?.name} id={task?.taskId} isCompleted={task?.completed} />
                            })
                        }
                    </div>
                }
                {incompletedTasks.length > 0 &&
                    <div className='w-full flex flex-row justify-start items-center gap-2 px-4 py-2 flex-wrap bg-[#1C1C1E] rounded-b-[12px]'>
                        {
                            circle?.tasks.map(task => {
                                return task?.completed !== true && <SummaryTag key={task?.taskId} name={task?.name} id={task?.taskId} isCompleted={task?.completed} />
                            })
                        }
                    </div>
                }
            </div>}
            {showSummary && <CircleSummary circleName={circle?.name} circleTasks={circle?.tasks} completionPercentage={circle?.completionPercentage} setShowSummary={setShowSummary} date={date}/>}
        </>
    )
}

export default SummaryTile