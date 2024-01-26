import React from 'react';

const TimelineTile = () => {
  return (
    <div className="flex w-full flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
      <h1 className="text-xl font-bold purple-gradient">Rishi Solanki #1</h1>

      <h3 className="text-sm">10th Dec</h3>
      <div className="timeline-tags space-x-3 text-xs my-2">
        <span>Horizontal Pull</span>
        <span> 11:30 AM</span>
        <span>700Kcal</span>
      </div>
    </div>
  );
};

export default TimelineTile;
    