import React, { useState } from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import PersonalTimeline from './PersonalTimeline';
import CommunityTimeline from './CommunityTimeline';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  const [timeline, setTimeline] = useState('community');
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen  flex-col px-4 py-8 ">
      <div className="mb-4">
        <HiArrowNarrowLeft
          size={20}
          onClick={() => {
            navigate('/home');
          }}
        />
      </div>
      <div className='w-full flex flex-row justify-between items-center'>
        <Heading>Timeline</Heading>
      </div>
      <div className="space-x-2 py-2">
        <button
          className={`${timeline === 'community'
            ? 'bg-white font-bold text-black '
            : 'border-[0.5px] border-lightGray text-white'
            } rounded-md px-3 py-0.5 text-xs`}
          onClick={() => {
            setTimeline('community');
          }}
        >
          Community
        </button>
        <button
          className={`${timeline === 'personal'
            ? 'bg-white font-bold text-black'
            : 'border-[0.5px] border-lightGray text-white'
            } rounded-md px-3 py-0.5 text-xs`}
          onClick={() => {
            setTimeline('personal')
          }}
        >
          Personal
        </button>
      </div>
      {timeline === 'community' ? <CommunityTimeline /> : <PersonalTimeline />}
    </div>
  );
};

export default Timeline;
