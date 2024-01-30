import React from 'react'
import TimelineTile from './TimelineTile'

function PersonalTimeline() {
    return (
        <div className='h-screen flex flex-col justify-start itmes-center gap-3 mt-3 overflow-y-scroll'>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
            <TimelineTile currScore={3.5} prevScore={4.5}/>
        </div>
    )
}

export default PersonalTimeline