import React, { useMemo, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import AssesmentTile from './AssesmentTile';
import WorkoutTile from './WorkoutTile';
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
  IoIosHeartEmpty,
  IoIosHeart,
  IoIosArrowDown,
  IoMdArrowRoundUp,
} from 'react-icons/io';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

const Name = styled.div`
  color: var(--New-purple, #a680dd);
  text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 160% */
  text-transform: capitalize;
`;
const InfoTile = styled.p`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.23);
  background: rgba(59, 59, 59, 0.06);
  backdrop-filter: blur(17px);
`;

const Date = styled.div`
  color: var(--New-White, var(--White, #fff));
  text-shadow: 0px 2.26px 2.26px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15.068px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.11px; /* 160% */
  text-transform: capitalize;
`;
const TagText = styled.p`
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: normal;
  letter-spacing: -0.36px;
  text-transform: capitalize;
`;
const TimelineTile = ({
  name,
  dateTime,
  kcal,
  workoutName,
  currScore,
  prevScore,
  sectionPerformance,
  coachNotes,
  achievements,
  profilePicture
}) => {
  const tags = useMemo(
    () => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'],
    [],
  );
  const colors = useMemo(
    () => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'],
    [],
  );
  const [tag, setTag] = useState(tags[0]);
  const [color, setColor] = useState(colors[0]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [coachNoteIndex, setCoachNoteIndex] = useState(0);
  const [achievementsIndex, setAchievementsIndex] = useState(0);


  function formatDateTime(inputDateTime) {
    const [datePart, timePart, ampm] = inputDateTime.split(' ');
    const [month, day, year] = datePart.split('/');

    const formattedDate = `${addOrdinalSuffix(parseInt(day))} ${getMonthName(
      parseInt(month),
    )}`;
    const formattedTime = `${timePart} ${ampm}`;

    return [formattedDate, formattedTime];
  }

  function getMonthName(month) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[month - 1];
  }

  function addOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  useEffect(() => {
    const formattedDateTime = formatDateTime(dateTime);
    setDate(formattedDateTime[0]);
    setTime(formattedDateTime[1]);
    if (currScore >= 0 && currScore < 2) {
      setTag(tags[0]);
      setColor(colors[0]);
    } else if (currScore >= 2 && currScore < 4) {
      setTag(tags[1]);
      setColor(colors[1]);
    } else if (currScore >= 4 && currScore < 6) {
      setTag(tags[2]);
      setColor(colors[2]);
    } else if (currScore >= 6 && currScore < 8) {
      setTag(tags[3]);
      setColor(colors[3]);
    } else {
      setTag(tags[4]);
      setColor(colors[4]);
    }
  }, [currScore, colors, tags, dateTime]);

  const IndividualComment = ({ name, comment }) => {
    return (
      <div className="flex w-full flex-row items-start justify-start gap-2">
        <FaUserCircle size={35} />
        <div className="flex w-full flex-col items-start justify-start gap-1">
          <div className="text-sm text-gray-300">{name}</div>
          <div className="text-pretty text-xs text-gray-200">
            <p>{comment}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1">
      <div className="flex w-full flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <div className='flex flex-row items-center justify-center gap-2'>
            {
              profilePicture !== '' ? <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[20px] w-[20px] rounded-full object-cover"
                  src={profilePicture}
                  alt={name}
                />
              </div> :
                <FaUserCircle size={20} color={'#91BDF6'} />
            }
            <Name>{name}</Name>
          </div>
          <div
            style={{ backgroundColor: color }}
            className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]"
          >
            <TagText>{tag}</TagText>
          </div>
        </div>

        <Date>{date}</Date>
        <div className="timeline-tags my-2 flex flex-row space-x-3 text-xs">
          {/* <InfoTile>Horizontal Pull</InfoTile> */}
          <InfoTile>{time}</InfoTile>
          {/* <InfoTile>700Kcal</InfoTile> */}
        </div>
        {achievements?.length > 0 && (
          <section className=" flex flex-col justify-center rounded-lg p-2">
            <h4 className="mb-4 justify-center text-xs uppercase tracking-[3px] text-lightGray">
              achievements unlocked
            </h4>

            <div className="my-2 flex h-fit w-full items-center justify-between">
              <span>
                <HiOutlineChevronLeft
                  size={25}
                  onClick={() => {
                    try {
                      setAchievementsIndex(
                        (prev) =>
                          (prev - 1 + achievements?.length) %
                          achievements?.length,
                      );
                    } catch (err) {
                      setAchievementsIndex(0);
                    }
                  }}
                />
              </span>
              {/* <div className="flex h-full w-full items-center justify-center px-2 rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] ">
                <p className=" text-[10px]">
                  {achievements[achievementsIndex]?.description}
                </p>
                <div className="h-[7rem] w-[7rem] flex flex-row justify-center items-center">
                  <img
                    className="h-[7rem] w-[7rem]"
                    src="/assets/badge.svg"
                    alt="badge"
                  />
                </div>
              </div> */}

              <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs tracking-wider">
                <p>{achievements[achievementsIndex]?.description}</p>
              </div>

              <span>
                <HiOutlineChevronRight
                  size={25}
                  onClick={() => {
                    setAchievementsIndex(
                      (prev) => (prev + 1) % achievements?.length,
                    );
                  }}
                />
              </span>
            </div>
          </section>
        )}
        {coachNotes?.length > 0 && (
          <section className=" flex flex-col items-start justify-center rounded-lg p-2 ">
            <h4 className="justify-center text-[10px] uppercase tracking-[3px] text-lightGray">
              coach notes
            </h4>

            <div className="flex h-20 w-full items-center justify-between">
              <span>
                <HiOutlineChevronLeft
                  size={25}
                  onClick={() => {
                    try {
                      setCoachNoteIndex(
                        (prev) =>
                          (prev - 1 + coachNotes?.length) % coachNotes?.length,
                      );
                    } catch (err) {
                      setCoachNoteIndex(0);
                    }
                  }}
                />
              </span>
              <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs tracking-wider">
                <p>{coachNotes[coachNoteIndex]?.description}</p>
              </div>

              <span>
                <HiOutlineChevronRight
                  size={25}
                  onClick={() => {
                    try {
                      setCoachNoteIndex(
                        (prev) => (prev + 1) % coachNotes?.length,
                      );
                    } catch (err) {
                      setCoachNoteIndex(0);
                    }
                  }}
                />
              </span>
            </div>
          </section>
        )}
        {sectionPerformance?.map((workout, index) => {
          if (workout?.name === 'Assessment') {
            return (
              <AssesmentTile
                currScore={currScore}
                prevScore={prevScore}
                assessmentFeedback={workout?.displayInfo}
                key={index}
              />
            );
          }
        })}
        {!collapsed && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {sectionPerformance?.map((workout, index) => {
              if (index !== 0 && workout?.name !== 'Assessment') {
                return (
                  <WorkoutTile
                    workoutName={workout?.name}
                    rounds={workout?.round}
                    feedback={workout?.displayInfo}
                    workoutCompleted={workout?.completed}
                    key={Math.random() * 1000}
                  />
                );
              }
            })}
          </div>
        )}
        {collapsed ? (
          <button
            className="flex select-none flex-row items-center justify-end gap-1 pt-5 text-green"
            onClick={() => {
              setCollapsed(false);
            }}
          >
            <p className="text-sm">show more</p>
            <IoIosArrowDropdownCircle size={20} />
          </button>
        ) : (
          <button
            className="flex select-none flex-row items-center justify-end gap-1 pt-2 text-green"
            onClick={() => {
              setCollapsed(true);
            }}
          >
            <p className="text-sm">show less</p>
            <IoIosArrowDropupCircle size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TimelineTile;
