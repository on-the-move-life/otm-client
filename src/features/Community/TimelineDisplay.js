import React, { useState, useRef } from 'react';

import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
  IoIosArrowDown,
  IoMdArrowRoundUp,
} from 'react-icons/io';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import ProfilePicture from '../Profile/ProfilePicture';
import { useFormattedDateTime } from '../../hooks/useFormattedDateTime';
import { useTagAndColor } from '../../hooks/useTagAndColor';

import { motion } from 'framer-motion';
import AssesmentTile from '../Timeline/AssesmentTile';
import WorkoutTile from '../Timeline/WorkoutTile';
import IndividualComment from '../Timeline/IndividualComment';
import {
  Name,
  Date,
  TagText,
  CommunityTile,
  CommunityName,
} from '../Timeline/StyledComponents';
import { axiosClient } from '../Timeline/apiClient';
import { useNavigate } from 'react-router-dom';

const TimelineDisplay = ({ data, timeline }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [coachNoteIndex, setCoachNoteIndex] = useState(0);
  const [achievementsIndex, setAchievementsIndex] = useState(0);

  // custom hooks
  const [formattedDate, formattedTime] = useFormattedDateTime(data?.time);
  const [tag, color, position, tags, colors] = useTagAndColor(
    data?.fitnessScoreUpdates?.newScore,
  );

  const navigate = useNavigate();

  console.log(data);

  return (
    <div
      className="flex w-full flex-col   gap-[2px] rounded-xl bg-mediumGray px-1 pb-1"
      onClick={() => navigate(`/timeline/${timeline}`)}
    >
      <h1 className=" flex  h-[32px]  items-center pl-5 text-sm ">
        {timeline === 'personal'
          ? 'Your personal timeline'
          : 'Community timeline'}
      </h1>
      <div className="flex w-full flex-col rounded-xl  bg-black px-[11px] py-4">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="mb-2 flex flex-row items-center justify-center gap-2">
            <CommunityName>{data?.name}</CommunityName>
          </div>
          <div
            style={{ backgroundColor: color }}
            className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]"
          >
            <TagText>{tag}</TagText>
          </div>
        </div>

        <Date>{formattedDate}</Date>
        <div className="timeline-tags   flex flex-row flex-wrap text-xs">
          {/* <InfoTile>Horizontal Pull</InfoTile> */}
          <CommunityTile>{formattedTime}</CommunityTile>
          <CommunityTile>
            Total Workouts {data?.consistency?.total}
          </CommunityTile>
          <div className="flex items-center justify-center gap-2 rounded border  border-white-opacity-23 bg-[rgba(59,59,59,0.06)] p-0.5 px-2 backdrop-blur-[17px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/move-coins-logo.svg`}
              className="h-4 w-4"
              alt="move coins logo"
            />
            <p>{data?.moveCoins} Coins</p>
          </div>

          {/* <InfoTile>700Kcal</InfoTile> */}
        </div>

        {/* <InfoTile>700Kcal</InfoTile> */}
      </div>
    </div>
  );
};

export default TimelineDisplay;
