import React, { useMemo } from 'react'
import info from './info.json';

const TrackSlider = ({heading, detail, index}) => {
  const colors = useMemo(() => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'], []);
  const headingColor = colors[(index % colors.length)];
  return(
      <div className='min-w-[300px] flex flex-col justify-start items-start gap-[2px]'>
          <div className='w-full bg-[#1c1c1e] px-3 py-2 rounded-t-[12px]'>
              <h1 className='text-[16px]' style={{fontWeight: 600, color: headingColor}}>{heading}</h1>
          </div>
          <div className='w-full bg-[#1c1c1e] p-3 rounded-b-[12px]'>
              <p className='text-[14px] text-[#fff]' style={{fontWeight: 500}}>{detail}</p>
          </div>
      </div>
  )
}

const Track = () => {
    const {futureStrategies} = info.renewalReport;
  return (
    <div>
      <div className='sm:px-10 px-2 sm:mt-10 mt-8'>
        <h1 className='text-[#7E87EF] sm:text-2xl text-[22.33px] sm:text-center text-left font-sf-pro'>What More We Want to Track</h1>
        <p className='text-white sm:text-base text-sm sm:text-center text-left sm:px-32 mt-8 font-sf-pro'>To take your fitness journey to the next level, we've got a few extra metrics to track that'll make you feel like a true <span className='text-[#7E87EF]'>fitness superhero</span></p>
      </div>
      <div className="w-full flex flex-col justify-center items-start" >
          <div className='w-full flex flex-row gap-5 overflow-x-scroll hide-scrollbar sm:py-10 py-8 px-4'>
             {
               futureStrategies?.map((item, index) => {
                  return (
                   <TrackSlider heading={item?.heading} detail={item?.details} index={index} key={item?.heading}/>
                     )
                  })
              }
             </div>
       </div>
    </div>
  )
}

export default Track