import React, { useMemo } from 'react';
// Import react-circular-progressbar module and styles
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDayOfWeek, extractDay, getColor } from '../utils';

function CalendarTile({
  date,
  percentCompletion,
  isSelected,
  setSelectedDate,
  isToday,
}) {
  const colors = useMemo(
    () => [
      { threshold: 25, color: '#e74c3c' },
      { threshold: 50, color: '#F5C563' },
      { threshold: 75, color: '#7E87EF' },
      { threshold: 100, color: '#5ECC7B' },
    ],
    [],
  );

  const color = getColor(colors, percentCompletion);
  const weekDay = getDayOfWeek(date);
  const day = extractDay(date);

  return (
    <div
      className={`relative flex h-[65px] w-fit grow flex-col items-center justify-center gap-0 rounded-[7.5px] pt-[9px] ${
        isSelected ? 'bg-black-opacity-45' : ''
      }`}
      onClick={() => {
        setSelectedDate(date);
      }}
    >
      {/* {isToday && isSelected && (
        <p className="absolute top-[-1px] mb-1 text-center text-[8px] text-[#929292]">
          Today
        </p>
      )} */}
      <h3
        className={`text-[15px] leading-[17.32px] ${
          isSelected ? 'text-[#F5C563]' : 'text-[#929292]'
        }`}
      >
        {weekDay}
      </h3>
      <h4
        className={`text-[18px] leading-[17.32px]  ${
          isSelected ? 'text-[#F5C563]' : 'text-[#929292]'
        }`}
      >
        {day}
      </h4>
      <div>
        <CircularProgressbar
          value={percentCompletion}
          circleRatio={0.5}
          strokeWidth={16}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: 'round',
            trailColor: '#ffffff1f',
            pathColor: color,
            textSize: '16px',
            pathTransitionDuration: 0.5,
          })}
          className="mt-1 h-[18px] w-[35.34px]" // Set the size of the progress bar
        />
      </div>
    </div>
  );
}

export default CalendarTile;
