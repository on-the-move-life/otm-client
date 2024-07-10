import React from 'react'
import YourCircle from './components/YourCircle'

function Routines({ circles, date, setReloadCounter }) {
  return (
    <div className='w-full flex flex-col justify-center items-start gap-3'>
      <h3 className='text-[20px] capitalize text-[#FFF]' style={{ lineHeight: "32px" }}>Your Circles</h3>
      {
        circles && circles.map(circle => {
          return (
            <YourCircle name={circle?.name} percentCompletion={circle?.completionPercentage} tasks={circle?.tasks} date={date} setReloadCounter={setReloadCounter} time={circle?.time} streak={circle?.streak} streakMessage={circle?.streakMessage}/>
          )
        })
      }
    </div>
  )
}

export default Routines