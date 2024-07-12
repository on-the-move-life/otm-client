import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getPreviousMonthYearInArray } from '../MonthlyWrapped/utils';

function MonthlyWrapped() {
    const navigate = useNavigate();
    const [month, year] = getPreviousMonthYearInArray();
  return (
    <div className='w-full min-h-[113px] rounded-[12px] bg-no-repeat bg-right' style={{backgroundImage: `url(${'/assets/monthly_wrapped_tile_bg.svg'})`}} onClick={() => navigate('/monthly-wrapped')}>
        <div className='w-full min-h-[113px] rounded-[12px] backdrop-brightness-150 backdrop-blur-xl bg-gradient-to-r from-[#1c1c1e] to-transparent flex flex-col justify-between items-start gap-3 overflow-hidden'>
            <div className='w-full flex flex-col justify-center items-start gap-0'>
                <h3 className='text-[#f8f8f8] text-[14px] py-2 px-3'>Monthly Wrapped</h3>
                <div className='w-full h-[1px] bg-black'/>
            </div>
            <div className='w-full flex flex-row px-3 justify-between items-center'>
                <img src={'/assets/monthly_wrapped_tile_stars.png'} alt="stars"/>
                <div className='flex flex-row justify-center items-center gap-1'>
                    <h3 className='text-[32.3px] text-white/90 relative top-[0.5rem]'>{month}</h3>
                    <span className='text-[99.7px] text-white/20' style={{fontWeight: 600, display: 'inline-block', lineHeight: '50px', height: '50px'}}>{year}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MonthlyWrapped