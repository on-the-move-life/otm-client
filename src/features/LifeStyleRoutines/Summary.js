import React, { useState } from 'react'
import SummaryTile from "./components/SummaryTile";

function Summary({ circles, date }) {

  return (
      <div className='w-full flex flex-col justify-start items-center gap-3 '>
        {
          circles?.map((circle, index) => {
            return (
              <SummaryTile circle={circle} key={index} date={date}/>
            )
          })
        }
      </div>
  )
}

export default Summary