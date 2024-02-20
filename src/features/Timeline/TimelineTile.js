import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react';
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
import { FaUserCircle } from 'react-icons/fa';
import IndividualComment from './IndividualComment';
import axios from 'axios'
import { setTagAndColor } from '../Home/FitnessScore';

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
const TimelineTile = ({ _id, name, dateTime, kcal, workoutName, currScore, prevScore, sectionPerformance, coachNotes, achievements, postComments, postKudos, isLiked, profilePicture }) => {
  const tags = useMemo(() => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'], [])
  const colors = useMemo(() => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'], [])
  const [tag, setTag] = useState(tags[0]);
  const [color, setColor] = useState(colors[0]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [coachNoteIndex, setCoachNoteIndex] = useState(0);
  const [achievementsIndex, setAchievementsIndex] = useState(0);
  const [liked, setLiked] = useState(isLiked);
  const [kudos, setKudos] = useState(postKudos);
  const [commentsState, setCommentsState] = useState(postComments);
  const [isLiking, setIsLiking] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const typedCommentRef = useRef(null);
  const typeOfCommentRef = useRef(null);

  // function to get the formatted date and time - e.g. [21st Feb, 08:39 PM]
  const formatDateTime = useCallback((inputDateTime) => {
    const [datePart, timePart, ampm] = inputDateTime.split(' ');
    const [month, day, year] = datePart.split('/');

    const formattedDate = `${addOrdinalSuffix(parseInt(day))} ${getMonthName(parseInt(month))}`;
    const formattedTime = `${timePart} ${ampm}`;

    return [formattedDate, formattedTime]
  }, [])

  // fuction to get the month name if the month number is passed as an argument
  function getMonthName(month) {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month - 1];
  }

  // function to add the ordinal suffix to the day, e.g 1st, 22nd, 3rd, 4th
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

    // extracting the date and time from the formatted date time
    setDate(formattedDateTime[0]);
    setTime(formattedDateTime[1]);

    // setting the tag and color based on the current score
    const [tag, color, position] = setTagAndColor(currScore, tags, colors);
    setTag(tag);
    setColor(color);

  }, [currScore, colors, tags, dateTime, formatDateTime])

  function handleLike(action) {
    if (isLiking) return; // If a request is in progress, ignore additional clicks

    setIsLiking(true); // Set isLiking to true when a request starts

    const event = action === 'like' ? 'kudos' : 'kudosRemoved';

    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/timeline`, {
      "postId": _id,
      "event": event,
      "eventBy": JSON.parse(localStorage.getItem('user'))?.email
    })
      .then(res => {
        setLiked(prev => !prev);
        setKudos(prev => action === 'like' ? prev + 1 : prev - 1);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLiking(false); // Set isLiking to false when a request finishes
      });
  }

  function handleComment() {
    const comment = typedCommentRef.current.value;
    // If the comment is not empty and the comment is a parent comment
    if (comment !== "" && typeOfCommentRef.current?.entity === 'parent' && typeOfCommentRef.current?.parentCommentId === null) {
      // API call to post the comment
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/timeline`, {
        postId: _id,
        event: 'comment',
        comment: comment,
        eventBy: JSON.parse(localStorage.getItem('user'))?.email,
        isParentComment: true,
        parentCommentId: null
      })
        .then(res => {
          typedCommentRef.current.value = '';
          const newComment = res.data.data;
          newComment['name'] = JSON.parse(localStorage.getItem('user'))?.name;
          setCommentsState(prev => [newComment, ...prev])
        })
        .catch(err => {
          typedCommentRef.current.value = typedCommentRef.current.value + ' (failed to post)';
          typedCommentRef.current.style.color = 'red';
          setTimeout(() => {
            typedCommentRef.current.value = '';
            typedCommentRef.current.style.color = 'rgb(189,189,189)';
          }, 2000)
          console.log(err);
        })
    }
    // If the comment is not empty and the comment is a reply to a comment
    else if (comment !== "" && typeOfCommentRef.current?.entity === 'child' && typeOfCommentRef.current?.parentCommentId !== null) {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/timeline`, {
        postId: _id,
        event: 'comment',
        comment: comment,
        eventBy: JSON.parse(localStorage.getItem('user'))?.email,
        isParentComment: false,
        parentCommentId: typeOfCommentRef.current?.parentCommentId
      })
        .then(res => {
          typedCommentRef.current.value = '';
          const newComment = res.data.data;
          newComment['name'] = JSON.parse(localStorage.getItem('user'))?.name;
          setCommentsState(prev => [newComment, ...prev])
        })
        .catch(err => {
          typedCommentRef.current.value = typedCommentRef.current.value + ' (failed to post)';
          typedCommentRef.current.style.color = 'red';
          setTimeout(() => {
            typedCommentRef.current.value = '';
            typedCommentRef.current.style.color = 'rgb(189,189,189)';
          }, 2000)
          console.log(err);
        })
    }
  }

  const CommentsContainer = ({ comments }) => {
    return (
      <div className='w-full h-screen fixed top-0 left-0 bg-black z-50'>
        {/* Closing Icon */}
        <div className='w-full h-fit flex flex-row items-center justify-center absolute top-0 rounded-b-xl' onClick={() => {
          setShowComment(prev => !prev)
        }}>
          <IoIosArrowDown size={30} />
        </div>

        {/* Comments */}
        <div className='w-full h-[90%] mt-10 flex flex-col justify-start items-start gap-4 px-4 pb-7 overflow-y-scroll'>
          {
            comments && comments?.length > 0 ? comments?.map((comment, index) => {
              return (
                <IndividualComment commentId={comment?._id} name={comment?.name} eventBy={comment?.eventBy} comment={comment?.comment} isParentComment={comment?.isParentComment} parentCommentId={comment?.parentCommentId} createdAt={comment?.createdAt} allComments={commentsState} profilePicture={comment?.profilePicture} ref={{ typeOfCommentRef, typedCommentRef }} key={Math.random() * 1000} />
              )
            }) :
              <div className='w-full h-screen flex flex-col items-center justify-center text-xl text-green'>
                No comments yet
              </div>
          }
        </div>

        {/* Comment Input */}
        <div className='w-full h-fit flex flex-row items-center justify-between gap-1 fixed bottom-0 px-2 border-t-gray-600 border-t-[0.8px] bg-black z-50'>
          <input type="text" placeholder="Add a comment" className='outline-none w-full h-[50px] px-2 bg-transparent text-gray-400' ref={typedCommentRef} onClick={() => typeOfCommentRef.current = { entity: 'parent', parentCommentId: null }} />
          <button className='px-3 py-1 rounded-full bg-light-blue-600' onClick={(e) => handleComment()}>
            <IoMdArrowRoundUp size={20} color={'white'} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-1'>
      {showComment && <CommentsContainer comments={commentsState} />}
      <div className="w-full flex flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4" >
        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center justify-center gap-2 mb-2'>
            {
              profilePicture !== '' ? <div className="flex flex-row items-center justify-center">
                <img
                  className="h-[40px] w-[40px] rounded-full object-cover"
                  src={profilePicture}
                  alt={name}
                />
              </div> :
                <FaUserCircle size={40} color={'#91BDF6'} />
            }
            <Name>{name}</Name>
          </div>
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
        {collapsed ? <div className='flex flex-row justify-end items-center gap-1 pt-5 text-green select-none' onClick={() => {
          setCollapsed(false);
        }}>
          <p className='text-sm'>show more</p>
          <IoIosArrowDropdownCircle size={20} />
        </div> :
          <div className='flex flex-row justify-end items-center gap-1 pt-2 text-green select-none' onClick={() => {
            setCollapsed(true);
          }}>
            <p className='text-sm'>show less</p>
            <IoIosArrowDropupCircle size={20} />
          </div>}
      </div>
      <div className='w-full flex felx-row items-center justify-between'>
        <div className='basis-1/2 w-full flex flex-row justify-start items-center gap-2 p-2'>
          {liked ? <AiTwotoneLike size={25} color={"white"} onClick={() => handleLike('unlike')} /> : <AiOutlineLike size={25} color={"white"} onClick={() => handleLike('like')} />}
          <p>{kudos} kudos</p>
        </div>
        <div className='basis-1/2 w-full flex flex-row justify-end items-center gap-2 p-2' onClick={() => setShowComment(prev => true)}>
          <IoChatbubbleOutline size={25} color={"white"} />
          <p>{(commentsState?.filter(comment => comment?.isParentComment)?.length)} </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineTile;
