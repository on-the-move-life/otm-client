import React, { useState } from 'react'
import CircleSummary from './components/CircleSummary';

function Summary({ circles }) {
  /**
   * completiongState : complete or incomplete
   * indices : 0 -> complete & 1 -> incomplete
   */
  const [completionState, setCompletionState] = useState(0);

  return (
    <div className='w-full flex flex-col justify-center items-start gap-3'>
      <p className='text-[14px] text-[#B1B1B1]'>Motivational quote or message based on user's performance.</p>
      <div className='w-full flex flex-row justify-start items-center gap-4'>

        <div className={`flex flex-row items-center justify-center gap-1  py-[2px] px-[8px] rounded-[4px] ${completionState === 0 ? 'bg-[#5ECC7B] text-black' : 'bg-transparent text-[#5ECC7B] border-[0.9px] border-[#5ECC7B]'}`} onClick={() => setCompletionState(0)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 5.11079L4.05556 8.16634L10.7778 0.833008" stroke={completionState === 0 ? 'black' : '#5ECC7B'} stroke-opacity="0.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p>Complete</p>
        </div>

        <div className={`flex flex-row items-center justify-center gap-1 py-[2px] px-[8px] rounded-[4px] ${completionState === 1 ? 'bg-[#FA5757] text-black' : 'bg-transparent text-[#FA5757] border-[0.9px] border-[#FA5757]'}`} onClick={() => setCompletionState(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M8.11068 0.833008L0.777344 8.16586M8.11068 8.16634L0.777344 0.83349" stroke={completionState === 1 ? 'black' : '#FA5757'} stroke-opacity="0.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p>Incomplete</p>
        </div>

      </div>
      <div className='w-full flex flex-col justify-start items-center gap-2 h-[60vh] overflow-y-scroll'>
        {
          circles?.map((circle, index) => {
            return (
              <CircleSummary circleName={circle?.name} circleTasks={circle?.tasks} completionState={completionState} key={circle?.name} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Summary