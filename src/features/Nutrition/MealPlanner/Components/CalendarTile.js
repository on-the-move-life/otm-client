import React from 'react';

function CalendarTile({ date, day, isSelected }) {
  return (
    <div
      className={`relative z-10 flex max-h-[74px] min-h-[54px] w-[47px] max-w-[70px] flex-col items-center   gap-1 rounded-[7.5px] ${
        isSelected && 'bg-[rgba(0,0,0,0.45)] '
      }`}
    >
      <div className="mt-2 flex w-full flex-col items-center justify-start">
        <h3
          className="capitalize"
          style={{
            fontSize: '14.87px',
            lineHeight: '17.75px',
            color: isSelected ? '#5ECC7B' : 'rgba(222,222,222,0.70)',
          }}
        >
          {day}
        </h3>
      </div>
      <h4
        style={{
          fontSize: '17.85px',
          lineHeight: '21.3px',
          color: isSelected ? '#5ECC7B' : 'rgba(222,222,222,0.70)',
        }}
      >
        {date}
      </h4>
    </div>
  );
}

export default CalendarTile;
