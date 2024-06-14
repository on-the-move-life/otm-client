import React, { useMemo } from 'react'

const FuturePlanSlider = ({month,theme, detail, index}) => {
  const colors = useMemo(() => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'], []);
  const headingColor = colors[(index % colors.length)];
  return(
      <div className='min-w-[310px] flex flex-col justify-start items-start gap-[2px]'>
          <div className='w-full bg-[#1c1c1e] px-3 py-2 rounded-t-[12px] flex gap-2'>
              <h1 className='text-[16px] text-white' style={{fontWeight: 600}}>{month}</h1>
              <h1 className='text-[16px]' style={{fontWeight: 600, color: headingColor}}>{theme}</h1>
          </div>
          <div className='w-full bg-[#1c1c1e] p-3 rounded-b-[12px]'>
              <p className='text-[14px] text-[#fff]' style={{fontWeight: 500}}>{detail}</p>
          </div>
      </div>
  )
}


const FuturePlan = ({apiData}) => {
  return (



<div className="w-full flex flex-col justify-center items-start">
        <h1 className='sm:text-3xl text-[22.33px] purple-gradient sm:text-center text-left w-full px-6' style={{ lineHeight: '25px', marginBlock: '10px' }}>Future Plan</h1>
          <div className='w-full flex flex-row gap-5 overflow-x-scroll hide-scrollbar px-2 mt-2'>
             {
               apiData?.data?.futurePlan?.map((item, index) => {
                  return (
                   <FuturePlanSlider month={item?.month} theme={item?.theme} detail={item?.details} index={index} key={item?.index}/>
                     )
                  })
              }
             </div>
       </div>

  )
}

export default FuturePlan;