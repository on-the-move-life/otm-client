//WorkoutSummary.js
import React, { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MoveCoinsPopUp from './MoveCoinsPopUp.js';
import { Error, Loader } from '../../components';
import {
  HiHome,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

import { FaArrowUp, FaArrowDown, FaPlus, FaMinus } from 'react-icons/fa';

import { axiosClient } from './apiClient';
import { setStatus } from './WorkoutSlice';
import AchievementPage from './AchievementPage.js';
import AnimatedComponent from '../../components/AnimatedComponent.js';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { axiosflexClient } from './apiFlexClient.js';
import domtoimage from 'dom-to-image';

const today = new Date().toLocaleDateString('en-us', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const WorkoutSummary = () => {
  const [inputIds, setInputIds, getStoredInputIds] = useLocalStorage(
    'inputIds',
    [],
  );
  const navigate = useNavigate();
  const [workoutSummary, setWorkoutSummary] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [achievementsIndex, setAchievementsIndex] = useState(0);
  const [coachNotes, setCoachNotes] = useState([]);
  const [notesIndex, setNotesIndex] = useState(0);
  const [showAchievemntsPage, setShowAchievemntsPage] = useState(true);
  const { user } = useAuth();
  // const [showMoveCoinsPopup, setShowMoveCoinsPopup] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const { workout, status } = useSelector((store) => store.workoutReducer);
  const summaryRef = useRef(null);
  const captureAndShareToWhatsApp = async () => {
    if (summaryRef.current) {
      try {
        // Capture screenshot
        const dataUrl = await domtoimage.toPng(summaryRef.current);
        
        // Create share text
        const shareText = "Check out my workout summary!";
  
        // Check if it's a mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
        if (isMobile && navigator.share) {
          // Mobile sharing
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'workout-summary.png', { type: 'image/png' });
          
          await navigator.share({
            text: shareText,
            files: [file],
          });
        } else {
          // Desktop functionality
          // Download the image
          const link = document.createElement('a');
          link.download = 'workout-summary.png';
          link.href = dataUrl;
          link.click();
  
          // Open WhatsApp Web in a new tab
          const encodedText = encodeURIComponent(shareText);
          const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedText}`;
          window.open(whatsappUrl, '_blank');
        }
      } catch (error) {
        console.error('Error capturing or sharing screenshot:', error);
      }
    }
  };

  const getInputValuesFromLocalStorage = () => {
    const storedInputValues = {};
    if (inputIds !== undefined && inputIds.length > 0) {
      inputIds.forEach((id) => {
        const value = JSON.parse(localStorage.getItem(id));
        storedInputValues[id] = value;
      });
    }
    return storedInputValues;
  };

  const inputValues = getInputValuesFromLocalStorage();

  function setIndexes(newAchievementIndex, newCoachIndex) {
    if (newAchievementIndex >= 0 && newAchievementIndex < achievements.length)
      setAchievementsIndex((index) => newAchievementIndex);
    if (newCoachIndex >= 0 && newCoachIndex < notesIndex.length)
      setNotesIndex((index) => newCoachIndex);
  }

  function setData() {
    if (Object.keys(workoutSummary).length > 0) {
      setAchievements([...workoutSummary.generalAchievements]);
      setCoachNotes([...workoutSummary.coachNotes]);
      setIndexes(0, 0);
    }
  }

  function getWorkoutSummary() {
    console.log('input Values : ', inputValues);
    const payload = {
      ...inputValues,
      code: workout.memberCode,
      day: workout.day,
      batch: 'HYPER',
    };

    dispatch(setStatus('loading'));

    if (params.value === 'flex') {
      axiosflexClient
        .post('/score', payload)
        .then((res) => {
          if (res.data) {
            dispatch(setStatus('success'));
            setWorkoutSummary({
              ...res.data,
              sectionPerformance: res.data.sectionPerformance.slice(1),
            });

            setData();
          }
        })
        .catch((err) => {
          console.log(err.message, 'ERROR');
          dispatch(setStatus('error'));
          // Handle error here
        })
        .finally(() => {
          // iteratively delete all the keys from the array stored with the key 'inputIds' in local storage
          const storedInputIds = getStoredInputIds();
          if (storedInputIds !== null) {
            storedInputIds.forEach((id) => {
              window.localStorage.removeItem(id);
            });

            // then finally delete the key 'inputIds' from local storage
            window.localStorage.removeItem('inputIds');
          }
        });
    }

    if (params.value === 'today') {
      axiosClient
        .post('/score', payload)
        .then((res) => {
          if (res.data) {
            dispatch(setStatus('success'));
            setWorkoutSummary({
              ...res.data,
              sectionPerformance: res.data.sectionPerformance.slice(1),
            });

            setData();
          }
        })
        .catch((err) => {
          console.log(err.message, 'ERROR');
          dispatch(setStatus('error'));
          // Handle error here
        })
        .finally(() => {
          // iteratively delete all the keys from the array stored with the key 'inputIds' in local storage
          const storedInputIds = getStoredInputIds();
          if (storedInputIds !== null) {
            storedInputIds.forEach((id) => {
              window.localStorage.removeItem(id);
            });

            // then finally delete the key 'inputIds' from local storage
            window.localStorage.removeItem('inputIds');
          }
        });
    }
  }

  useEffect(() => {
    setData();
  }, [workoutSummary]);

  const workoutCountInfo =
    workoutSummary && workoutSummary.consistency?.workoutCountInfo;
  const countToEarnPerfectWeek =
    +workoutCountInfo?.frequency - +workoutCountInfo?.newWeeklyCount;

  const fitnessScoreUpdates =
    workoutSummary && workoutSummary.fitnessScoreUpdates;
  const scoreDifference = Number(
    (+fitnessScoreUpdates?.newScore - +fitnessScoreUpdates?.oldScore).toFixed(
      1,
    ),
  );

  console.log(countToEarnPerfectWeek);

  useEffect(() => {
    if (inputValues && workout) {
      getWorkoutSummary();
    }
  }, []);

  useEffect(() => {
    if (params.value === 'flex') {
      setShowAchievemntsPage(false);
    }
  }, [params]);

  useEffect(() => {
    status === 'error' &&
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    // code to show the MoveCoinsPopUp after 1.5 seconds of the workout summary page
    // status === 'success' && !showAchievemntsPage && setTimeout(() => {
    //   setShowMoveCoinsPopup(true);
    // }, 1500)
  }, [status, navigate, showAchievemntsPage]);

  return (
    <>
      {status === 'error' && <Error>Oops! Something went wrong...</Error>}
      {params.value !== 'flex' &&
        Object.keys(workoutSummary).length > 0 &&
        showAchievemntsPage && (
          <AchievementPage
            setShowAchievemntsPage={setShowAchievemntsPage}
            totalWorkouts={Number(workoutSummary?.consistency?.total) - 1}
            coinsEarned={workoutSummary?.moveCoins}
          />
        )}
      {status === 'loading' && <Loader />}
  
      {status === 'success' &&
        Object.keys(workoutSummary).length > 0 &&
        !showAchievemntsPage && (
          <div className="h-full w-full flex flex-col relative">
            <div className="flex-1 overflow-y-auto pb-16">
              <div ref={summaryRef} className="px-4 py-8">
                <AnimatedComponent>
                  <div className="mb-4">
                    <p className="text-xs tracking-widest text-lightGray">
                      {today}
                    </p>
                    <div className="flex items-center justify-between">
                      <h2 className="workout-gradient-text text-2xl font-bold">
                        Workout Summary
                      </h2>
                      <Link to="/home">
                        <HiHome size={40} color="#5ECC7B" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <span className=" rounded-lg border border-lightGray bg-[#1B1B1B] p-2 text-sm text-white">
                      Total Workouts{' '}
                      <span className="text-lg font-bold text-[#5ECC7B]">
                        {workoutSummary.consistency?.total}
                      </span>
                    </span>
                  </div>
  
                  {countToEarnPerfectWeek !== null &&
                    countToEarnPerfectWeek > 0 && (
                      <div className="my-4">
                        Complete{' '}
                        <span className="text-[#F5C563]">
                          {countToEarnPerfectWeek} more
                        </span>{' '}
                        workout(s) this week to earn the perfect week badge
                      </div>
                    )}
  
                  {countToEarnPerfectWeek !== null &&
                    countToEarnPerfectWeek < 0 && (
                      <p className="my-4">
                        Fitness Pro Alert! You've surpassed the{' '}
                        <span className="perfect-week inline-flex w-fit items-center rounded">
                          <img src="/assets/star.svg" alt="" />
                          <span className="mx-0.5 text-xs font-bold -tracking-[0.36px] text-[#4a3e1d]">
                            Perfect Week x{workoutSummary?.consistency?.streak}
                          </span>
                        </span>{' '}
                        goal with{' '}
                        <strong>{Math.abs(countToEarnPerfectWeek)}</strong>{' '}
                        workout(s). <br />
                        Keep crushing it🔥
                      </p>
                    )}
  
                  {countToEarnPerfectWeek !== null &&
                    countToEarnPerfectWeek === 0 && (
                      <div className="my-4">
                        <p>
                          Whoa! You just unlocked the{' '}
                          {parseInt(workoutSummary?.consistency?.streak) > 0 && (
                            <span className="perfect-week inline-flex items-center">
                              <img
                                src="/assets/star.svg"
                                alt=""
                                className="inline-block"
                              />
                              <span className="mx-0.5 text-xs font-bold -tracking-[0.36px] text-[#4a3e1d]">
                                Perfect Week x{workoutSummary?.consistency?.streak}
                              </span>
                            </span>
                          )}{' '}
                          badge by crushing {+workoutCountInfo?.frequency} workouts
                          this week. You're unstoppable 🔥
                        </p>
                      </div>
                    )}
  
                  {achievements.length > 0 && (
                    <section className="my-8 flex flex-col justify-center ">
                      <h4 className="justify-center text-xs uppercase tracking-[3px] text-lightGray">
                        achievements unlocked
                      </h4>
  
                      <div className="my-2 flex h-fit w-full items-center justify-between">
                        <span>
                          <HiOutlineChevronLeft
                            size={25}
                            onClick={() => {
                              setIndexes(achievementsIndex - 1, notesIndex);
                            }}
                          />
                        </span>
                        <div className="flex h-full w-full flex-row items-center justify-center px-2 ">
                          <div className="h-[60px] w-[60px]">
                            <img
                              className="h-[60px] w-[60px] rounded-full"
                              src="/assets/badge.svg"
                              alt="badge"
                            />
                          </div>
                          <p className="basis-3/4 text-[10px]">
                            {achievements[achievementsIndex].description}
                          </p>
                        </div>
  
                        <span>
                          <HiOutlineChevronRight
                            size={25}
                            onClick={() => {
                              setIndexes(achievementsIndex + 1, notesIndex);
                            }}
                          />
                        </span>
                      </div>
                    </section>
                  )}
  
                  {coachNotes.length > 0 && (
                    <section className="my-4 flex flex-col items-start justify-center ">
                      <h4 className="justify-center text-[10px] uppercase tracking-[3px] text-lightGray">
                        coach notes
                      </h4>
  
                      <div className="my-4 flex h-20 w-full items-center justify-between">
                        <span>
                          <HiOutlineChevronLeft
                            size={25}
                            onClick={() => {
                              setIndexes(achievementsIndex, notesIndex - 1);
                            }}
                          />
                        </span>
                        <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs">
                          <p>{coachNotes[notesIndex].description}</p>
                        </div>
  
                        <span>
                          <HiOutlineChevronRight
                            size={25}
                            onClick={() => {
                              setIndexes(achievementsIndex, notesIndex + 1);
                            }}
                          />
                        </span>
                      </div>
                    </section>
                  )}
  
                  {workoutSummary &&
                    workoutSummary.sectionPerformance?.map(
                      (section, index) =>
                        section.code === 'ASMT' && (
                          <div
                            className="my-4 flex h-24 w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs"
                            key={index}
                          >
                            <div className="flex basis-1/2 flex-col">
                              <h4 className="text-lg">Assessment</h4>
                              <p className="overflow-y-auto break-words text-xs text-lightGray">
                                {section?.displayInfo.join(', ')}
                              </p>
                            </div>
                            <div className="basis-1/2 p-2">
                              <h4 className="mb-2 justify-center text-[10px] uppercase tracking-[3px] text-lightGray">
                                fitness score
                              </h4>
                              <div className="flex justify-center">
                                <div className="rounded-lg border-2 border-lightGray p-0.5 text-xl">
                                  {workoutSummary.fitnessScoreUpdates?.newScore}
                                </div>
  
                                {scoreDifference !== null &&
                                  scoreDifference !== undefined &&
                                  Math.abs(scoreDifference) !== 0.0 && (
                                    <div className="flex flex-col justify-between px-2 text-black">
                                      <div
                                        className={`flex items-center rounded ${
                                          scoreDifference > 0.0
                                            ? 'bg-green'
                                            : 'bg-red'
                                        }  p-0.5 text-xs font-bold`}
                                      >
                                        {scoreDifference > 0.0 ? (
                                          <FaPlus />
                                        ) : (
                                          <FaMinus />
                                        )}
                                        <span className="px-1 font-bold">
                                          {Math.abs(scoreDifference)}
                                        </span>
                                        {scoreDifference > 0.0 ? (
                                          <FaArrowUp />
                                        ) : (
                                          <FaArrowDown />
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        ),
                    )}
  
                  <div className="mt-8 grid grid-cols-2 grid-rows-5 gap-4">
                    {workoutSummary &&
                      workoutSummary.sectionPerformance?.map(
                        (section, index) =>
                          section.code !== 'ASMT' && (
                            <div
                              className="flex h-28 w-full items-center justify-between overflow-y-auto rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-2"
                              key={index}
                            >
                              <div className="flex h-full w-full flex-col ">
                                <div className="mb-2">
                                  <div className="flex justify-between">
                                    <h1 className="items-center text-lg ">
                                      {section.name}
                                    </h1>
                                    {section.completed && (
                                      <img src="/assets/done.svg" alt="" />
                                    )}
                                  </div>
                                  <p className="text-[8px] uppercase tracking-[3px] text-lightGray">
                                    {section.round ? section.round : '0 rounds'}
                                  </p>
                                </div>
                                <div className="overflow-y-auto text-xs text-lightGray">
                                  <ul className="list-disc pl-3">
                                    {section?.displayInfo?.map((i, idx) => {
                                      return <li key={idx}>{i}</li>;
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ),
                      )}
                  </div>
                </AnimatedComponent>
              </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 px-3 py-2 z-10">
              <button 
                onClick={captureAndShareToWhatsApp}
                className="w-full rounded-lg bg-green px-4 py-2 text-black font-semibold"
              >
                Share with coach
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default WorkoutSummary;

