import React, { useMemo } from 'react'
import info from './info.json';


const ObjectiveSlider = ({heading, detail, index}) => {
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

const Objectives = () => {
    const { objectives } = info.renewalReport;
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-start sm:mt-10 mt-4">
        <h1 className='sm:text-2xl text-[22.33px] purple-gradient sm:text-center text-left w-full px-4' style={{ lineHeight: '40px', marginBlock: '10px' }}>Your Top 3 Objectives</h1>
          <div className='w-full flex flex-row gap-5 overflow-x-scroll hide-scrollbar sm:py-10 py-8 px-4'>
             {
               objectives?.map((item, index) => {
                  return (
                   <ObjectiveSlider heading={item?.heading} detail={item?.details} index={index} key={item?.heading}/>
                     )
                  })
              }
             </div>
       </div>
    </div>
  )
}

export default Objectives