import React from 'react'
import SummaryTile from "./components/SummaryTile";
import { isIPhone } from './utils';

function Summary({ circles, date }) {

  return (
      <div className='w-full flex flex-col justify-start items-center gap-3 ' style={{paddingBottom: isIPhone() ? '100px' : ''}}>
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