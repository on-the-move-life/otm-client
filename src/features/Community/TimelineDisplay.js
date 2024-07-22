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
import { Name, Date, TagText, InfoTile } from '../Timeline/StyledComponents';
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

  return (
    <div>
      <h1 className="mb-4 mt-8 inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-xl font-semibold text-transparent">
        {timeline === 'personal' ? ' PERSONAL TIMELINE' : ' COMMUNITY TIMELINE'}
      </h1>
      <div
        className="flex flex-col items-center justify-center w-full gap-1"
        onClick={() => navigate(`/timeline/${timeline}`)}
      >
        <div className="flex w-full flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center justify-center gap-2 mb-2">
              {data?.profilePicture !== '' ? (
                <div className="flex flex-row items-center justify-center">
                  <ProfilePicture
                    inputPic={data?.profilePicture}
                    altText={data?.name}
                    width={'40px'}
                    height={'40px'}
                  />
                </div>
              ) : (
                <FaUserCircle size={40} color={'#91BDF6'} />
              )}
              <Name>{data?.name}</Name>
            </div>
            <div
              style={{ backgroundColor: color }}
              className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]"
            >
              <TagText>{tag}</TagText>
            </div>
          </div>

          <Date>{formattedDate}</Date>
          <div className="flex flex-row my-2 space-x-3 text-xs timeline-tags">
            {/* <InfoTile>Horizontal Pull</InfoTile> */}
            <InfoTile>{formattedTime}</InfoTile>
            <InfoTile>Total Workouts {data?.consistency?.total}</InfoTile>
            <div className="flex items-center justify-center gap-2 rounded border  border-white-opacity-23 bg-[rgba(59,59,59,0.06)] p-0.5 px-2 backdrop-blur-[17px]">
              <img
                src={`${process.env.PUBLIC_URL}/assets/move-coins-logo.svg`}
                className="w-4 h-4"
                alt="move coins logo"
              />
              <p>{data?.moveCoins} Coins</p>
            </div>

            {/* <InfoTile>700Kcal</InfoTile> */}
          </div>
          <div
            className="flex flex-row items-center justify-end gap-1 pt-5 select-none text-green"
            onClick={() => {
              setCollapsed(false);
            }}
          >
            <p className="text-sm">show more</p>
            <IoIosArrowDropdownCircle size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineDisplay;
