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
import { FaArrowRight } from 'react-icons/fa6';
import CalendarTile from '../Nutrition/MealPlanner/Components/CalendarTile';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import PathVisualization from './PathVisualisation';

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

const FitnessPage = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const { setUserData } = useUserContext();
  const { logout } = useAuth();
  // const [user, getUserFromStorage] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [isWeekend, setIsWeekend] = useState(false);
  const [homeStats, setHomeStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();
  const [showActivity, setShowActivity] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const currentDate = new Date().getDate();
  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;

  const navigate = useNavigate();
  const queryString = window.location.search;

  // Initialize URLSearchParams with the query string
  const queryParams = new URLSearchParams(queryString);

  // Get the value of the 'evolve' parameter
  const evolve = queryParams.get('evolve');

  const data = [
    { name: 'Page A', uv: 1000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 1250, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 1450, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 1500, pv: 1908, amt: 200 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  ];

  const workoutStatus = () => {
    const num = 1;
    const total = 5;
    if (num === 0) {
      return 'not completed';
    }
  };

  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const firstName = fullName.split(' ')[0];

  const smallArr = [1, 2, 3, 4];

  useEffect(() => {
    const today = new Date();

    // Use Intl.DateTimeFormat to get the full day name
    const dayName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(today);

    setSelectedDay(dayName);
  }, []);

  function getCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Day of the week (0-6) with 0 being Sunday

    // Calculate the date of Monday of the current week
    const firstDayOfWeek =
      today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const currentWeek = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        firstDayOfWeek + i,
      );
      // Get only the day of the month
      const dayOfMonth = date.getDate();
      currentWeek.push(dayOfMonth);
    }

    return currentWeek;
  }
  console.log(
    'aasfsdfrwesdfsdf',
    homeStats?.weeklyWorkout[selectedDay]['Morning Zone']['movements'][0],
  );

  const currentWeekDates = getCurrentWeek();

  // function isDateInCurrentWeek(day) {
  //   const currentWeek = getCurrentWeek();
  //   console.log('xxccxcvddvdvdvdvqqqwwewwwwwwwew', currentWeek);
  //   // Find if the day exists in the current week
  //   const matchedDate = currentWeek.find((date) => date.getDate() === day);

  //   if (matchedDate) {
  //     return matchedDate; // Return the Date object if found
  //   }

  //   return null; // Return null if not found
  // }

  // console.log('xcxcxc', isDateInCurrentWeek(3));

  const getUserData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-movement/workout?memberCode=${code}`,
      )
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
          setHomeStats(res.data);

          setError(null);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setHomeStats(null);
        setShowQuestion(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const postUserData = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-movement/workout`,
        {
          memberCode: code,
        },
      )
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
          setHomeStats(res.data);

          setError(null);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setHomeStats(null);
        setShowQuestion(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');

    const axiosClient = axios.create({
      //baseURL: `${process.env.REACT_APP_BACKEND_MODE === 'production' ? process.env.REACT_APP_BASE_URL : 'http://localhost:882'}/api/v1/nutrition`,
      baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-movement`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    getUserFromStorage();

    if (user && user.email) {
      console.log('xxxxxx', evolve);
      if (evolve) {
        postUserData();
      } else {
        getUserData();
      }
    } else {
      setError('Please login first');
    }

    const checkIfWeekend = () => {
      const presentday = new Date().getDay();
      setIsWeekend(presentday === 0 || presentday === 6); // 0 is Sunday, 6 is Saturday
    };
    checkIfWeekend();
  }, []);

  const chargeArray = [1, 2, 3, 4, 5, 6, 7];

  return (
    // <>
    //   {!loader && !error && (
    //     <FeatureUpdatePopup backendVersion={homeStats?.lastSeenUiVersion} />
    //   )}
    //   {loader && <Loader />}
    //   {error && <Error>{error}</Error>}
    //   {showActivity === true && (
    //     <AdditionalActivity setShowActivity={setShowActivity} />
    //   )}

    //   {showActivity === false && homeStats && (
    //     <div>
    //       <img
    //         className="absolute right-0 -top-5 -z-20 "
    //         src="/assets/main-frame.svg"
    //       />
    //       <img
    //         className="absolute right-[75px] top-8 -z-10 "
    //         src="/assets/movement-logo.svg"
    //       />
    //       <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4  pb-[78px]">
    //         <section className="mt-[40px] flex w-full items-center justify-between pb-0 pt-5">
    //           <div>
    //             <TimelineHeading>Movement</TimelineHeading>
    //             <div className="flex items-center">
    //               {parseInt(homeStats.streak) > 0 && (
    //                 <div className="flex items-center ">
    //                   <div className="flex items-center my-2 rounded perfect-week w-fit">
    //                     <img src="assets/star.svg" alt="" />
    //                     <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-[#4a3e1d]">
    //                       Perfect Week x{homeStats.streak}
    //                     </span>
    //                   </div>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //           <div className="flex h-[66px] min-w-[148px]  items-center justify-between rounded-lg bg-mediumGray p-1">
    //             <span className="pl-2 text-sm w-9">Total workouts</span>
    //             <div
    //               className={`

    //               ${
    //                 homeStats.totalWorkoutsDone > 99 &&
    //                 homeStats.totalWorkoutsDone < 999
    //                   ? 'text-4xl'
    //                   : 'text-5xl'
    //               } flex h-full w-[61px]  items-center justify-center rounded-lg bg-blue text-center  font-anton  text-mediumGray `}
    //             >
    //               {formatNumber(homeStats?.totalWorkoutsDone)}
    //             </div>
    //           </div>
    //         </section>
    //         {/* <div className="flex w-full gap-2 mt-2">
    //           <div className="flex h-[76px] grow items-center justify-between rounded-lg bg-mediumGray p-1">
    //             <span className="pl-4 text-sm w-9 text-floYellow">
    //               Log Activity
    //             </span>
    //             <div className="flex min-h-[68px] min-w-[68px] items-center justify-center rounded-lg bg-floYellow ">
    //               <img src="/assets/fitness-add.svg" />
    //             </div>
    //           </div>
    //         </div> */}

    //         {/* <h2 className="inline-block mt-2 text-2xl font-sfpro text-floYellow">
    //           Shred
    //         </h2> */}

    //         <section>
    //           {currentDate < 5 && (
    //             <section className="flex flex-row items-center justify-center w-full gap-3 ">
    //               <MonthlyWrapped />
    //             </section>
    //           )}
    //         </section>

    //         <section>
    //           <div className="flex items-center">
    //             <Link
    //               to="/workout/today"
    //               className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-gym-workout py-2 pl-4 pr-7 "
    //             >
    //               <div className="flex flex-col justify-center h-full">
    //                 <h2 className="text-xl font-medium ">Strength Training</h2>

    //                 <div className="flex gap-3 mt-2">
    //                   <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
    //                     <img
    //                       src="/assets/yellowTimer.svg"
    //                       className="mr-[2px]"
    //                     />
    //                     {homeStats.hyperWorkoutParams.duration} mins
    //                   </h2>
    //                   <h2 className=" flex rounded-md border border-floYellow bg-gray px-1  font-sfpro text-[12px] text-floYellow">
    //                     <img
    //                       src="/assets/yellow-power.svg"
    //                       className="mr-[2px]"
    //                     />
    //                     {homeStats.hyperWorkoutParams.calories} cal
    //                   </h2>
    //                 </div>
    //               </div>
    //               <img
    //                 className="rounded-xl"
    //                 style={{
    //                   boxShadow:
    //                     '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
    //                 }}
    //                 src="/assets/yellow-play.svg"
    //               />
    //             </Link>
    //           </div>
    //         </section>

    //         <div
    //           onClick={() => setShowActivity(true)}
    //           className="to-blue-500 relative flex items-center justify-between rounded-full bg-gradient-to-r from-[#9299de] to-[#404fe3] px-4 py-2"
    //         >
    //           <div className="flex gap-2">
    //             <TbSwimming className="text-xl" />
    //             Log an additional activity (BETA)
    //           </div>
    //           <FaArrowRight />
    //         </div>

    //         <StepTracker />

    //         {isWeekend && (
    //           <Link to="/weekly-checkin" className="">
    //             <div className="flex-col p-4 rounded-lg bg-gradient-to-b from-gradientStart to-gradientEnd">
    //               <div className="flex items-center justify-between mb-2">
    //                 <span className="inline-block text-2xl font-semibold tracking-wider purple-white-gradient">
    //                   Weekly Check-In
    //                 </span>
    //                 <span className="font-semibold">
    //                   <AiOutlineRight size={26} className="text-white " />
    //                 </span>
    //               </div>
    //               <div className="flex justify-center">
    //                 <p className="max-w-[100%] text-left text-[12px] font-semibold text-white">
    //                   View your weekly stats and register your thoughts and
    //                   rating
    //                 </p>
    //               </div>
    //             </div>
    //           </Link>
    //         )}

    //         <section>
    //           <WeeklyWorkoutReport
    //             consistencyTrend={homeStats?.consistencyTrend}
    //             suggestedWorkoutPerWeek={homeStats?.frequency}
    //             lastEightWeeksWorkout={homeStats?.lastEightWeeksWorkout}
    //           />
    //         </section>
    //         <section>
    //           <FitnessScore
    //             score={homeStats?.score}
    //             percentile={homeStats?.fitnessPercentileScore}
    //           />
    //         </section>

    //         {homeStats?.isPaymentDue && (
    //           <section>
    //             <DuePaymentIndicator />
    //           </section>
    //         )}

    //         <div className="text-sm text-offwhite ">
    //           Follow this module to workout your core
    //         </div>

    //         <section>
    //           <div className="flex items-center">
    //             <Link
    //               to="/workout/flex"
    //               className="relative flex h-[85px] grow items-center justify-between rounded-xl bg-gym-workout py-2 pl-4 pr-7 "
    //             >
    //               <div className="flex flex-col justify-between h-full">
    //                 <div className="flex gap-3">
    //                   <h2 className="text-3xl font-medium ">Flex</h2>
    //                   <img src="/assets/flex-logo.svg" />
    //                 </div>

    //                 <div className="flex gap-3">
    //                   <h2 className="rounded-md border border-white bg-gray px-2 py-[2px] font-sfpro text-[12px] text-white">
    //                     {homeStats.flexWorkoutParams.theme}
    //                   </h2>
    //                   <h2 className="rounded-md  border border-white bg-gray px-2 py-[2px]  font-sfpro text-[12px] text-white">
    //                     {homeStats.flexWorkoutParams.duration} mins
    //                   </h2>
    //                   <h2 className=" rounded-md border border-white bg-gray px-2 py-[2px]  font-sfpro text-[12px] text-white">
    //                     {' '}
    //                     {homeStats.flexWorkoutParams.calories} cal
    //                   </h2>
    //                 </div>
    //               </div>
    //             </Link>
    //           </div>
    //         </section>

    //         {/* <div className="pt-2 pb-5 pl-4 rounded-xl bg-mediumGray">
    //           <p className="text-sm text-red">Injury guide</p>
    //           <p className="mt-3 text-offwhite">
    //             Follow our RSLL protocols to deal with injuries
    //           </p>
    //         </div> */}
    //       </div>
    //     </div>
    //   )}
    // </>

    <div className="h-screen overflow-y-scroll pb-[78px]">
      {loader && <Loader />}
      <img
        src="assets/movement-frame.svg"
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />
      {evolve && (
        <div className=" px-[16px] ">
          <h2 className="mt-[60px] w-4/5 text-lg text-offwhite">
            Based on your answers, we’ve designed your personalised journey
          </h2>
          <div className="mt-[22px] rounded-xl bg-black-opacity-45 p-1 ">
            <div className="flex items-end gap-[10px] px-3">
              <img src="./assets/evolve.svg" />
              <h5 className="h-min rounded bg-browm-opacity-12 px-2 text-xs text-yellow">
                Level 1
              </h5>
            </div>
            <p className="mt-[10px] w-11/12 px-3 text-sm text-white-opacity-50">
              We'll focus on sustainable integration of fitness and wellbeing
              practices with minimal restrictions and effort!
            </p>
          </div>
          <LineChart width={300} height={300} data={data}>
            <XAxis hide />
            <YAxis hide />
            <Tooltip />
            <Legend />
            <Line
              type="linear"
              dataKey="uv"
              stroke="#8884d8"
              strokeDasharray="5 5"
            />
          </LineChart>

          <button
            type="submit"
            onClick={() => {
              navigate('/home');
              getUserData();
            }}
            style={{
              backgroundColor: '#F8F8F8',

              color: 'rgba(0,0,0)',
            }}
            className="relative  mb-10 mt-10  flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg leading-8  text-black backdrop-blur-md"
          >
            Get Started Your journey
          </button>
        </div>
      )}

      {!evolve && (
        <>
          {showActivity === true && (
            <AdditionalActivity setShowActivity={setShowActivity} />
          )}

          <div className="overflow-y-scroll px-4">
            <div className="mt-[77px] flex w-full items-end">
              <div className="flex-1">
                <h3 className=" font-sfpro text-[14px] text-offwhite">
                  Good Morning {firstName}
                </h3>

                <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
                  Movement
                </h2>

                <div className="font-sfpro text-[14px] text-white-opacity-50">
                  Everyday is an opportunity to do some main character shit.
                </div>
              </div>
              {showQuestion === false && (
                <div className="flex flex-1 justify-end">
                  <div className="flex h-[51px] max-w-[188px]  items-center justify-between rounded-xl bg-black-opacity-45 p-1">
                    <span className=" pl-2  text-sm">Total workouts</span>
                    <div
                      className={`flex h-min w-[61px] items-center  justify-center rounded-lg text-center font-anton text-4xl  text-blue   `}
                    >
                      {homeStats && formatNumber(homeStats?.totalWorkouts)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showQuestion === true && (
              <div className="mt-[24px] flex flex-col items-center gap-2">
                {/* <PathVisualization/> */}
                <div
                  style={{
                    background:
                      'radial-gradient(circle at top left, #97EBAD 0%, #439258 60%)',
                  }}
                  className="flex w-full flex-col items-center justify-between rounded-xl px-[8px] pb-[8px]"
                >
                  <div className="flex w-full justify-between">
                    <img
                      src="/assets/arrow-board.svg"
                      className="h-[150px] w-[150px]"
                    />
                    <div className="flex w-full flex-1 flex-col justify-center">
                      <h3 className="  font-sfpro text-[20px] font-medium text-offwhite">
                        Find Your Plan
                      </h3>
                      <p className="relative z-10 mt-2 max-w-[180px] font-sfpro  text-[14px] font-medium text-white-opacity-50">
                        Take our quick test and we will find the perfect plan
                        for you.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/fintess-qustioniore"
                    style={{ backgroundColor: 'rgba(31, 31, 31, 0.2)' }} // camelCase for backgroundColor
                    className=" w-full rounded-lg p-2.5 text-center font-sfpro text-[18px] font-medium text-offwhite" // Replaced p-[10px] with Tailwind equivalent
                  >
                    Let's Go
                  </Link>
                </div>
              </div>
            )}

            {showQuestion === false && (
              <>
                <div className="my-4 flex justify-center">
                  {homeStats &&
                    Object.keys(homeStats.weeklyWorkout).map((item, index) => {
                      const slicedDay = item.substr(0, 3);
                      console.log(homeStats);
                      return (
                        <div onClick={() => setSelectedDay(item)}>
                          <CalendarTile
                            date={currentWeekDates[index]}
                            day={slicedDay}
                            isSelected={item === selectedDay}
                          />
                        </div>
                      );
                    })}
                </div>

                <div className="flex gap-2">
                  <div className="h-fit w-full rounded-xl bg-black-opacity-45 py-2">
                    <div className="mx-3  flex justify-between">
                      <h4 className="text-sm text-offwhite">
                        Your weekly schedule
                      </h4>
                      <img src="./assets/maximize-schedule.svg" />
                    </div>
                    <div className="mt-5">
                      {homeStats &&
                        homeStats.stats.map((item, index) => (
                          <div
                            className={`flex h-[25px] justify-between   ${
                              homeStats.stats.length - 1 !== index &&
                              '   border-b  border-b-white-opacity-23  border-opacity-80'
                            }  px-2`}
                          >
                            <div className="flex items-center gap-1">
                              <h5 className="text-sm text-blue">
                                {item.total}
                              </h5>{' '}
                              <h5 className="text-[10px] text-offwhite">
                                {item.name}
                              </h5>
                            </div>
                            <div className="flex items-center">
                              {item.total === item.completed && (
                                <div className="h-[15px] rounded-[3px] bg-green-opacity-12 px-1 text-[10px] text-green">
                                  completed
                                </div>
                              )}
                              {item.completed > 0 &&
                                item.completed < item.total && (
                                  <div className="flex gap-1">
                                    <div className="h-[15px] rounded-[3px] bg-green-opacity-12 px-1 text-[10px] text-green">
                                      {item.completed} done
                                    </div>
                                    <div className="h-[15px] rounded-[3px] bg-green-opacity-12 px-1 text-[10px] text-green">
                                      {item.total - item.completed} left
                                    </div>
                                  </div>
                                )}
                              {item.completed === 0 && (
                                <div className="bg-red-opacity-12 h-[15px] rounded-[3px] px-1 text-[10px] text-red">
                                  not started
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center rounded-xl bg-black-opacity-45 px-4 py-2">
                    <div className="flex">
                      <img src="./assets/yellow-bg-power.svg" />
                      <h4 className="text-sm text-yellow ">
                        Level {homeStats?.level}
                      </h4>
                      <img src="./assets/level-question.svg" className="ml-1" />
                    </div>
                    <div className="my-2 flex flex-col items-center">
                      {chargeArray.map((item, index) => {
                        console.log(item);

                        return (
                          <div
                            style={{
                              boxShadow:
                                index >
                                  chargeArray.length - homeStats?.level - 1 &&
                                '0 2px 4px   rgba(245 ,197, 99 , 0.2), 0 -4px 6px rgba(245 ,197, 99 , 0.2), 4px 0 6px rgba(221, 249, 136, 0.2), -4px 0 6px rgba(221, 249, 136, 0.2)',
                            }}
                            className={`mb-[1px]    ${
                              index > chargeArray.length - homeStats?.level - 1
                                ? 'bg-yellow'
                                : 'bg-white-opacity-50 opacity-50'
                            }  ${
                              index === 0
                                ? 'h-[6px] w-[11px]  rounded-t-[4px] '
                                : 'h-[11px] w-[38px]  rounded '
                            }`}
                          ></div>
                        );
                      })}
                    </div>
                    <p className="text-center text-[10px] text-white-opacity-50">
                      Charge up to unlock next level
                    </p>
                  </div>
                </div>
              </>
            )}

            {showQuestion === false && (
              <>
                <div className="my-4 flex w-full items-center justify-between">
                  <h3>Today's Plan</h3>

                  <div
                    className=" flex   "
                    onClick={() => setShowActivity(true)}
                  >
                    <div className="flex h-[34px] grow items-center justify-between rounded-lg bg-black-opacity-45 p-1">
                      <span className="ml-[15px] mr-[12px]  text-sm text-floYellow">
                        Log Activity
                      </span>
                      <div className="flex  items-center justify-center rounded-lg bg-floYellow ">
                        <img
                          src="/assets/fitness-add.svg"
                          className="h-[30px] w-[30px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <StepTracker />

                  <section>
                    <div className="flex items-center">
                      <Link
                        to="/workout/flex"
                        className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-gym-workout py-2 pl-4 pr-7 "
                      >
                        <div className="flex h-full flex-col justify-center">
                          <h5 className="text-sm font-light text-white-opacity-50">
                            Evening Zone
                          </h5>
                          <h2 className="text-xl  ">
                            {' '}
                            {
                              homeStats?.weeklyWorkout[selectedDay][
                                'Evening Zone'
                              ]['movements'][0].movementName
                            }
                          </h2>

                          <div className="mt-1 flex gap-3">
                            <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                              <img
                                src="/assets/yellowTimer.svg"
                                className="mr-[2px]"
                              />
                              {
                                homeStats?.weeklyWorkout[selectedDay][
                                  'Evening Zone'
                                ]['movements'][0].time
                              }
                            </h2>
                          </div>
                        </div>
                        <img
                          className="rounded-xl"
                          style={{
                            boxShadow:
                              '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
                          }}
                          src="/assets/yellow-play.svg"
                        />
                      </Link>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center">
                      <Link
                        to="/workout/today"
                        className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-gym-workout py-2 pl-4 pr-7 "
                      >
                        <div className="flex h-full flex-col justify-center">
                          <h5 className="text-sm font-light text-white-opacity-50">
                            Morning Zone
                          </h5>
                          <h2 className="text-xl  ">
                            {' '}
                            {
                              homeStats?.weeklyWorkout[selectedDay][
                                'Morning Zone'
                              ]['movements'][0].movementName
                            }
                          </h2>

                          <div className="mt-1 flex gap-3">
                            <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                              <img
                                src="/assets/yellowTimer.svg"
                                className="mr-[2px]"
                              />
                              {
                                homeStats?.weeklyWorkout[selectedDay][
                                  'Morning Zone'
                                ]['movements'][0].time
                              }
                            </h2>
                          </div>
                        </div>
                        <img
                          className="rounded-xl"
                          style={{
                            boxShadow:
                              '0 4px 6px rgba(94, 204, 123, 0.2), 0 -4px 6px rgba(94, 204, 123, 0.2), 4px 0 6px rgba(94, 204, 123, 0.2), -4px 0 6px rgba(94, 204, 123, 0.2)',
                          }}
                          src="/assets/green-tick-big.svg"
                        />
                      </Link>
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FitnessPage;
