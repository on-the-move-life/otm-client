import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error, Counter } from '../../components';
import styled, { keyframes } from 'styled-components';
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
import EvolveScreen from './EvolveScreen';
import WeeklySchedule from './WeeklySchedule';
import WorkoutTile from './WorkoutTile';
import BatteryLevel from './BatteryLevel';

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

const SlideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100px; /* Adjust as needed */
    opacity: 1;
  }
`;

const WokoutTileContainer = styled.div`
  animation: ${SlideDown} 0.5s ease-out forwards;
`;

const FitnessPage = () => {
  const [showInitialScreen, setShowInitialScreen] = useState(false);
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
  const [isDisabled, setIsDisabled] = useState(false);
  const currentDate = new Date().getDate();
  const showElite =
    homeStats && parseInt(homeStats.avgIntensity) > 100 ? true : false;
  const queryString = window.location.search;
  const [showLoader, setShowLoader] = useState(true);
  // Initialize URLSearchParams with the query string
  const queryParams = new URLSearchParams(queryString);

  // Get the value of the 'evolve' parameter
  const evolve = queryParams.get('evolve');

  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const firstName = fullName.split(' ')[0];

  useEffect(() => {
    // Use Intl.DateTimeFormat to get the full day name
    const today = new Date();
    const dayName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(today);

    setSelectedDay(dayName);
  }, []);

  useEffect(() => {
    // Set a timeout to hide the loader after 5 seconds (5000 ms)
    if (evolve) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 5000);

      // Cleanup the timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [evolve]);

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

  const currentWeekDates = getCurrentWeek();

  // function isDateInCurrentWeek(day) {
  //   const currentWeek = getCurrentWeek();
  //   // Find if the day exists in the current week
  //   const matchedDate = currentWeek.find((date) => date.getDate() === day);

  //   if (matchedDate) {
  //     return matchedDate; // Return the Date object if found
  //   }

  //   return null; // Return null if not found
  // }

  const getUserData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-movement/workout?memberCode=${code}`,
      )
      .then((res) => {
        if (Object.keys(res.data.data.weeklyWorkout).length === 0) {
          setShowInitialScreen(true);

          setHomeStats(null);
        }
        console.log('zxxczxczxc', res.data.data);

        if (Object.keys(res.data.data.weeklyWorkout).length > 0) {
          setUserData(res.data.data);
          setHomeStats(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
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
          setUserData(res.data.data);
          setHomeStats(res.data.data);

          setError(null);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setHomeStats(null);
        setShowInitialScreen(true);
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

  console.log('innininin', showInitialScreen);

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

    <div className="h-screen  pb-[78px]">
      {loader && !evolve && <Loader />}
      {showLoader && (
        <>
          {evolve && (
            <div className="relative z-50 flex h-screen w-full  items-center bg-[#161513] px-5">
              <img
                src="assets/movement-frame.svg"
                className="absolute left-0 top-0 -z-10 h-full w-full"
              />
              <div className="my-auto rounded-lg bg-black-opacity-45 pb-[16px] pt-[47px]">
                <img
                  src="./assets/movement-ai-bg.svg"
                  className="w-full pb-[27px] "
                />
                <p className="w-full text-center text-[32px] text-blue">
                  Hang tight!
                </p>
                <p className="mx-auto w-11/12 text-center text-[14px] text-white-opacity-50">
                  We're shaping your weekly fitness plan with our coach's expert
                  touch
                </p>
                <p className="mx-auto  w-11/12 text-center text-[14px] text-offwhite">
                  your personalized schedule is nearly ready!
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {!loader && !showLoader && homeStats && evolve && (
        <EvolveScreen homeStats={homeStats} getUserData={getUserData} />
      )}

      {!loader && showActivity === true && (
        <AdditionalActivity setShowActivity={setShowActivity} />
      )}
      <img
        src="assets/movement-frame.svg"
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />
      {!loader && showActivity === false && (
        <>
          {!evolve && (
            <>
              <div className=" h-full overflow-y-scroll  px-4 pt-[77px]">
                <>
                  <h3 className=" font-sfpro text-[14px] text-offwhite">
                    Good Morning {firstName}
                  </h3>
                  <div className="flex w-full items-end">
                    <div className="flex-1">
                      <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
                        Movement
                      </h2>

                      <div className="font-sfpro text-[14px] text-white-opacity-50">
                        Everyday is an opportunity to do some main character
                        shit.
                      </div>
                    </div>
                    {showInitialScreen === false && (
                      <div className="flex flex-1 justify-end">
                        <div className="flex h-[51px] max-w-[188px]  items-center justify-between rounded-xl bg-black-opacity-45 p-1">
                          <span className=" pl-2 text-sm  text-offwhite">
                            Total workouts
                          </span>
                          <div
                            className={`flex h-min w-[61px] items-center  justify-center rounded-lg text-center font-anton text-4xl  text-blue   `}
                          >
                            {homeStats &&
                              formatNumber(homeStats?.totalWorkouts)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
                {showInitialScreen === true && (
                  <div className="mt-[24px] flex flex-col items-center gap-2">
                    <div className="flex w-full flex-col items-center justify-between rounded-xl bg-black-opacity-45 px-[8px] pb-[8px]">
                      <div className="flex w-full justify-between">
                        <img
                          src="/assets/purple-arm.svg"
                          className="h-[120px] w-[120px] p-4"
                        />
                        <div className="flex w-full flex-1 flex-col justify-center">
                          <h3 className="  font-sfpro text-[20px] font-medium text-offwhite">
                            New Weekly Format!
                          </h3>
                          <p className="relative z-10 mt-2 max-w-[180px] font-sfpro  text-[14px] font-medium text-white-opacity-50">
                            Take this short quiz to create your weekly workout
                            schedule
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/fitness-plan"
                        className=" w-full rounded-lg bg-white p-2.5 text-center font-sfpro text-[14px] font-medium text-black" // Replaced p-[10px] with Tailwind equivalent
                      >
                        Let's Go
                      </Link>
                    </div>
                  </div>
                )}
                {showInitialScreen === true && (
                  <div className=" mt-3 w-full">
                    <p className=" mt-2  font-sfpro  text-[14px] font-medium text-white-opacity-50">
                      Don't worry, you can update your schedule anytime with
                      your coach
                    </p>
                  </div>
                )}

                {showInitialScreen === false && (
                  <>
                    <div className="my-4 flex justify-center">
                      {homeStats &&
                        Object.keys(homeStats.weeklyWorkout).map(
                          (item, index) => {
                            const slicedDay = item.substr(0, 3);
                            return (
                              <div
                                className="flex w-full flex-row items-center justify-between"
                                onClick={() => setSelectedDay(item)}
                              >
                                <CalendarTile
                                  color={`rgb(126,135,239)`}
                                  date={currentWeekDates[index]}
                                  day={slicedDay}
                                  isSelected={item === selectedDay}
                                />
                              </div>
                            );
                          },
                        )}
                    </div>

                    <div className="flex gap-2">
                      <WeeklySchedule homeStats={homeStats} />
                      {/* This is battery level will lead in future */}
                      {/* <BatteryLevel homeStats={homeStats} /> */}
                    </div>
                  </>
                )}

                {showInitialScreen === false && (
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
                  </>
                )}

                <div className=" flex h-fit flex-col gap-4">
                  {showInitialScreen === true && (
                    <section>
                      <div
                        className="mt-8 flex items-center"
                        style={{
                          opacity: isDisabled ? 0.5 : 1,
                          pointerEvents: isDisabled ? 'none' : 'auto',
                          cursor: isDisabled ? 'not-allowed' : 'default',
                        }}
                      >
                        <Link
                          to="/workout/today"
                          className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-morning-zone py-2 pl-4 pr-7 "
                        >
                          <div className="flex h-full flex-col justify-center">
                            <h2 className="text-xl  ">Strength Training</h2>
                          </div>
                        </Link>
                      </div>
                    </section>
                  )}
                  <StepTracker />

                  <WokoutTileContainer
                    key={selectedDay}
                    className="flex max-h-max flex-col gap-2"
                  >
                    {homeStats && showInitialScreen === false && (
                      <WorkoutTile
                        homeStats={homeStats?.weeklyWorkout[selectedDay]}
                        isDisabled={isDisabled}
                        setHomeStats={setHomeStats}
                      />
                    )}
                  </WokoutTileContainer>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FitnessPage;
