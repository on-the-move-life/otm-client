import React from 'react'
import info from './info.json'
import WorkoutGraph from './graphs/WorkoutGraph'
const WorkoutConsitency = () => {
  return (
    <div>
        <div className='sm:px-10 px-4 mt-16'>
      <h2 className='text-[#B1B1B1] sm:text-center text-left sm:text-lg text-xs tracking-[5px] font-sf-pro'>PERFORMACE STATS</h2>
      <h1 className='text-[#7E87EF] sm:text-3xl text-xl sm:text-center text-left sm:mt-8 mt-2 font-sf-pro'>Workout Consistency Progress</h1>
      </div>
      <div className='flex flex-row overflow-x-auto sm:max-w-screen-lg max-w-screen-[400px] mx-auto overflow-hidden px-2 sm:mt-14 mt-10'>
        <WorkoutGraph/>
      </div>
      <div className='sm:px-10 mt-8'>
        <p className='sm:text-base text-sm sm:text-center text-left sm:px-32 px-8 font-sf-pro'>{info.renewalReport.workoutConsistencySummary}</p>
      </div>
    </div>
  )
}

export default WorkoutConsitency