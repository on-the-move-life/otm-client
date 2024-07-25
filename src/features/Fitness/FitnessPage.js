//FitnessPage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error, Counter } from '../../components';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import FeatureUpdatePopup from '../../components/FeatureUpdatePopup';

import TotalWorkoutFitness from './TotalWorkoutFitness';
import WeeklyWorkoutReport from './WeeklyWorkoutReport';
import FitnessScore from './FitnessScore';
import DuePaymentIndicator from './DuePaymentIndicator';
import { TimelineHeading } from '../Timeline/StyledComponents';
import { AiOutlineRight } from 'react-icons/ai';
import MonthlyWrapped from '../Profile/MonthlyWrapped';

const FitnessPage = () => {
  const { setUserData } = useUserContext();
  const { logout } = useAuth();
  // const [user, getUserFromStorage] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();
  const [isWeekend, setIsWeekend] = useState(false);
  const currentDate = new Date().getDate();

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
        .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client/home`, {
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
          <section className="pt-5 pb-0">
            <div className="flex justify-between">
              <div className="flex flex-col mt-3">
                <TimelineHeading>Movement</TimelineHeading>
                {parseInt(homeStats.streak) > 0 && (
                  <div className="flex items-center ">
                    <div className="flex items-center my-2 rounded perfect-week w-fit">
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
            {currentDate < 5 && (
              <section className="flex flex-row items-center justify-center w-full gap-3 ">
                <MonthlyWrapped />
              </section>
            )}
          </section>
          <section>
            <div className="flex items-center">
              <Link
                to="/workout/today"
                className="relative flex h-[85px] grow items-center justify-between rounded-xl bg-gym-workout py-2 pl-4 pr-7 "
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="flex gap-3">
                    <h2 className="text-3xl font-medium ">Today's Workout</h2>
                    <img src="/assets/shred-logo.svg" />
                  </div>

                  <div className="flex gap-3">
                    <h2 className="rounded-md border border-white bg-gray px-2 py-[2px] font-sfpro text-[12px] text-white">
                      {homeStats.hyperWorkoutParams.theme}
                    </h2>
                    <h2 className="rounded-md  border border-white bg-gray px-2 py-[2px]  font-sfpro text-[12px] text-white">
                      {homeStats.hyperWorkoutParams.duration} mins
                    </h2>
                    <h2 className=" rounded-md border border-white bg-gray px-2 py-[2px]  font-sfpro text-[12px] text-white">
                      {' '}
                      {homeStats.hyperWorkoutParams.calories} cal
                    </h2>
                  </div>
                </div>
                {/* <h2 className="text-xl font-medium text-floYellow">Start</h2> */}
              </Link>
              {/* <div className="relative w-8 h-8 ml-2 text-3xl text-center rounded-full background-gray-gradient text-white-opacity-23">
                <div className="absolute -top-1 left-[6px]">+</div>
              </div> */}
            </div>
          </section>

          {isWeekend && (
            <Link to="/weekly-checkin" className="">
              <div className="flex-col p-4 rounded-lg bg-gradient-to-b from-gradientStart to-gradientEnd">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block text-2xl font-semibold tracking-wider purple-white-gradient">
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

          <section>
            <div className="flex items-center">
              <Link
                to="/workout/flex"
                className="relative flex h-[85px] grow items-center justify-between rounded-xl bg-gym-workout py-2 pl-4 pr-7 "
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="flex gap-3">
                    <h2 className="text-3xl font-medium ">Flex</h2>
                    <img src="/assets/flex-logo.svg" />
                  </div>

                  <div className="flex gap-3">
                    <h2 className="rounded-md border border-white bg-gray px-2 py-[2px] font-sfpro text-[12px] text-white">
                      {homeStats.flexWorkoutParams.theme}
                    </h2>
                    <h2 className="rounded-md  border border-white bg-gray px-2 py-[2px]  font-sfpro text-[12px] text-white">
                      {homeStats.flexWorkoutParams.duration} mins
                    </h2>
                    <h2 className=" rounded-md border border-white bg-gray px-2 py-[2px]  font-sfpro text-[12px] text-white">
                      {' '}
                      {homeStats.flexWorkoutParams.calories} cal
                    </h2>
                  </div>
                </div>
                {/* <h2 className="text-xl font-medium text-floYellow">Start</h2> */}
              </Link>
              {/* <div className="relative w-8 h-8 ml-2 text-3xl text-center rounded-full background-gray-gradient text-white-opacity-23">
                <div className="absolute -top-1 left-[6px]">+</div>
              </div> */}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default FitnessPage;
