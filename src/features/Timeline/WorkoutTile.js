import React from 'react'
import { Container, WorkoutTileHeading, Rounds, Feedback } from './StyledComponents'

function WorkoutTile({ workoutName, rounds, feedback, workoutCompleted }) {
    return (
        <Container className='relative w-full flex flex-col justify-start items-start gap-3 p-2'>
            <div className='flex flex-col justify-center items-start gap-1'>
                <WorkoutTileHeading>{workoutName}</WorkoutTileHeading>
                {<Rounds>{rounds === "" ? '0 Rounds' : rounds}</Rounds>}
            </div>
            <div className='flex flex-col justify-center items-start gap-[1px]'>
                {feedback && feedback.map((feed, index) => {
                    return (
                        <Feedback key={index}>•{feed}</Feedback>
                    )
                })}
            </div>
            {workoutCompleted && <img src={'/assets/done.svg'} alt="done" className="absolute top-[6px] right-[6px]" />}
        </Container>
    )
}

export default WorkoutTile