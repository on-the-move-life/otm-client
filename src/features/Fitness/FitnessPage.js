//FitnessPage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error, Counter } from '../../components';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import FeatureUpdatePopup from '../../components/FeatureUpdatePopup';

import TotalWorkoutFitness from './TotalWorkoutFitness';
import { AiOutlineRight } from 'react-icons/ai';
import WeeklyWorkoutReport from './WeeklyWorkoutReport';
import FitnessScore from './FitnessScore';
import DuePaymentIndicator from './DuePaymentIndicator';
import { TimelineHeading } from '../Timeline/StyledComponents';

const FitnessPage = () => {
  const { setUserData } = useUserContext();
  const { logout } = useAuth();
  // const [user, getUserFromStorage] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();
  const [isWeekend, setIsWeekend] = useState(false);

  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');

    getUserFromStorage();

    if (user === null) navigate('/');

    function getUserData() {
      setLoader(true);
      axios
        .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`, {
          params: {
            email: user.email,
            day: today,
          },
        })
        .then((res) => {
          if (res.data) {
            setUserData(res.data);
            setHomeStats(res.data);
            setLoader(false);
            setError(null);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setHomeStats(null);
        });
    }

    if (user && user.email) {
      getUserData();
    } else {
      setError('Please login first');
    }

    const checkIfWeekend = () => {
      const presentday = new Date().getDay();
      setIsWeekend(presentday === 0 || presentday === 6); // 0 is Sunday, 6 is Saturday
    };

    checkIfWeekend();
  }, []);

  return (
    <>
      {!loader && !error && (
        <FeatureUpdatePopup backendVersion={homeStats?.lastSeenUiVersion} />
      )}
      {loader && <Loader />}
      {error && <Error>{error}</Error>}
      {homeStats && (
        <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4  pb-[78px]">
          <section className="pb-0 pt-5">
            <div className="flex justify-between">
              <div className="mt-3 flex flex-col">
                <TimelineHeading>Movement</TimelineHeading>
                {parseInt(homeStats.streak) > 0 && (
                  <div className="flex items-center ">
                    <div className="perfect-week my-2 flex w-fit items-center rounded">
                      <img src="assets/star.svg" alt="" />
                      <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-[#4a3e1d]">
                        Perfect Week x{homeStats.streak}
                      </span>
                    </div>
                  </div>
                )}

                {/* <h2 className="mt-3 inline-block w-40 bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6]  bg-clip-text text-lg font-semibold text-transparent">
                  Today's Workout
                </h2> */}
              </div>
              {homeStats !== null && homeStats?.totalWorkoutsDone > 0 && (
                <TotalWorkoutFitness apiData={homeStats?.totalWorkoutsDone} />
              )}
            </div>
          </section>
          <section>
            <div className="flex items-center">
              <Link
                to="/workout/today"
                className="relative h-[102px] grow rounded-2xl bg-gym-workout"
              >
                <div className="absolute bottom-1 left-4">
                  <h2 className="gradient-text text-2xl font-semibold">
                    Today's Workout
                  </h2>
                  <div className="flex gap-3">
                    <h2 className="rounded-md border border-lightGray px-1 text-sm text-lightGray">
                      Theme
                    </h2>
                    <h2 className="rounded-md border border-lightGray px-1 text-sm text-lightGray">
                      60 mins
                    </h2>
                    <h2 className="rounded-md border border-lightGray px-1 text-sm text-lightGray">
                      {' '}
                      Knee Rehab
                    </h2>
                  </div>
                </div>
              </Link>
              <div className="background-gray-gradient relative ml-2 h-8 w-8 rounded-full text-center text-3xl text-white-opacity-23">
                <div className="absolute -top-1 left-[6px]">+</div>
              </div>
            </div>
          </section>{' '}
          */}
          {isWeekend && (
            <Link to="/weekly-checkin" className="">
              <div className="flex-col rounded-lg bg-gradient-to-b from-gradientStart to-gradientEnd p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="purple-white-gradient inline-block text-2xl font-semibold tracking-wider">
                    Weekly Check-In
                  </span>
                  <span className="font-semibold">
                    <AiOutlineRight size={26} className="text-white " />
                  </span>
                </div>
                <div className="flex justify-center">
                  <p className="max-w-[100%] text-left text-[12px] font-semibold text-white">
                    View your weekly stats and register your thoughts and rating
                  </p>
                </div>
              </div>
            </Link>
          )}
          <section>
            <WeeklyWorkoutReport
              consistencyTrend={homeStats?.consistencyTrend}
              suggestedWorkoutPerWeek={homeStats?.frequency}
              lastEightWeeksWorkout={homeStats?.lastEightWeeksWorkout}
            />
          </section>
          <section>
            <FitnessScore
              score={homeStats?.score}
              percentile={homeStats?.fitnessPercentileScore}
            />
          </section>
          {homeStats?.isPaymentDue && (
            <section>
              <DuePaymentIndicator />
            </section>
          )}
          <Link to="/workout" className="main-cta">
            <span className="inline-block bg-gradient-to-r from-[#9BF2C0] to-[#91BDF6] bg-clip-text text-transparent">
              Today's Workout
            </span>
            <span>
              <AiOutlineRight size={22} />
            </span>
          </Link>
          <section>
            <div className="flex items-center">
              <Link
                to="/workout/flex"
                className="relative h-[102px] grow rounded-2xl bg-gym-workout"
              >
                <div className="absolute bottom-1 left-4">
                  <h2 className="gradient-text text-2xl font-semibold">
                    Flex Workout
                  </h2>
                  <div className="flex gap-3">
                    <h2 className="border-wh rounded-md border px-1 text-sm text-lightGray">
                      Theme
                    </h2>
                    <h2 className="rounded-md border border-lightGray px-1 text-sm text-lightGray">
                      60 mins
                    </h2>
                    <h2 className="rounded-md border border-lightGray px-1 text-sm text-lightGray">
                      {' '}
                      Knee Rehab
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default FitnessPage;
