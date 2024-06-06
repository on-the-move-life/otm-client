import React from 'react'
import FitnessGraph from './graphs/FitnessGraph'
import info from './info.json';

const FitnessProgress = () => {
  return (
    <div>
      <div className='sm:px-10 px-4 mt-16'>
      <h1 className='text-[#7E87EF] sm:text-3xl text-xl sm:text-center text-left font-serif sm:mt-8 mt-2'>Fitness Score Progress</h1>
      </div>
      <div className='sm:px-10 px-4 mt-8 flex flex-col items-center justify-center'>
        <FitnessGraph/>
        <p className='sm:text-base text-xs sm:text-center text-left sm:px-32 px-8 mt-8'>{info.renewalReport.fitnessScore}</p>
      </div>
    </div>
  )
}

export default FitnessProgress