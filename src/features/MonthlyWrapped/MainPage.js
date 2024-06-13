import React from 'react'
import BarChart from './Components/BarChart'
function MainPage() {
  return (
    <div className='w-full h-screen bg-center bg-no-repeat bg-cover' style={{backgroundImage: `url(${'/assets/monthly_wrapped_bg.svg'})`}}>
        <div className='w-full h-full bg-black/40 backdrop-blur-sm px-3 py-5'>
            <BarChart/>
        </div>
    </div>
  )
}

export default MainPage