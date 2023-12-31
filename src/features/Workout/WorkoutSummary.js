import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Error, Loader } from '../../components';
import { FaStar } from 'react-icons/fa';
import {
  HiHome,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

import { FaArrowUp, FaArrowDown, FaPlus, FaMinus } from 'react-icons/fa';

import { axiosClient } from './apiClient';
import { setStatus } from './WorkoutSlice';

const today = new Date().toLocaleDateString('en-us', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const WorkoutSummary = () => {
  const [workoutSummary, setWorkoutSummary] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [achievementsIndex, setAchievementsIndex] = useState(0);
  const [coachNotes, setCoachNotes] = useState([]);
  const [notesIndex, setNotesIndex] = useState(0);

  // const [section, setSection] = useState(sectionList[index]);

  const dispatch = useDispatch();

  const { inputValues, workout, status } = useSelector(
    (store) => store.workoutReducer,
  );

  function setIndexes(newAchievementIndex, newCoachIndex) {
    console.log(newAchievementIndex, 'newAchievementIndex');
    console.log(newCoachIndex, 'newCoachIndex');

    if (newAchievementIndex >= 0 && newAchievementIndex < achievements.length)
      setAchievementsIndex((index) => newAchievementIndex);
    if (newCoachIndex >= 0 && newCoachIndex < notesIndex.length)
      setNotesIndex((index) => newCoachIndex);
  }

  function setData() {
    console.log('set data called');
    if (Object.keys(workoutSummary).length > 0) {
      console.log('inside if statement');

      setAchievements([...workoutSummary.generalAchievements]);
      setCoachNotes([...workoutSummary.coachNotes]);
      setIndexes(0, 0);
    }
  }

  function getWorkoutSummary() {
    const payload = {
      ...inputValues,
      code: workout.memberCode,
      day: workout.day,
      batch: 'HYPER',
    };

    dispatch(setStatus('loading'));
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
        // Handle errors as needed
      })
      .finally(() => {});
  }

  useEffect(() => {
    // This will run whenever workoutSummary changes
    setData();
  }, [workoutSummary]);

  const workoutCountInfo =
    workoutSummary && workoutSummary.consistency?.workoutCountInfo;
  const countToEarnPerfectWeek =
    +workoutCountInfo?.frequency - +workoutCountInfo?.newWeeklyCount;

  const fitnessScoreUpdates =
    workoutSummary && workoutSummary.fitnessScoreUpdates;
  const scoreDifference = (
    +fitnessScoreUpdates?.newScore - +fitnessScoreUpdates?.oldScore
  ).toFixed(1);

  useEffect(() => {
    if (inputValues && workout) {
      getWorkoutSummary();
    }
  }, []);

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error>Oops! Something Went Wrong</Error>}

      {status === 'success' && Object.keys(workoutSummary).length > 0 && (
        <div className="h-full w-full px-4 py-8 ">
          <div className="mb-4">
            <p className="text-xs tracking-widest text-lightGray">{today}</p>
            <div className="flex items-center justify-between">
              <h2 className="workout-gradient-text text-2xl font-bold">
                Workout Summary
              </h2>
              {/* <div className="mb-2 flex space-x-3 ">
              <span className="flex items-center justify-center rounded-lg border border-white bg-[#1B1B1B] p-1">
                {workoutSummary.consistency?.total}
              </span>
            </div> */}

              <Link to="/home">
                <HiHome size={40} color="#5ECC7B" />
              </Link>
            </div>
          </div>
          <div>
            <span className=" rounded-lg border border-lightGray bg-[#1B1B1B] p-2 text-sm text-white">
              Total Workouts{' '}
              <span className="text-lg text-[#5ECC7B]">
                {workoutSummary.consistency?.total}
              </span>
            </span>
          </div>

          {countToEarnPerfectWeek !== null && countToEarnPerfectWeek > 0 && (
            <p className="my-4 ">
              Complete{' '}
              <span className="text-[#F5C563]">
                {countToEarnPerfectWeek} more
              </span>{' '}
              workout(s) this week to earn the{' '}
              <div className="inline-flex w-fit items-center justify-center rounded bg-[#F5C563] px-2 py-0.5 text-xs font-bold text-black">
                <span className="pb-0.3">
                  <FaStar color="black" size={14} />{' '}
                </span>
                <span className="mx-0.5 text-xs -tracking-[0.36px]">
                  Perfect Week
                </span>
              </div>{' '}
              badge
            </p>
          )}

          {achievements.length > 0 && (
            <section className="my-8 flex flex-col justify-center ">
              <h4 className="justify-center text-xs uppercase tracking-[3px] text-lightGray">
                achievements unlocked
              </h4>

              <div className="my-2 flex h-20 w-full items-center justify-between">
                <span>
                  <HiOutlineChevronLeft
                    size={25}
                    onClick={() => {
                      setIndexes(achievementsIndex - 1, notesIndex);
                    }}
                  />
                </span>
                <div className="flex h-full w-full items-center justify-center px-2">
                  <p className="basis-2/3  text-xs">
                    {achievements[achievementsIndex].description}
                  </p>
                  <img
                    className="h-20 w-20 basis-1/3 "
                    src="/assets/achievements-dummy.svg"
                    alt=""
                  />
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
              {/* <div className="mt-2 text-lightGray">
              <span>{achievementsIndex} / </span>
              <span>{achievements.length}</span>
            </div> */}
            </section>
          )}

          {coachNotes.length > 0 && (
            <section className="my-4 flex flex-col items-start justify-center ">
              <h4 className="justify-center text-xs uppercase tracking-[3px] text-lightGray">
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
              {/* <div className="mt-2 text-lightGray">
              <span>{noteIndex} / </span>
              <span>{coachNotes.length}</span>
            </div> */}
            </section>
          )}

          {workoutSummary &&
            workoutSummary.sectionPerformance?.map(
              (section) =>
                section.code === 'ASMT' && (
                  <div className="my-4 flex h-24 w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs">
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
                          scoreDifference != 0.0 && (
                            <div className="flex flex-col justify-between px-2 text-black">
                              <div
                                className={`flex items-center rounded ${
                                  scoreDifference > 0.0 ? 'bg-green' : 'bg-red'
                                }  p-0.5 text-xs font-bold`}
                              >
                                {scoreDifference > 0.0 ? (
                                  <FaPlus />
                                ) : (
                                  <FaMinus />
                                )}
                                <span className="font-bol px-1">
                                  {scoreDifference}
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
          {/* <div className="flex mt-8  flex-col"> */}

            {workoutSummary &&
              workoutSummary.sectionPerformance?.map(
                (section) =>
                  section.code !== 'ASMT' && (
                    <div
                      className="flex h-28 w-full items-center justify-between overflow-y-auto rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-2"
                      key={section.code}
                    >
                      <div className="flex h-full w-full flex-col ">
                        <div className='mb-2'>
                          <div className="flex justify-between">
                            <h1 className=" items-center text-lg ">
                              {section.name}
                            </h1>
                            {section.completed && (
                              <img src="/assets/done.svg" alt="" />
                            )}
                          </div>
                          <p className="text-[10px] tracking-widest text-lightGray uppercase">
                            {section.round ? section.round : '0 rounds'}
                          </p>
                        </div>
                        <div className="overflow-y-auto text-xs text-lightGray">
                          <ul className="list-disc pl-3">
                            {/* {section?.displayInfo.join(', ')} */}
                            {section?.displayInfo?.map((i) => {
                              return <li>{i}</li>;
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutSummary;
