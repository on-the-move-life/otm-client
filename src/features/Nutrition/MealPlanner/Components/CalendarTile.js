import React from 'react';

function CalendarTile({ date, day, isSelected, selectedDay }) {
  const dayDate = new Date(date);
  const isPast = dayDate < new Date(selectedDay);

  return (
    <div
      className={`relative z-10 flex max-h-[74px] min-h-[54px] min-w-[50px] max-w-[70px]  flex-col items-center justify-center gap-1 rounded-[7.5px] ${
        isSelected && 'bg-[rgba(0,0,0,0.45)] '
      }`}
    >
      <div className="flex flex-col items-center justify-start w-full ">
        {isSelected && (
          <div className="h-[4px] w-[4px] rounded-full bg-[#848CE9]"></div>
        )}
        <h3
          className="capitalize"
          style={{
            fontSize: '14.87px',
            lineHeight: '17.75px',
            color: isSelected
              ? '#848CE9'
              : isPast
              ? '#D3D3D3' // Change color for past dates
              : '#929292',
          }}
        >
          {day}
        </h3>
      </div>
      <h4
        style={{
          fontSize: '17.85px',
          lineHeight: '21.3px',
          color: isSelected ? '#848CE9' : '#929292',
        }}
      >
        {date}
      </h4>
    </div>
  );
}

export default CalendarTile;
