import React, { useEffect, useState } from 'react';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import PersonalTimeline from './PersonalTimeline';
import CommunityTimeline from './CommunityTimeline';
import { TimelineHeading } from './StyledComponents';
import { useNavigate, useParams } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedComponent';

const Timeline = () => {
  const [timeline, setTimeline] = useState(null);
  const navigate = useNavigate();

  const { value } = useParams();
  useEffect(() => {
    setTimeline(value);
  }, [value]);

  return (
    <AnimatedPage>
      <div className="flex flex-col w-screen h-full px-4 py-8 hide-scrollbar">
        <div className="mb-4">
          <HiArrowNarrowLeft
            size={20}
            onClick={() => {
              navigate('/community');
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-between w-full"></div>
        <h1 className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-xl font-semibold text-transparent">
          {value === 'community' ? (
            <TimelineHeading>Community Timeline</TimelineHeading>
          ) : (
            <TimelineHeading>Personal Timeline</TimelineHeading>
          )}
        </h1>
        {/* further need in future */}
        {/* <div className="py-2 space-x-2">
          <button
            className={`${
              timeline !== null && timeline === 'community'
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
            className={`${
              timeline !== null && timeline === 'personal'
                ? 'bg-white font-bold text-black'
                : 'border-[0.5px] border-lightGray text-white'
            } rounded-md px-3 py-0.5 text-xs`}
            onClick={() => {
              setTimeline('personal');
            }}
          >
            Personal
          </button>
        </div> */}
        {timeline === 'community' ? (
          <CommunityTimeline />
        ) : (
          <PersonalTimeline />
        )}
      </div>
    </AnimatedPage>
  );
};

export default Timeline;
