import React, { useEffect, useState, useMemo } from 'react'
import TaskItem from './taskitem.js';
import {
    MorningCircleIcon,
    AfternoonCircleIcon,
    EveningCircleIcon,
    NightCircleIcon,
    AlwaysActiveIcon
} from "../index.js"
import { formatDate } from "../utils.js";

const CircleTask = ({ SelectedCircle, tasks, date, setShowCircleDetails }) => {
    const circleIcons = useMemo(() => (
        {
            "Morning Circle": <MorningCircleIcon />,
            "Afternoon Circle": <AfternoonCircleIcon />,
            "Evening Circle": <EveningCircleIcon />,
            "Night Circle": <NightCircleIcon />,
            "Always Active Circle": <AlwaysActiveIcon />
        }
    ), [])


    return (
        <div className="w-full h-screen fixed top-0 left-0 z-50 p-2 bg-black text-white rounded-lg">
            <div className="relative flex items-center p-4 bg-black text-white">
                {/* BackButton */}
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none" onClick={() => setShowCircleDetails(false)}>
                    <path d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z" fill="#7E87EF" />
                </svg>
                {/* Date */}
                <div className="w-full flex justify-center">
                    <span className="text-lightGray font-sfpro text-sm font-medium ">{formatDate(date)[0]}, {formatDate(date)[1]}</span>
                </div>
            </div>
            <div className="flex p-2">
                {circleIcons[SelectedCircle]}
                <h1 className="text-2xl leading-normal text-white font-sfpro font-medium capitalize p-1">{SelectedCircle}</h1>
            </div>

            <div className='p-2'>
                {tasks.map((task, index) => (
                    <TaskItem key={task?.taskId} task={task} SelectedCircle={SelectedCircle} index={index} />
                ))}

            </div>
        </div>
    )
}

export default CircleTask