import React, { useState } from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import PersonalTimeline from './PersonalTimeline';
import CommunityTimeline from './CommunityTimeline';
import { TimelineHeading } from './StyledComponents';
import { useNavigate } from 'react-router-dom';


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
        <TimelineHeading>Timeline</TimelineHeading>
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
