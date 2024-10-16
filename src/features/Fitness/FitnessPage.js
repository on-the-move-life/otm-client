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
import { TbSwimming } from 'react-icons/tb';
import InstallApp from '../../components/InstallPWA';
import { FaArrowRight } from 'react-icons/fa6';
import {
  getCurrentHourInTimezone,
  getCurrentWeekDates,
  getCurrentWeekFullDate,
  getDeviceTimezone,
  getGreeting,
} from './utils';
import StepTrackerTwo from './StepTrackerTwo';
import { RxCross1 } from 'react-icons/rx';
import { FaArrowLeftLong } from 'react-icons/fa6';
import LazyImage from '../../components/LazyLoadImage';

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
  const [showLibrary, setShowLibrary] = useState(false);

  const [greeting, setGreeting] = useState('');
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];

  useEffect(() => {
    const timezone = getDeviceTimezone();
    const currentHour = getCurrentHourInTimezone(timezone);
    const greetingMessage = getGreeting(currentHour);
    setGreeting(greetingMessage);
  }, []);

  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;
  console.log(showActivity);
  const navigate = useNavigate();
  const todayDate = new Date();

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
        <AdditionalActivity
          setShowActivity={setShowActivity}
          date={new Date()}
        />
      )}
      {showLibrary === true && (
        <div className="h-screen bg-black-opacity-45 px-4 pb-[90px] pt-10">
          {' '}
          <img
            loading="lazy"
            src="assets/Movement-Frame.png"
            className="absolute left-0 top-0 -z-10 h-full w-full saturate-150"
          />
          <div className="mx-[9px] mb-[26px] flex justify-between">
            <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-black-opacity-45 ">
              <FaArrowLeftLong
                onClick={() => setShowLibrary(false)}
                className=""
              />
            </div>
            <h3 className="font-sfpro text-xl text-offwhite">
              Workout Library
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            <section>
              <div className="flex items-center">
                <Link
                  to="/workout/today"
                  className="relative flex h-[105px] w-full grow items-center justify-between rounded-xl bg-morning-zone bg-cover py-2 pl-4 pr-7 "
                >
                  <div className="flex h-full flex-col justify-center">
                    <h2 className="text-3xl font-medium ">Workout</h2>

                    <div className="mt-2 flex gap-3">
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellowTimer.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.hyperWorkoutParams.duration} mins
                      </h2>
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className=" flex rounded-md border border-floYellow bg-gray px-1  font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellow-power.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.hyperWorkoutParams.calories} cal
                      </h2>
                    </div>
                  </div>
                  {/* <img
                    className="rounded-xl"
                    style={{
                      boxShadow:
                        '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
                    }}
                    src="/assets/yellow-play.svg"
                  /> */}
                </Link>
              </div>
            </section>
            <section>
              <div className="flex items-center">
                <Link
                  to="/workout/flex"
                  className="relative flex h-[105px] grow items-center justify-between rounded-xl bg-movement-flex bg-cover py-2 pl-4 pr-7 "
                >
                  <div className="flex h-full flex-col justify-center">
                    <div className="flex gap-3">
                      <h2 className="text-3xl font-medium ">Flex</h2>
                    </div>

                    <div className="mt-2 flex gap-3">
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellowTimer.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.flexWorkoutParams.duration} mins
                      </h2>
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className=" flex rounded-md border border-floYellow bg-gray px-1  font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellow-power.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.flexWorkoutParams.calories} cal
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
            <section>
              <div className="flex items-center">
                <Link
                  to="/warm-up"
                  className="relative flex h-[105px] grow items-center justify-between rounded-xl bg-evening-zone bg-cover py-2 pl-4 pr-7 "
                >
                  <div className="flex h-full flex-col justify-center">
                    <div className="flex gap-3">
                      <h2 className="text-3xl font-medium ">Dynamic Stretch</h2>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}

      {showLibrary === false && showActivity === false && homeStats && (
        <div>
          <img
            loading="lazy"
            src="assets/Movement-Frame.png"
            className="absolute left-0 top-0 -z-10 h-full w-full saturate-150"
          />
          <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4  pb-[78px]">
            <section className="mt-[40px] flex w-full items-center justify-between pb-0 pt-5">
              <div>
                <h3 className=" font-sfpro text-[14px] text-offwhite">
                  {greeting} {firstName}
                </h3>
                <div className="flex w-full items-end">
                  <div className="flex-1">
                    <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
                      Movement
                    </h2>

                    <div className="font-sfpro text-[14px] text-white-opacity-50">
                      Everyday is an opportunity to do some main character shit.
                    </div>
                  </div>

                  <div className="flex flex-1 justify-end">
                    <div className="flex h-[51px] max-w-[188px]  items-center justify-between rounded-xl bg-black-opacity-45 p-1">
                      <span className="pl-2 text-sm text-offwhite">
                        Total workouts
                      </span>
                      <div
                        className={`flex h-min w-[61px] items-center  justify-center rounded-lg text-center font-anton text-4xl  text-blue   `}
                      >
                        {homeStats &&
                          formatNumber(
                            homeStats?.totalWorkoutsDone
                              ? homeStats?.totalWorkoutsDone
                              : 0,
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div>
                <TimelineHeading>Movement</TimelineHeading>
                <div className="flex items-center">
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
                </div>
              </div> */}
              {/* <div className="flex h-[66px] min-w-[148px]  items-center justify-between rounded-lg bg-mediumGray p-1">
                <span className="w-9 pl-2 text-sm">Total workouts</span>
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
              </div> */}
            </section>

            <section>
              <WeeklyWorkoutReport
                consistencyTrend={homeStats?.consistencyTrend}
                suggestedWorkoutPerWeek={homeStats?.frequency}
                lastEightWeeksWorkout={homeStats?.lastEightWeeksWorkout}
              />
            </section>

            <section>
              {currentDate < 5 && (
                <section className="flex w-full flex-row items-center justify-center gap-3 ">
                  <MonthlyWrapped />
                </section>
              )}
            </section>

            <div className="flex items-center justify-between">
              <div>Browse workout library</div>
              <div
                onClick={() => setShowLibrary(true)}
                className="flex items-center gap-2 rounded-lg bg-blue px-2 py-1 text-black"
              >
                Explore <FaArrowRight />
              </div>
            </div>

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
              <div className="flex items-center">
                <InstallApp />
                <Link
                  to="/workout/today"
                  className="relative flex h-[95px] w-full grow items-center justify-between overflow-hidden rounded-xl   py-2 pl-4 pr-7 "
                >
                  <LazyImage
                    hash={'T18NteL~00-V4Txu?^01M{%~DjVs'}
                    altText={'Image not found'}
                    src={'assets/morning-zone.svg'}
                    ImageWrapperClassName={
                      'absolute left-0 top-0 -z-10   h-[272px] w-screen object-cover'
                    }
                  />
                  <div className="flex h-full flex-col justify-center">
                    <h2 className="text-2xl font-medium ">Workout</h2>

                    <div className="mt-2 flex gap-3">
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellowTimer.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.hyperWorkoutParams.duration} mins
                      </h2>
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className=" flex rounded-md border border-floYellow bg-gray px-1  font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellow-power.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.hyperWorkoutParams.calories} cal
                      </h2>
                    </div>
                  </div>
                  {/* <img
                    className="rounded-xl"
                    style={{
                      boxShadow:
                        '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
                    }}
                    src="/assets/yellow-play.svg"
                  /> */}
                </Link>
              </div>
            </section>

            <section>
              <div className="flex items-center">
                <Link
                  to="/workout/flex"
                  className="relative flex h-[95px] grow items-center justify-between overflow-hidden rounded-xl  bg-cover py-2 pl-4 pr-7 "
                >
                  <LazyImage
                    hash={'TABDTh_3WB-oR*t7~q%MbHx]ofRj'}
                    altText={'Image not found'}
                    src={'assets/movement-Flex.svg'}
                    ImageWrapperClassName={
                      'absolute left-0 top-0 -z-10   h-[272px] w-screen object-cover'
                    }
                  />
                  <div className="flex h-full flex-col justify-center">
                    <div className="flex gap-3">
                      <h2 className="text-3xl font-medium ">Flex</h2>
                    </div>

                    <div className="mt-2 flex gap-3">
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellowTimer.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.flexWorkoutParams.duration} mins
                      </h2>
                      <h2
                        style={{
                          border: '0.5px solid rgba(221,249,136,0.4)',
                        }}
                        className=" flex rounded-md border border-floYellow bg-gray px-1  font-sfpro text-[12px] text-floYellow"
                      >
                        <img
                          src="/assets/yellow-power.svg"
                          className="mr-[2px]"
                        />
                        {homeStats.flexWorkoutParams.calories} cal
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            <div
              onClick={() => setShowActivity(true)}
              className="to-blue-500 relative flex h-[50px] items-center justify-between rounded-xl bg-black-opacity-45 py-2 pl-4 pr-3"
            >
              <div className="flex gap-2 ">
                <TbSwimming className="mt-0.5 text-xl" />
                <span className="text-offwhite">
                  {' '}
                  Log an additional activity
                </span>
              </div>
              <div className="flex items-center justify-center rounded-lg bg-floYellow ">
                <img
                  loading="lazy"
                  src="/assets/fitness-add.svg"
                  className="h-[30px] w-[30px]"
                />
              </div>
            </div>

            <StepTrackerTwo date={new Date()} />

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
                      View your weekly stats and register your thoughts and
                      rating
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* <section>
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

            <div className="text-sm text-offwhite ">
              Follow this module to workout your core
            </div>
 */}

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
