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
      <div className="flex min-h-[113px] w-full flex-col items-start justify-between gap-3 overflow-hidden rounded-[12px] bg-gradient-to-r from-[#1c1c1e] to-transparent backdrop-blur-xl backdrop-brightness-150">
        <div className="flex flex-col items-start justify-center w-full gap-0">
          <h3 className="px-3 py-2 text-[14px] text-[#f8f8f8]">
            Monthly Wrapped
          </h3>
          <div className="h-[1px] w-full bg-black" />
        </div>
        <div className="flex flex-row items-center justify-between w-full px-3">
          <img src={'/assets/monthly_wrapped_tile_stars.png'} alt="stars" />
          <div className="flex flex-row items-center justify-center gap-1">
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
