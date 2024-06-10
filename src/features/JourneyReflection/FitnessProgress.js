import React from 'react'
import FitnessGraph from './graphs/FitnessGraph'
import info from './info.json';

const FitnessProgress = () => {
  return (
    <div>
      <div className='sm:px-10 px-4 sm:mt-10 mt-4'>
      <h1 className='text-[#7E87EF] sm:text-2xl text-[22.33px] sm:text-center text-left sm:mt-8 mt-2 font-sf-pro'>Fitness Score Progress</h1>
      </div>
      <div className='flex flex-row overflow-x-auto hide-scrollbar sm:max-w-screen-lg max-w-screen-[400px] mx-auto overflow-hidden sm:mt-14 mt-10'>
        <FitnessGraph/>
      </div>
      <div>
      <p className='sm:text-base text-sm sm:text-center text-left sm:px-32 px-4 mt-8 font-sf-pro'>{info.renewalReport.fitnessScore}</p>
      </div>
    </div>
  )
}

export default FitnessProgress