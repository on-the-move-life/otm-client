import React from 'react'
import SummaryTile from './SummaryTile'

/**
 * 
 * @returns a summary component for each circle
 * 
 * Based on completion state (0 or 1), we have to show the completed or incompleted tasks
 */
function CircleSummary({ circleName, circleTasks, completionState }) {
    if (completionState === 0) {
        return (
            <div className='w-full flex flex-col justify-start items-center gap-2'>
                {circleTasks.map(task => {
                    if (task?.completed === true) {
                        return (
                            <SummaryTile circleName={circleName} taskName={task?.name} mood={task?.mood} isCompleted={task?.completed} key={task?.name}/>
                        )
                    }
                })}
            </div>
        )
    }

    else if (completionState === 1) {
        return (
            <div className='w-full flex flex-col justify-start items-center gap-2'>
                {circleTasks && circleTasks?.map(task => {
                    if (task?.completed === false || task?.completed === undefined) {
                        return (
                            <SummaryTile circleName={circleName} taskName={task?.name} mood={task?.mood} isCompleted={task?.isCompleted} />
                        )
                    }
                })}
            </div>
        )
    }
}

export default CircleSummary