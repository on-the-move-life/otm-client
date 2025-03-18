//WorkoutSummary.js
import React, { useEffect, useRef, useState } from 'react';
import {
  HiHome,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Error, Loader } from '../../components';

import domtoimage from 'dom-to-image';
import mixpanel from 'mixpanel-browser';
import { FaArrowDown, FaArrowUp, FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import AnimatedComponent from '../../components/AnimatedComponent.js';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { axiosClient } from './apiClient';
import { axiosflexClient } from './apiFlexClient.js';
import { deleteLocalSotrageWorkoutIds } from './utils.js';
import { setStatus } from './WorkoutSlice';
const today = new Date().toLocaleDateString('en-us', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const WorkoutSummary = () => {
  const [inputIds] = useLocalStorage('inputIds', []);
  const navigate = useNavigate();
  const [workoutSummary, setWorkoutSummary] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [achievementsIndex, setAchievementsIndex] = useState(0);
  const [coachNotes, setCoachNotes] = useState([]);
  const [notesIndex, setNotesIndex] = useState(0);
  // const [showMoveCoinsPopup, setShowMoveCoinsPopup] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const movementId = queryParams.get('movementId');
  const date = queryParams.get('date');
  const storedLegendTag = localStorage.getItem('isLegend');
  const code = JSON.parse(localStorage.getItem('user'))['code'];

  const { workout, status } = useSelector((store) => store.workoutReducer);
  const summaryRef = useRef(null);
  const captureAndShareToWhatsApp = async () => {
    mixpanel.track('Workout Summary share button clicked');
    console.log('Workout Summary share button clicked');
    if (summaryRef.current) {
      try {
        // Capture screenshot
        const dataUrl = await domtoimage.toPng(summaryRef.current);

        // Create share text
        const shareText = `${
          params.value === 'flex' ? 'Flex Workout' : 'Workout'
        } #${
          workoutSummary?.consistency?.total
        }.  Check out my workout summary!`;

        // Check if Web Share API is supported
        if (navigator.share) {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'workout-summary.png', {
            type: 'image/png',
          });

          await navigator.share({
            text: shareText,
            files: [file],
          });
        } else {
          // Fallback for desktop browsers
          const encodedText = encodeURIComponent(shareText);
          const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedText}`;
          window.open(whatsappUrl, '_blank');
        }

        // console.log('summary share tracking initiated');
        // mixpanel.track('Workout Summary Shared', {
        //   device_type: getDeviceType(),
        // });
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

  const GradientText = styled.span`
    /* Small shadow */
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);

    /* H1 */
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-style: normal;
    font-weight: 500;
    background: var(
      --Gradient-purple,
      linear-gradient(95deg, #d6b6f0 2.94%, #7e87ef 96.92%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

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
      code: code,
      day: workout.day,
      batch: 'HYPER',
      workoutId: movementId,
      date: new Date(date),
    };

    dispatch(setStatus('loading'));
    if (!code) {
      dispatch(setStatus('error'));
    }

    if (code && params.value === 'flex') {
      axiosflexClient
        .post('/score', payload)
        .then((res) => {
          if (res.data) {
            dispatch(setStatus('success'));
            setWorkoutSummary({
              ...res.data,
              sectionPerformance: res.data.sectionPerformance.slice(1),
            });

            // Helper functions

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

          if (inputIds && inputIds !== null) {
            deleteLocalSotrageWorkoutIds();
          }
        });
    }

    if (code && params.value === 'today') {
      axiosClient
        .post('/score', payload)
        .then((res) => {
          if (res.data) {
            dispatch(setStatus('success'));
            setWorkoutSummary({
              ...res.data,
              sectionPerformance: res.data.sectionPerformance.slice(1),
            });

            const trackWorkout = () => {
              try {
                console.log('Starting workout tracking...');

                const getTimeOfDay = () => {
                  const hour = new Date().getHours();
                  if (hour < 12) return 'morning';
                  if (hour < 17) return 'afternoon';
                  return 'evening';
                };

                const getDeviceType = () => {
                  const width = window.innerWidth;
                  if (width < 768) return 'mobile';
                  if (width < 1024) return 'tablet';
                  return 'desktop';
                };
                // Verify Mixpanel is initialized
                if (!mixpanel) {
                  console.error('Mixpanel not initialized');
                  return;
                }

                // Track the event
                mixpanel.track('Workout Submitted', {
                  device_type: getDeviceType(),
                  screen_size: `${window.innerWidth}x${window.innerHeight}`,
                  completion_status: 'submitted',
                  submission_timestamp: new Date().toISOString(),
                  time_of_day: getTimeOfDay(),
                  workout_day: new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                  }),
                });

                console.log('Workout tracked successfully');
              } catch (error) {
                console.error('Error tracking workout:', error);
              }
            };

            trackWorkout();
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

          if (inputIds && inputIds !== null) {
            deleteLocalSotrageWorkoutIds();
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

  useEffect(() => {
    if (inputValues && workout) {
      getWorkoutSummary();
    }
  }, []);

  useEffect(() => {
    status === 'error' &&
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    // code to show the MoveCoinsPopUp after 1.5 seconds of the workout summary page
    // status === 'success' && !showAchievemntsPage && setTimeout(() => {
    //   setShowMoveCoinsPopup(true);
    // }, 1500)
  }, [status, navigate]);

  return (
    <>
      {status === 'error' && <Error>Oops! Something went wrong...</Error>}
      {status === 'loading' && <Loader />}

      {status === 'success' && Object.keys(workoutSummary).length > 0 && (
        <div className="relative flex h-full w-full flex-col ">
          <div className="flex-1 overflow-y-auto pb-16">
            <div ref={summaryRef} className="bg-black px-4 py-8">
              <AnimatedComponent>
                <div className="">
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

                {storedLegendTag === 'true' && (
                  <div className="flex items-center ">
                    <div className="legend-tag mb-2 flex w-fit items-center rounded">
                      <img src="/assets/medal.svg" alt="" />
                      <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-black">
                        Legend
                      </span>
                    </div>
                  </div>
                )}

                {/* TODO Do not show workout counts for Flex OR title could be changed to "Total Flex Workouts" */}
                <div className="flex flex-col items-start text-lightGray">
                  <h4 className="text-[10px] uppercase tracking-[3px]">
                    {params.value === 'flex'
                      ? 'Total Flex Workouts'
                      : 'Total Workouts'}
                  </h4>

                  <div
                    className="countdown__inner__sec w-full     text-[100px]"
                    style={{ font: '100px' }}
                  >
                    {workoutSummary?.consistency?.total}
                  </div>
                  {/* <Counter
                      currentValue={
                        Number(workoutSummary?.consistency?.total) - 1
                      }
                    /> */}
                </div>

                {/* TODO add some motivational text for Flex workouts */}
                {params.value === 'flex' && (
                  <p className="mb-4">
                    You are doing great so far. Keep crushing it🔥
                  </p>
                )}
                {/* TODO Do not show for Flex */}
                {countToEarnPerfectWeek !== null &&
                  params.value !== 'flex' &&
                  countToEarnPerfectWeek > 0 && (
                    <div className="mb-4">
                      Complete{' '}
                      <span className="text-[#F5C563]">
                        {countToEarnPerfectWeek} more
                      </span>{' '}
                      workout(s) this week to earn the perfect week badge
                    </div>
                  )}
                {/* TODO Do not show for Flex */}
                {countToEarnPerfectWeek !== null &&
                  params.value !== 'flex' &&
                  countToEarnPerfectWeek < 0 && (
                    <p className="mb-4">
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
                {/* TODO Do not show for Flex */}
                {countToEarnPerfectWeek !== null &&
                  params.value !== 'flex' &&
                  countToEarnPerfectWeek === 0 && (
                    <div className="mb-4">
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
                              Perfect Week x
                              {workoutSummary?.consistency?.streak}
                            </span>
                          </span>
                        )}{' '}
                        badge by crushing {+workoutCountInfo?.frequency}{' '}
                        workouts this week. You're unstoppable 🔥
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
                {/* TODO Do not show movecoins message */}

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

                <div className="my-8 grid grid-cols-2  gap-4">
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
                {workoutSummary?.moveCoins > 0 && params.value !== 'flex' && (
                  <div className="flex h-fit w-full flex-col items-center justify-center gap-5">
                    <div className="flex min-h-[100px] w-full flex-row items-center justify-center rounded-[20px] bg-[#121212]">
                      <div
                        className="h-full w-full rounded-[12px] border-[0.5px] border-[#383838]  bg-right  bg-no-repeat  p-3 backdrop-blur-[1px]"
                        style={{
                          backgroundImage: `url('/assets/coins_popup_bg.svg')`,
                        }}
                      >
                        <div className="text-[16px] text-[#D6B6F0]">
                          • Movecoins
                        </div>

                        <div className="text-[14px] text-lightGray">
                          You earned
                          <img
                            className="mx-1 inline-block w-4"
                            src={`${process.env.PUBLIC_URL}/assets/move-coins-logo.svg`}
                            alt="MoveCoins Logo"
                          />
                          <GradientText>
                            {workoutSummary?.moveCoins}
                          </GradientText>{' '}
                          MoveCoins! <br />
                          Head to the marketplace and{' '}
                          <GradientText>treat yourself </GradientText>
                          to something special!
                        </div>
                        {/* <p className="font-normal leading-normal break-words text-slate-500">
                  {' '}
                </p> */}
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedComponent>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-10 px-3 py-2">
            <button
              onClick={captureAndShareToWhatsApp}
              className="w-full rounded-lg bg-green px-4 py-2 font-semibold text-black"
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
