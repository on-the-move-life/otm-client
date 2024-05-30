import React, { useState } from 'react'
import SummaryTile from "./components/SummaryTile";

function Summary({ circles }) {
  /**
   * completiongState : complete or incomplete
   * indices : 0 -> complete & 1 -> incomplete
   */
  const [completionState, setCompletionState] = useState(0);

  return (
      <div className='w-full flex flex-col justify-start items-center gap-3 '>
        {
          circles?.map((circle, index) => {
            return (
              <SummaryTile circle={circle} key={index}/>
            )
          })
        }
      </div>
  )
}

export default Summary