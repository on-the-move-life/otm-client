import React, { useMemo, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import AssesmentTile from './AssesmentTile';
import WorkoutTile from './WorkoutTile'
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle, IoIosArrowDown, IoMdArrowRoundUp } from "react-icons/io";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiTwotoneLike, AiOutlineLike } from "react-icons/ai";
import IndividualComment from './IndividualComment';

const Name = styled.div`
color: var(--New-purple, #A680DD);
text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 32px; /* 160% */
text-transform: capitalize;
`
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
`

const Date = styled.div`
color: var(--New-White, var(--White, #FFF));
text-shadow: 0px 2.26px 2.26px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 15.068px;
font-style: normal;
font-weight: 500;
line-height: 24.11px; /* 160% */
text-transform: capitalize;
`
const TagText = styled.p`
color: #000;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 12px;
font-style: normal;
font-weight: 590;
line-height: normal;
letter-spacing: -0.36px;
text-transform: capitalize;
`
const TimelineTile = ({ name, dateTime, kcal, workoutName, currScore, prevScore, sectionPerformance, coachNotes, achievements, postComments, postLikes }) => {
  // Testing purpose
  achievements = [
    { description: 'achievement 1' },
    { description: 'achievement 2' },
    { description: 'achievement 3' },
    { description: 'achievement 4' },
  ]
  coachNotes = [
    { description: 'Note 1' },
    { description: 'Note 2' },
    { description: 'Note 3' },
    { description: 'Note 4' },
  ]
  const tags = useMemo(() => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'], [])
  const colors = useMemo(() => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'], [])
  const [tag, setTag] = useState(tags[0]);
  const [color, setColor] = useState(colors[0]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [coachNoteIndex, setCoachNoteIndex] = useState(0);
  const [achievementsIndex, setAchievementsIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const typedCommentRef = useRef(null);
  const [comments, setComments] = useState([
    { name: 'saurabh', comment: 'this is my first comment' },
    { name: 'saurabh', comment: 'this is my second comment' },
    { name: 'saurabh', comment: 'this is my third comment' }
  ]);

  function formatDateTime(inputDateTime) {
    const [datePart, timePart, ampm] = inputDateTime.split(' ');
    const [month, day, year] = datePart.split('/');

    const formattedDate = `${addOrdinalSuffix(parseInt(day))} ${getMonthName(parseInt(month))}`;
    const formattedTime = `${timePart} ${ampm}`;

    return [formattedDate, formattedTime]
  }

  function getMonthName(month) {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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
    }
    else if (currScore >= 2 && currScore < 4) {
      setTag(tags[1]);
      setColor(colors[1]);
    }
    else if (currScore >= 4 && currScore < 6) {
      setTag(tags[2]);
      setColor(colors[2]);
    }
    else if (currScore >= 6 && currScore < 8) {
      setTag(tags[3]);
      setColor(colors[3]);
    }
    else {
      setTag(tags[4]);
      setColor(colors[4]);
    }
  }, [currScore, colors, tags, dateTime])

  const CommentsContainer = ({ comments }) => {
    return (
      <div className='w-full h-screen fixed top-0 left-0 overflow-y-scroll bg-gray-900 z-50'>
        {/* Closing Icon */}
        <div className='w-full h-fit flex flex-row items-center justify-center absolute top-0 rounded-b-xl' onClick={() => {
          setShowComment(prev => !prev)
        }}>
          <IoIosArrowDown size={30} />
        </div>

        {/* Comments */}
        <div className='w-full mt-12 flex flex-col justify-start items-start gap-3 px-4'>
          {
            postComments?.map((comment, index) => {
              return (
                <IndividualComment name={comment.name} comment={comment?.comment} replies={comment?.replies} profilePicture={comment?.profilePicture} key={Math.random() * 1000} />
              )
            })
          }
        </div>

        {/* Comment Input */}
        <div className='w-full h-fit flex flex-row items-center justify-between gap-1 fixed bottom-0 px-2 border-t-gray-600 border-t-[0.8px]'>
          <input type="text" placeholder="Add a comment" className='outline-none w-full h-[50px] px-2 bg-transparent text-gray-400' ref={typedCommentRef} />
          <button className='px-3 py-1 rounded-full bg-light-blue-600' onClick={(e) => {
            console.log(typedCommentRef.current.value)
            const comment = typedCommentRef.current.value;
            setComments(prev => [...prev, { name: 'saurabh', comment: comment }]);
            typedCommentRef.current.value = '';
          }}>
            <IoMdArrowRoundUp size={20} color={'white'} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-1'>
      {showComment && <CommentsContainer comments={comments} />}
      <div className="w-full flex flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4" >
        <div className='w-full flex flex-row items-center justify-between'>
          <Name>{name}</Name>
          <div style={{ backgroundColor: color }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
            <TagText>{tag}</TagText>
          </div>
        </div>

        <Date>{date}</Date>
        <div className="timeline-tags flex flex-row space-x-3 text-xs my-2">
          {/* <InfoTile>Horizontal Pull</InfoTile> */}
          <InfoTile>{time}</InfoTile>
          {/* <InfoTile>700Kcal</InfoTile> */}
        </div>
        {achievements?.length > 0 && (
          <section className="my-4 flex flex-col justify-center backdrop-blur-sm rounded-lg p-2">
            <h4 className="justify-center text-xs uppercase tracking-[3px] text-lightGray mb-4">
              achievements unlocked
            </h4>

            <div className="my-2 flex h-fit w-full items-center justify-between">
              <span>
                <HiOutlineChevronLeft
                  size={25}
                  onClick={() => {
                    try {
                      setAchievementsIndex(prev => (prev - 1 + achievements?.length) % achievements?.length);
                    }
                    catch (err) {
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

              <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs">
                <p>{achievements[achievementsIndex]?.description}</p>
              </div>

              <span>
                <HiOutlineChevronRight
                  size={25}
                  onClick={() => {
                    setAchievementsIndex(prev => (prev + 1) % achievements?.length);
                  }}
                />
              </span>
            </div>
          </section>
        )}
        {
          coachNotes?.length > 0 && (
            <section className=" flex flex-col items-start justify-center backdrop-blur-sm rounded-lg p-2">
              <h4 className="justify-center text-[10px] uppercase tracking-[3px] text-lightGray">
                coach notes
              </h4>

              <div className="mt-2 mb-4 flex h-20 w-full items-center justify-between">
                <span>
                  <HiOutlineChevronLeft
                    size={25}
                    onClick={() => {
                      try {
                        setCoachNoteIndex(prev => (prev - 1 + coachNotes?.length) % coachNotes?.length);
                      }
                      catch (err) {
                        setCoachNoteIndex(0);
                      }
                    }}
                  />
                </span>
                <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs">
                  <p>{coachNotes[coachNoteIndex]?.description}</p>
                </div>

                <span>
                  <HiOutlineChevronRight
                    size={25}
                    onClick={() => {
                      try {
                        setCoachNoteIndex(prev => (prev + 1) % coachNotes?.length);
                      }
                      catch (err) {
                        setCoachNoteIndex(0);
                      }
                    }}
                  />
                </span>
              </div>
            </section>
          )
        }
        {
          sectionPerformance?.map((workout, index) => {
            if (workout?.name === 'Assessment') {
              return (
                <AssesmentTile currScore={currScore} prevScore={prevScore} assessmentFeedback={workout?.displayInfo} key={index} />
              )
            }
          })
        }
        {!collapsed && <div className="mt-4 grid grid-cols-1 gap-4">
          {
            sectionPerformance?.map((workout, index) => {
              if (index !== 0 && workout?.name !== 'Assessment') {
                return (
                  <WorkoutTile workoutName={workout?.name} rounds={workout?.round} feedback={workout?.displayInfo} workoutCompleted={workout?.completed} key={Math.random() * 1000} />
                )
              }
            })
          }
        </div>}
        {collapsed ? <button className='flex flex-row justify-end items-center gap-1 pt-5 text-green select-none' onClick={() => {
          setCollapsed(false);
        }}>
          <p className='text-sm'>show more</p>
          <IoIosArrowDropdownCircle size={20} />
        </button> :
          <button className='flex flex-row justify-end items-center gap-1 pt-2 text-green select-none' onClick={() => {
            setCollapsed(true);
          }}>
            <p className='text-sm'>show less</p>
            <IoIosArrowDropupCircle size={20} />
          </button>}
      </div>
      <div className='w-full flex felx-row items-center justify-between'>
        <div className='basis-1/2 w-full flex flex-row justify-start items-center gap-2 p-2'>
          {liked ? <AiTwotoneLike size={25} color={"white"} onClick={() => {
            setLiked(prev => !prev);
          }} /> : <AiOutlineLike size={25} color={"white"} onClick={() => {
            setLiked(prev => !prev);
          }} />}
          <p>{postLikes?.length} kudos</p>
        </div>
        <div className='basis-1/2 w-full flex flex-row justify-end items-center gap-2 p-2' onClick={() => setShowComment(prev => true)}>
          <IoChatbubbleOutline size={25} color={"white"} />
          <p>{postComments?.length} </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineTile;
