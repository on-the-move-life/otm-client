import React from 'react'
import TimelineTile from './TimelineTile'

function CommunityTimeline() {
    return (
        <div className='flex flex-col justify-start itmes-center gap-3 mt-3'>
            <TimelineTile />
            <TimelineTile />
            <TimelineTile />
        </div>
    )
}

export default CommunityTimeline