import React, { useState } from 'react';
import TimelineTile from './TimelineTile';

const Timeline = () => {
  const [showCommunity, setShowCommunity] = useState(true);
  const [showPersonal, setShowPersonal] = useState(false);

  return (
    <div className="flex h-screen w-screen  flex-col px-4 py-8 ">
      <heading>
        <h1 className="text-3xl">Timeline</h1>
        <div className="space-x-2 py-2">
          <button
            className={`${
              showCommunity
                ? 'bg-white font-bold text-black '
                : 'border-[0.5px] border-lightGray text-white'
            } rounded-md px-3 py-0.5 text-xs`}
            onClick={() => {
              setShowCommunity(true);
              setShowPersonal(false);
            }}
          >
            Community
          </button>
          <button
            className={`${
              showPersonal
                ? 'bg-white font-bold text-black'
                : 'border-[0.5px] border-lightGray text-white'
            } rounded-md px-3 py-0.5 text-xs`}
            onClick={() => {
              setShowPersonal(true);
              setShowCommunity(false);
            }}
          >
            Personal
          </button>
        </div>
      </heading>
      <div className='mt-4'>
        <TimelineTile />
      </div>
    </div>
  );
};

export default Timeline;
