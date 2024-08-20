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
import MonthlyWrapped from '../Profile/MonthlyWrapped';
import StepTracker from './StepTracker';
import { AiOutlineRight } from 'react-icons/ai';
import AdditionalActivity from './AdditionalActivity';

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

const FitnessPage = () => {
  const { setUserData } = useUserContext();
  const { logout } = useAuth();
  // const [user, getUserFromStorage] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [isWeekend, setIsWeekend] = useState(false);
  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();
  const [showActivity, setShowActivity] = useState(false);
  const currentDate = new Date().getDate();
  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;
  console.log(showActivity);
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
      {showActivity === true && (
        <AdditionalActivity setShowActivity={setShowActivity} />
      )}

      {showActivity === false && homeStats && (
        <div>
          <img
            className="absolute right-0 -top-5 -z-20 "
            src="/assets/main-frame.svg"
          />
          <img
            className="absolute right-[75px] top-8 -z-10 "
            src="/assets/movement-logo.svg"
          />
          <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4  pb-[78px]">
            <section className="mt-[40px] flex w-full items-center justify-between pb-0 pt-5">
              <div>
                <TimelineHeading>Movement</TimelineHeading>
                <div className="flex items-center">
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
                </div>
              </div>
              <div className="flex h-[66px] min-w-[148px]  items-center justify-between rounded-lg bg-mediumGray p-1">
                <span className="pl-2 text-sm w-9">Total workouts</span>
                <div
                  className={`
                  
                  ${
                    homeStats.totalWorkoutsDone > 99 &&
                    homeStats.totalWorkoutsDone < 999
                      ? 'text-4xl'
                      : 'text-5xl'
                  } flex h-full w-[61px]  items-center justify-center rounded-lg bg-blue text-center  font-anton  text-mediumGray `}
                >
                  {formatNumber(homeStats?.totalWorkoutsDone)}
                </div>
              </div>
            </section>
            {/* <div className="flex w-full gap-2 mt-2">
              <div className="flex h-[76px] grow items-center justify-between rounded-lg bg-mediumGray p-1">
                <span className="pl-4 text-sm w-9 text-floYellow">
                  Log Activity
                </span>
                <div className="flex min-h-[68px] min-w-[68px] items-center justify-center rounded-lg bg-floYellow ">
                  <img src="/assets/fitness-add.svg" />
                </div>
              </div>
            </div> */}

            {/* <h2 className="inline-block mt-2 text-2xl font-sfpro text-floYellow">
              Shred
            </h2> */}

            <section>
              {currentDate < 5 && (
                <section className="flex flex-row items-center justify-center w-full gap-3 ">
                  <MonthlyWrapped />
                </section>
              )}
            </section>
            <div
              onClick={() => setShowActivity(true)}
              className="to-blue-500 relative rounded-full bg-gradient-to-r from-[#9299de] to-[#404fe3] px-4 py-2"
            >
              Additional Activity
            </div>
            <section>
              <div className="flex items-center">
                <Link
                  to="/workout/today"
                  className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-gym-workout py-2 pl-4 pr-7 "
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex gap-3">
                      <h2 className="text-2xl font-medium ">Today's Workout</h2>
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
                </Link>
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
                      View your weekly stats and register your thoughts and
                      rating
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
            <StepTracker />
            {homeStats?.isPaymentDue && (
              <section>
                <DuePaymentIndicator />
              </section>
            )}

            <div className="text-sm text-offwhite ">
              Follow this module to workout your core
            </div>

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
                </Link>
              </div>
            </section>

            {/* <div className="pt-2 pb-5 pl-4 rounded-xl bg-mediumGray">
              <p className="text-sm text-red">Injury guide</p>
              <p className="mt-3 text-offwhite">
                Follow our RSLL protocols to deal with injuries
              </p>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default FitnessPage;
