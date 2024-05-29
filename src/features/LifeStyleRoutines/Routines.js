import React from 'react'
import YourCircle from './components/YourCircle'

function Routines({ circles }) {
  return (
    <div className='w-full flex flex-col justify-center items-start gap-3'>
      <h3 className='text-[20px] capitalize text-[#FFF]' style={{ lineHeight: "32px" }}>Your Circles</h3>
      {
        circles && circles.map(circle => {
          return (
            <YourCircle name={circle?.name} percentCompletion={circle?.completionPercentage} tasks={circle?.tasks} />
          )
        })
      }
    </div>
  )
}

export default Routines