import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getPreviousMonthYearInArray } from '../MonthlyWrapped/utils';

function MonthlyWrapped() {
  const navigate = useNavigate();
  const [month, year] = getPreviousMonthYearInArray();
  return (
    <div
      className="min-h-[113px] w-full rounded-[12px] bg-right bg-no-repeat"
      style={{
        backgroundImage: `url(${'/assets/monthly_wrapped_tile_bg.svg'})`,
      }}
      onClick={() => navigate('/monthly-wrapped')}
    >
      <div className="flex min-h-[103px] w-full flex-col items-start justify-between  overflow-hidden rounded-[12px] bg-gradient-to-r from-[#1c1c1e] to-transparent backdrop-blur-xl backdrop-brightness-150">
        <h3 className="px-3 py-2 text-[14px] text-[#f8f8f8]">OTM Wrapped</h3>

        <div className="flex w-full flex-row items-center justify-between pl-2">
          <img src={'/assets/monthly_wrapped_tile_stars.png'} alt="stars" />
          <div className="relative right-[0] ml-4 mt-[10px] flex flex-row items-center justify-center gap-1">
            <h3 className="relative top-[0.5rem] text-[32.3px] text-white/90">
              {month}
            </h3>
            <span
              className="text-[99.7px] text-white/20"
              style={{
                fontWeight: 600,
                display: 'inline-block',
                lineHeight: '50px',
                height: '50px',
              }}
            >
              {year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyWrapped;
