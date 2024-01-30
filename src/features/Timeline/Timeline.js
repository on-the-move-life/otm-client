import React, { useState } from 'react';
import TimelineTile from './TimelineTile';
import styled from 'styled-components';

const Heading = styled.h1`
color: var(--White, #FFF);
text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: 40px; /* 125% */
`

const Timeline = () => {
  const [showCommunity, setShowCommunity] = useState(true);
  const [showPersonal, setShowPersonal] = useState(false);

  return (
    <div className="flex h-screen w-screen  flex-col px-4 py-8 ">
      <heading>
        <Heading>Timeline</Heading>
        <div className="space-x-2 py-2">
          <button
            className={`${showCommunity
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
            className={`${showPersonal
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
      <div className='flex flex-col justify-start itmes-center'>
        <TimelineTile />
      </div>
    </div>
  );
};

export default Timeline;
