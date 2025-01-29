import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { TbSwimming } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { Error, Loader } from '../../components';
import FeatureUpdatePopup from '../../components/FeatureUpdatePopup';
import InstallApp from '../../components/InstallPWA';
import LazyImage from '../../components/LazyLoadImage';
import QuestionnaireTile from '../../components/QuestionnaireTile';
import WeeklyCheckinTile from '../../components/WeeklyCheckinTile';
import { useAuth } from '../../contexts/AuthContext';
import { useUserContext } from '../../contexts/UserContext';
import { capitalizeFirstLetter } from '../../utils';
import { axiosClient } from '../Profile/apiProfileClient';
import MonthlyWrapped from '../Profile/MonthlyWrapped';
import AdditionalActivity from './AdditionalActivity';
import DuePaymentIndicator from './DuePaymentIndicator';
import StepTrackerTwo from './StepTrackerTwo';
import {
  getCurrentHourInTimezone,
  getDeviceTimezone,
  getGreeting,
} from './utils';
import WeeklySchedule from './WeeklySchedule';
import WeeklyWorkoutReport from './WeeklyWorkoutReport';
import WorkoutLibrary from './WorkoutLibrary';

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
  const [week, setWeek] = useState('');
  const userProfilePicture = JSON.parse(
    localStorage?.getItem('profilePicture'),
  );
  const caiptalInitial = capitalizeFirstLetter(fullName);
  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [weeklyResponse, setWeeklyResponse] = useState(undefined);

  useEffect(() => {
    async function getStatsData() {
      try {
        if (homeStats?.isWeeklyReviewSubmitted === true) {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/stats?memberCode=${code}`,
          );
          if (res.data) {
            setWeek(res.data.data[0].week);
          }
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        if (homeStats?.isWeeklyReviewSubmitted === true) {
          setStatsLoading(false);
        }
      }
    }
    getStatsData();
  }, [homeStats]);

  useEffect(() => {
    async function getWeeklyReviewData() {
      try {
        setLoading(true);
        if (week) {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review?memberCode=${code}&week=${week}`,
          );
          if (res.data) {
            setWeeklyResponse(res.data.data);
          }
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getWeeklyReviewData();
  }, [week]);

  async function getMemberData(code) {
    try {
      const res = await axiosClient.get(`/profile`, {
        params: { code: code },
      });
      if (res.data.profilePicture) {
        localStorage.setItem(
          'profilePicture',
          JSON.stringify(res.data.profilePicture),
        );
      } else {
        localStorage.setItem('profilePicture', JSON.stringify(''));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  const getISTDay = () => {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', weekday: 'long' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(now); // Returns day name like 'Sunday', 'Monday', etc.
  };

  const currentDay = getISTDay();

  // Check if today is Sunday, Monday, or Tuesday
  const showComponent = ['Sunday', 'Monday', 'Tuesday'].includes(currentDay);

  useEffect(() => {
    if (!userProfilePicture && userProfilePicture !== '') {
      getMemberData(code);
    }
    const timezone = getDeviceTimezone();
    const currentHour = getCurrentHourInTimezone(timezone);
    const greetingMessage = getGreeting(currentHour);
    setGreeting(greetingMessage);
  }, []);

  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;

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
            localStorage.setItem('isLegend', res.data.isLegend);
            setLoader(false);
            setError(null);
            if (res?.data?.isWeeklyReviewSubmitted) {
              setStatsLoading(true);
            }
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
      {(loading || loader || statsLoading) && <Loader />}
      {error && <Error>{error}</Error>}
      {showActivity === true && (
        <AdditionalActivity
          setShowActivity={setShowActivity}
          date={new Date()}
        />
      )}
      {showLibrary === true && (
        <WorkoutLibrary homeStats={homeStats} setShowLibrary={setShowLibrary} />
      )}

      {!(loading || loader || statsLoading) &&
        showLibrary === false &&
        showActivity === false &&
        homeStats && (
          <div>
            <img
              loading="lazy"
              alt="img"
              src="assets/Movement-Frame.png"
              className="absolute left-0 top-0 -z-10 h-full w-full saturate-150"
            />
            <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4  pb-[78px]">
              <section className="mt-[40px] flex w-full items-center justify-between pb-0 pt-5">
                <div className="w-full">
                  <div className="flex w-full  justify-between gap-2">
                    <div className="flex-1">
                      <h3 className=" font-sfpro text-[14px] text-offwhite">
                        {greeting} {firstName}
                      </h3>
                      <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
                        Movement
                      </h2>

                      <div className="flex items-center">
                        {parseInt(homeStats.streak) > 0 ? (
                          <div className="flex items-center ">
                            <div className="perfect-week mt-2 flex w-fit items-center rounded">
                              <img src="assets/star.svg" alt="" />
                              <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-[#4a3e1d]">
                                Perfect Week x{homeStats.streak}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="mr-[20px] font-sfpro text-[14px] text-white-opacity-50">
                            Everyday is an opportunity to do some main character
                            shit.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex w-fit flex-col  justify-end gap-[9px]">
                      <div className=" flex justify-end ">
                        {' '}
                        <div className="h-[53px] min-w-[53px]">
                          {' '}
                          {userProfilePicture ? (
                            <img
                              loading="lazy"
                              src={userProfilePicture}
                              alt="img"
                              className="h-[53px] w-[53px] rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-[53px] w-[53px] items-center justify-center rounded-xl bg-black-opacity-45 text-3xl text-white">
                              {caiptalInitial}
                            </div>
                          )}
                        </div>
                      </div>
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

              {homeStats?.isPaymentDue && (
                <section>
                  <DuePaymentIndicator />
                </section>
              )}
              {!homeStats?.onboardingCompleted && <QuestionnaireTile />}

              {showComponent && (
                <WeeklyCheckinTile
                  isWeeklyReviewSubmitted={weeklyResponse?.report}
                />
              )}

              <section>
                <WeeklyWorkoutReport
                  consistencyTrend={homeStats?.consistencyTrend}
                  suggestedWorkoutPerWeek={homeStats?.frequency}
                  lastEightWeeksWorkout={homeStats?.lastEightWeeksWorkout}
                />
              </section>

              <StepTrackerTwo date={new Date()} />

              {currentDate < 5 && (
                <section className="flex w-full flex-row items-center justify-center gap-3 ">
                  <MonthlyWrapped />
                </section>
              )}
              {homeStats.workoutPlan && (
                <section>
                  <div className="rounded-xl bg-black-opacity-45 pl-[15px] pr-[12px] pt-2">
                    <h5 className="font-sfpro text-[14px] text-offwhite">
                      Weekly Plan
                    </h5>
                    {/* <ProgressBar progress={10} /> */}
                    <div className="flex">
                      {/* <div className="flex w-[45%] flex-col justify-end pb-4">
                      <div className="font-futura text-[51px] leading-[60px] text-blue">
                        72%
                      </div>
                      <div className="text-[10px] text-white-opacity-50">
                        of the week complete
                      </div>
                    </div> */}
                      {homeStats.workoutPlan.workout ? (
                        <WeeklySchedule stats={homeStats.workoutPlan} />
                      ) : (
                        <div className="leading-2 mt-2 text-xs text-offwhite">
                          {homeStats.workoutPlan.description}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              <div>
                <div className=" text-[20px] leading-[32px] text-offwhite">
                  Workout Library
                </div>

                <InstallApp />
                <section className="relative -left-4 z-10 mt-1 flex w-screen gap-2 overflow-x-scroll px-4">
                  <div className="flex items-center">
                    <Link
                      to="/workout/today"
                      className="relative flex h-[103px] w-[247px]  items-center justify-between overflow-hidden rounded-xl   py-2 pl-4 pr-7 "
                    >
                      <LazyImage
                        hash={
                          '|28NteQ-4TNH_M4TH?b^%#$*8xt7kqxa%LtRx]bb.89FRP.7Ndx[RjV@R5yXIBV@V[RjS4xus:n4RPt7tR%LIAM|R+ozxuxtofaKWBbcWBR+RkX8jFj[n$bbtRV@jFjZRkH?tRbcozjEsmo2jFRPV[WXaKaexuaxtQt7of'
                        }
                        altText={'Image not found'}
                        src={'assets/movement-workout.png'}
                        ImageWrapperClassName={
                          'absolute left-0 top-0 -z-10   h-[272px] w-screen object-cover'
                        }
                      />
                      <div className="flex h-full flex-col justify-center">
                        <h2 className="font-sfpro text-xl leading-8 text-offwhite">
                          Workout
                        </h2>

                        <div className=" flex gap-3">
                          <h2
                            style={{
                              border: '0.5px solid rgba(221,249,136,0.4)',
                            }}
                            className="flex  rounded-md border border-floYellow bg-dark-green-opacity-66 px-1   font-sfpro text-[12px] text-floYellow"
                          >
                            <img
                              src="/assets/yellowTimer.svg"
                              className="mr-[2px]"
                              alt="img"
                            />
                            {homeStats.hyperWorkoutParams.duration} mins
                          </h2>
                          <h2
                            style={{
                              border: '0.5px solid rgba(221,249,136,0.4)',
                            }}
                            className=" flex rounded-md border border-floYellow bg-dark-green-opacity-66 px-1  font-sfpro text-[12px] text-floYellow"
                          >
                            <img
                              src="/assets/yellow-power.svg"
                              alt="img"
                              className="mr-[2px]"
                            />
                            {homeStats.hyperWorkoutParams.calories} cal
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className=" flex items-center">
                    <Link
                      to="/workout/flex"
                      className="relative flex h-[103px] w-[247px] items-center justify-between overflow-hidden rounded-xl  bg-cover py-2 pl-4 pr-7 "
                    >
                      <LazyImage
                        hash={
                          '|ABDTh_3WBRPxus:Rkoeof-oR*t7ofWBofazjZfk~q%MbHRjbHt7WBWVkCx]ofRjofofV@ofayayjERjoffkWBofWBj[j@o#j[WBkCjsWBj[jZa|x[oKWVj@ofWBofayazRij[a|j[WBofWBj[a|ozWVayoLazWBj]j[WB'
                        }
                        altText={'Image not found'}
                        src={'assets/movement-Flex.png'}
                        ImageWrapperClassName={
                          'absolute left-0 top-0 -z-10   h-[272px] w-screen object-cover'
                        }
                      />
                      <div className="flex h-full flex-col justify-center">
                        <div className="flex gap-3">
                          <h2 className="font-sfpro text-xl leading-8 text-offwhite">
                            Flex
                          </h2>
                        </div>

                        <div className=" flex gap-3">
                          <h2
                            style={{
                              border: '0.5px solid rgba(221,249,136,0.4)',
                            }}
                            className="flex  rounded-md border border-floYellow bg-dark-green-opacity-66 px-1   font-sfpro text-[12px] text-floYellow"
                          >
                            <img
                              src="/assets/yellowTimer.svg"
                              alt="img"
                              className="mr-[2px]"
                            />
                            {homeStats.flexWorkoutParams.duration} mins
                          </h2>
                          <h2
                            style={{
                              border: '0.5px solid rgba(221,249,136,0.4)',
                            }}
                            className=" flex rounded-md border border-floYellow bg-dark-green-opacity-66 px-1  font-sfpro text-[12px] text-floYellow"
                          >
                            <img
                              src="/assets/yellow-power.svg"
                              alt="img"
                              className="mr-[2px]"
                            />
                            {homeStats.flexWorkoutParams.calories} cal
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className=" flex items-center">
                    <Link
                      to="/aerobic"
                      className="relative flex h-[103px] w-[247px] items-center justify-between overflow-hidden rounded-xl bg-aerobic-img bg-right    py-2 pl-4 pr-7 "
                    >
                      <div className="flex h-full flex-col justify-center">
                        <div className="flex gap-3">
                          <h2 className="font-sfpro text-xl leading-8 text-offwhite ">
                            Aerobic
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className=" flex items-center">
                    <Link
                      to="/warm-up"
                      className="relative flex h-[103px] w-[247px] items-center justify-between overflow-hidden rounded-xl  bg-evening-zone  bg-cover py-2 pl-4 pr-7 "
                    >
                      <div className="flex h-full flex-col justify-center">
                        <div className="flex gap-3">
                          <h2 className="font-sfpro text-xl leading-8 text-offwhite">
                            Dynamic Stretch
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>
                </section>
              </div>

              <div
                onClick={() => setShowLibrary(true)}
                className=" flex h-[36px] w-full items-center  justify-center gap-2 rounded-lg bg-black-opacity-45 px-2 py-1 text-center font-sfpro font-normal text-blue underline-offset-0"
              >
                Explore All Workouts <FaArrowRight />
              </div>

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
                    alt="img"
                    className="h-[30px] w-[30px]"
                  />
                </div>
              </div>

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
