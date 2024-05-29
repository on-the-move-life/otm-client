import React, { useMemo, useEffect } from 'react'
import {
    GrayMorningCircleIcon,
    GrayAfternoonCircleIcon,
    GrayEveningCircleIcon,
    GrayNightCircleIcon,
    GrayAlwaysActiveCircleIcon,
    Mood1Icon,
    Mood2Icon,
    Mood3Icon,
    Mood4Icon,
    Mood5Icon,
} from "../index"

/**
 *  
 * @returns a summary component for each task of the particular circle
 */

function SummaryTile({ circleName, taskName, comment, mood, isCompleted }) {
    useEffect(() => {
        console.log("task name , mood : ", taskName, mood)
    }, [])
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

    const moodIcons = useMemo(() => {
        return(
            {
                1: <Mood1Icon/>,
                2: <Mood2Icon/>,
                3: <Mood3Icon/>,
                4: <Mood4Icon/>,
                5: <Mood5Icon/>
            }
        )
    }, [])

    return (
        <div className='w-full flex flex-row justify-between items-center px-4 py-2 bg-[#1C1C1E] rounded-[12px]'>
            <div className='w-full flex flex-col justify-center items-start gap-1'>
                <div className='flex flex-row justify-start items-center gap-[2px]'>
                    {grayIcons[circleName]}
                    <p className='text-[9.8px] text-[#929292]'>{circleName}</p>
                </div>
                <h3 className={`text-[18.5px] capitalize ${!isCompleted ? 'text-[#929292]' : 'text-[#F8F8F8]'}`}>{taskName}</h3>
                {/* Not sure about this check is this comment could appear in the non-completed tasks also */}
                {isCompleted === true && <p className='text-[#545454] text-[12px]' style={{ fontWeight: 400 }}>comments about this routine go here they can stretch to required height</p>}
            </div>
            {/* Not sure about this check is this comment could appear in the non-completed tasks also */}
            {isCompleted === true && mood !== undefined && moodIcons[mood]}
        </div>
    )
}

export default SummaryTile