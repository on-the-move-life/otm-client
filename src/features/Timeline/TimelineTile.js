import React, { useState, useRef } from 'react';
import AssesmentTile from './AssesmentTile';
import WorkoutTile from './WorkoutTile'
import IndividualComment from './IndividualComment';
import { Name, Date, TagText, InfoTile } from './StyledComponents'
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle, IoIosArrowDown, IoMdArrowRoundUp } from "react-icons/io";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiTwotoneLike, AiOutlineLike } from "react-icons/ai";
import { FaUserCircle } from 'react-icons/fa';
import ProfilePicture from '../Profile/ProfilePicture';
import { useFormattedDateTime } from '../../hooks/useFormattedDateTime';
import { useTagAndColor } from '../../hooks/useTagAndColor';
import { axiosClient } from './apiClient';
import { motion } from 'framer-motion';


const TimelineTile = ({ data }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [coachNoteIndex, setCoachNoteIndex] = useState(0);
  const [achievementsIndex, setAchievementsIndex] = useState(0);
  const [liked, setLiked] = useState(data?.isLiked);
  const [kudos, setKudos] = useState(data?.kudos);
  const [commentsState, setCommentsState] = useState(data?.comments);
  const [isLiking, setIsLiking] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  // refs
  const typedCommentRef = useRef(null);
  const typeOfCommentRef = useRef(null);

  // custom hooks
  const [formattedDate, formattedTime] = useFormattedDateTime(data?.time);
  const [tag, color, position, tags, colors] = useTagAndColor(data?.fitnessScoreUpdates?.newScore);

  async function handleLike(action) {
    if (isLiking) return; // If a request is in progress, ignore additional clicks
    setIsLiking(true); // Set isLiking to true when a request starts
    const event = action === 'like' ? 'kudos' : 'kudosRemoved';

    const payload = {
      postId: data?._id,
      event,
      eventBy: JSON.parse(localStorage.getItem('user'))?.email
    }

    try {
      const response = await axiosClient.post('/', payload);
      setLiked(prev => !prev);
      setKudos(prev => action === 'like' ? prev + 1 : prev - 1);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLiking(false); // Set isLiking to false when a request finishes
    }
  }

  function handleComment() {
    setIsCommenting(true);
    const comment = typedCommentRef.current.value;
    const APICall = async (payload) => {
      try {
        const response = await axiosClient.post('/', payload);
        typedCommentRef.current.value = '';
        const newComment = response.data.data;
        newComment['name'] = JSON.parse(localStorage.getItem('user'))?.name;
        setCommentsState(prev => [newComment, ...prev])
        setIsCommenting(false);
      }
      catch (err) {
        typedCommentRef.current.value = typedCommentRef.current.value + ' (failed to post)';
        typedCommentRef.current.style.color = 'red';
        setTimeout(() => {
          typedCommentRef.current.value = '';
          typedCommentRef.current.style.color = 'rgb(189,189,189)';
          setIsCommenting(false);
        }, 2000)
        console.log(err);
      }
    }
    // payload for the API call
    const payload = (comment !== "" && typeOfCommentRef.current?.entity === 'parent' && typeOfCommentRef.current?.parentCommentId === null) ? {
      postId: data?._id,
      event: 'comment',
      comment: comment,
      eventBy: JSON.parse(localStorage.getItem('user'))?.email,
      isParentComment: true,
      parentCommentId: null
    } : {
      postId: data?._id,
      event: 'comment',
      comment: comment,
      eventBy: JSON.parse(localStorage.getItem('user'))?.email,
      isParentComment: false,
      parentCommentId: typeOfCommentRef.current?.parentCommentId
    }
    // final API call
    APICall(payload);
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
          <button className='px-3 py-1 rounded-full bg-light-blue-600' disabled={isCommenting} onClick={(e) => handleComment()}>
            <IoMdArrowRoundUp size={20} color={'white'} />
          </button>
        </div>
      </div>
    )
  }
  const commentAnimations = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  }
  return (
    <div className='w-full flex flex-col justify-center items-center gap-1'>
      {showComment && <motion.div
        className='w-full h-screen fixed top-0 left-0 bg-black z-50'
        variants={commentAnimations}
        initial="hidden"
        animate={showComment ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <CommentsContainer comments={commentsState} />
      </motion.div>}
      <div className="w-full flex flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4" >
        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center justify-center gap-2 mb-2'>
            {
              data?.profilePicture !== '' ?
                <div className="flex flex-row items-center justify-center">
                  <ProfilePicture inputPic={data?.profilePicture} altText={data?.name} width={"40px"} height={"40px"} />
                </div> :
                <FaUserCircle size={40} color={'#91BDF6'} />
            }
            <Name>{data?.name}</Name>
          </div>
          <div style={{ backgroundColor: color }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
            <TagText>{tag}</TagText>
          </div>
        </div>

        <Date>{formattedDate}</Date>
        <div className="timeline-tags flex flex-row space-x-3 text-xs my-2">
          {/* <InfoTile>Horizontal Pull</InfoTile> */}
          <InfoTile>{formattedTime}</InfoTile>
          <InfoTile>Total Workouts {data?.consistency?.total}</InfoTile>
          {/* <InfoTile>700Kcal</InfoTile> */}
        </div>
        {data?.achievement?.length > 0 && (
          <section className="my-4 flex flex-col justify-center backdrop-blur-sm rounded-lg p-2">
            <h4 className="justify-center text-xs uppercase tracking-[3px] text-lightGray mb-4">
              achievements unlocked
            </h4>

            <div className="my-2 flex h-fit w-full items-center justify-between">
              {data?.achievement?.length > 1 &&
                <span>
                  <HiOutlineChevronLeft
                    size={25}
                    onClick={() => {
                      try {
                        setAchievementsIndex(prev => (prev - 1 + data?.achievement?.length) % data?.achievement?.length);
                      }
                      catch (err) {
                        setAchievementsIndex(0);
                      }
                    }}
                  />
                </span>}
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

              <div className='h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs'>
                <p className='w-full text-center tracking-widest'>{data?.achievement[achievementsIndex]?.medal} {data?.achievement[achievementsIndex]?.type} : {data?.achievement[achievementsIndex]?.weight}</p>
              </div>

              {data?.achievement?.length > 1 &&
                <span>
                  <HiOutlineChevronRight
                    size={25}
                    onClick={() => {
                      setAchievementsIndex(prev => (prev + 1) % data?.achievement?.length);
                    }}
                  />
                </span>}
            </div>
          </section>
        )}
        {
          data?.coachNotes?.length > 0 && (
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
                        setCoachNoteIndex(prev => (prev - 1 + data?.coachNotes?.length) % data?.coachNotes?.length);
                      }
                      catch (err) {
                        setCoachNoteIndex(0);
                      }
                    }}
                  />
                </span>
                <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs">
                  <p>{data?.coachNotes[coachNoteIndex]?.description}</p>
                </div>

                <span>
                  <HiOutlineChevronRight
                    size={25}
                    onClick={() => {
                      try {
                        setCoachNoteIndex(prev => (prev + 1) % data?.coachNotes?.length);
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
          data?.sectionPerformance?.map((workout, index) => {
            if (workout?.name === 'Assessment') {
              return (
                <AssesmentTile currScore={data?.fitnessScoreUpdates?.newScore} prevScore={data?.fitnessScoreUpdates?.oldScore} assessmentFeedback={workout?.displayInfo} key={index} />
              )
            }
          })
        }
        {!collapsed &&
          <motion.div
            className="mt-4 grid grid-cols-1 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {
              data?.sectionPerformance?.map((workout, index) => {
                if (index !== 0 && workout?.name !== 'Assessment') {
                  return (
                    <motion.div
                      key={Math.random() * 1000}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <WorkoutTile
                        workoutName={workout?.name}
                        rounds={workout?.round}
                        feedback={workout?.displayInfo}
                        workoutCompleted={workout?.completed}
                        key={Math.random() * 1000}
                      />
                    </motion.div>
                  )
                }
              })
            }
          </motion.div>
        }
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
