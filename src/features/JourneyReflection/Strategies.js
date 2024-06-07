import React from 'react'
import info from './info.json'
const Strategies = () => {
    const {futureStrategies} = info.renewalReport;
  return (
    <div>
        <div className='sm:px-10 px-4 mt-20'>
        <h1 className='text-[#7E87EF] sm:text-4xl text-2xl sm:text-center text-left font-sf-pro'>Strategies To Build</h1>
      </div>
      <div className='flex flex-row overflow-x-auto sm:max-w-screen-lg max-w-screen-[400px] mx-auto overflow-hidden px-2 sm:mt-12 mt-10'>
      {futureStrategies.map((prod,index)=>{
          return (
            <div key={index} className='flex-shrink-0 w-4/5 sm:w-[600px] h-auto p-4 bg-black m-1 rounded-md'>
            <h2 className='text-[#7E87EF] sm:text-lg text-sm text-center font-sf-pro'>{prod.heading}</h2>
            <hr className="my-2 border-gray-300" />
            <p className='sm:max-w-xl text-xs font-sf-pro'>{prod.details}</p>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Strategies