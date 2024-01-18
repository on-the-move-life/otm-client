import React from 'react';

const LeaderboardItem = ({ rank, imgUrl, name, count }) => {
  const defaultClassName =
    'w-7/8 h-[70px] mix-blend-screen bg-neutral-700 bg-opacity-30 rounded-xl border border-purple-300 flex flex-row justify-between p-4';

  return (
    <div className={defaultClassName}>
      <div className="flex flex-row items-center justify-between px-4 border border-b-red-500">
        <span>{rank}</span>
        <img className='rounded-full h-8 bg-blue mx-4' src={imgUrl} />
        <span>{name}</span>
      </div>

      <div className="flex flex-row items-center justify-around px-4 border border-red-500">
        <span className='mr-4'>{count}</span>
        <span>5%</span>
      </div>
    </div>
  );
};

export default LeaderboardItem;
