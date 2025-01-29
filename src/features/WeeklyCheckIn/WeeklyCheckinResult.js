import domtoimage from 'dom-to-image';
import React, { useRef } from 'react';
import { FaHome } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { GiNightSleep } from 'react-icons/gi';
import { IoIosNutrition } from 'react-icons/io';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components';
import { capitalizeFirstLetter } from '../../utils';
import { axiosClient } from '../Profile/apiProfileClient';
import WeightLineChart from './Component/Chart';
import ShareWeeklyCheckinScreen from './ShareWeeklyCheckinScreen';

const WeeklyCheckinResult = ({ setScreen, week, weeklyReport }) => {
  const navigate = useNavigate();
  const userProfilePicture = JSON.parse(
    localStorage?.getItem('profilePicture'),
  );
  const name = JSON.parse(localStorage.getItem('user'))['name'];

  const summaryRef = useRef(null);

  function reverseArray(arr) {
    // Create a copy of the array to avoid modifying the original
    const reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }

  const dummygraphData = [
    {
      week: '2Dec-8Dec-2024',
      count: 0,
    },
    {
      week: '25Nov-1Dec-2024',
      count: 0,
    },
    {
      week: '18Nov-24Nov-2024',
      count: 0,
    },
    {
      week: '11Nov-17Nov-2024',
      count: 0,
    },
  ];

  function convertToWeekFormat(input) {
    // Ensure the input is a string
    if (typeof input !== 'string') {
      console.error('Input must be a string');
      return 'Invalid Date Format';
    }

    // Match the pattern to extract the parts (handles single-digit dates too)
    const regex = /^(\d{1,2}[A-Za-z]+)-(\d{1,2}[A-Za-z]+)-(\d{4})$/;
    const match = input.match(regex);

    if (!match) {
      console.error(
        "Input format is incorrect. Expected format: 'DDMMM-DDMMM-YYYY'. Received:",
        input,
      );
      return 'Invalid Date Format';
    }

    const [_, start, end, year] = match;

    // Extract day and month for the start and end
    const startDay = start.match(/^\d+/)?.[0]; // Extract digits
    const startMonth = start.match(/[A-Za-z]+$/)?.[0]; // Extract letters

    const endDay = end.match(/^\d+/)?.[0]; // Extract digits
    const endMonth = end.match(/[A-Za-z]+$/)?.[0]; // Extract letters

    if (!startDay || !startMonth || !endDay || !endMonth) {
      console.error('Unable to parse start or end date from input:', input);
      return 'Invalid Date Format';
    }

    // Combine into the desired format
    return `Week ${startDay}${startMonth} - ${endDay}${endMonth} `;
  }

  function formatToK(number) {
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return `${number}`;
  }

  const weightLiftedComapre = () => {
    const report = weeklyReport?.last8WeekWeightLifted;
    const latest = report?.[0]?.totalWeightLifted;
    const secondLatest = report?.[1]?.totalWeightLifted;
    return latest - secondLatest;
  };
  const numbersColor = [
    //Give UI to our stress /nutrition etc levels.
    {
      bg: 'bg-[rgba(250,87,87,0.20)]',
      text: 'text-[#FA5757]',
    },
    {
      bg: 'bg-[rgba(206,138,71,0.20)]',
      text: 'text-[#CE8A47]',
    },
    {
      bg: 'bg-[rgba(245,197,99,0.20)]',
      text: 'text-[#F5C563]',
    },
    {
      bg: 'bg-[rgba(148,176,48,0.08)]',
      text: 'text-[#94B030]',
    },
    {
      bg: 'bg-[rgba(94,204,123,0.20)]',
      text: 'text-[#5ECC7B]',
    },
  ];
  const revrseNumbersColor = [
    //Give UI to our stress /nutrition etc levels.
    {
      bg: 'bg-[rgba(94,204,123,0.20)]',
      text: 'text-[#5ECC7B]',
    },
    {
      bg: 'bg-[rgba(148,176,48,0.08)]',
      text: 'text-[#94B030]',
    },

    {
      bg: 'bg-[rgba(245,197,99,0.20)]',
      text: 'text-[#F5C563]',
    },
    {
      bg: 'bg-[rgba(206,138,71,0.20)]',
      text: 'text-[#CE8A47]',
    },

    {
      bg: 'bg-[rgba(250,87,87,0.20)]',
      text: 'text-[#FA5757]',
    },
  ];

  const captureAndShareToWhatsApp = async () => {
    //function to take screenshot of our result screen and later share it.
    if (summaryRef.current) {
      try {
        // Capture screenshot
        const dataUrl = await domtoimage.toPng(summaryRef.current);

        // Create share text
        const shareText = `  Check out my weekly checkin report!`;

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

  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];

  const caiptalInitial = capitalizeFirstLetter(fullName);

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

  if (!userProfilePicture && userProfilePicture !== '') {
    getMemberData(code);
  }
  if (!weeklyReport) {
    return <Loader />;
  }

  return (
    <div>
      <div className="pointer-events-none   absolute -top-[500px] z-[10] h-min opacity-0">
        <ShareWeeklyCheckinScreen
          formatToK={formatToK}
          numbersColor={numbersColor}
          revrseNumbersColor={revrseNumbersColor}
          summaryRef={summaryRef}
          weeklyReport={weeklyReport}
          weightLiftedComapre={weightLiftedComapre}
          reverseArray={reverseArray}
          caiptalInitial={caiptalInitial}
          userProfilePicture={userProfilePicture}
          week={week}
        />
      </div>
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        className="absolute top-0 -z-50 h-screen w-full  brightness-75 saturate-150 filter  "
        alt="background"
      />

      <div className="relative h-screen overflow-y-scroll bg-black-opacity-65 px-[15px] pb-[110px] pt-[100px] ">
        <div>
          <div className=" absolute right-[16px] top-10 z-[110] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-gray-opacity-44 ">
            <RxCross1 onClick={() => navigate('/')} className="" />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="w-fit rounded   bg-white-opacity-08 px-[6px]  text-[14px] font-extralight text-blue">
                {week && convertToWeekFormat(week)}
              </div>
              <h5 className="mt-[2px] text-[20px] leading-[32px] text-offwhite">
                Hi {name}, <br /> Here’s your week in Numbers
              </h5>
            </div>
            <div className="h-[40px] min-w-[40px]">
              {' '}
              {userProfilePicture ? (
                <img
                  loading="lazy"
                  src={userProfilePicture}
                  className="h-[40px] w-[40px] rounded-lg object-cover"
                  alt="img"
                />
              ) : (
                <div className="flex h-[53px] w-[53px] items-center justify-center rounded-xl bg-black-opacity-45 text-3xl text-white">
                  {caiptalInitial}
                </div>
              )}
            </div>
          </div>

          <div className="mt-[24px] flex h-full flex-col gap-2 bg-none">
            <div className=" relative flex flex-col justify-between rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/bar-graph-logo.svg" alt="graph" />
                  Workouts completed this week
                </div>
                <p className="absolute right-3 text-[10px] text-white-opacity-50">
                  last 4 weeks
                </p>
              </div>
              <div className=" flex justify-between">
                <div className=" mt-3 flex flex-col gap-3">
                  <p className="ml-[20px] flex items-center gap-1 text-[10px] text-offwhite">
                    {' '}
                    <span className="font-futura text-[58px]   leading-[40px] text-blue">
                      {weeklyReport?.last4WeekConsistency[0]?.count
                        ? weeklyReport?.last4WeekConsistency[0]?.count
                        : 0}
                    </span>{' '}
                    workout
                    {weeklyReport?.last4WeekConsistency[0]?.count !== 1 &&
                      's'}{' '}
                    last week
                  </p>
                  <div className="flex items-center gap-1">
                    <img src="/assets/target-icon.svg" alt="target" />
                    <p className="font-sfpro text-[10px] text-floYellow">
                      target
                    </p>
                    <p className="font-futura text-[18px] leading-[19px] text-blue">
                      {weeklyReport?.targetConsistency}
                    </p>
                    <p className="font-sfpro text-[10px] text-white-opacity-50">
                      workouts per week
                    </p>
                  </div>
                </div>
                <WeightLineChart
                  grahpData={
                    weeklyReport?.last4WeekConsistency &&
                    weeklyReport?.last4WeekConsistency.length > 0
                      ? reverseArray(weeklyReport?.last4WeekConsistency)
                      : reverseArray(dummygraphData)
                  }
                  yAxisKey={'count'}
                />
              </div>
            </div>

            <div className="relative flex flex-col justify-between rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-2 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/weight-icon.svg" alt="graph" />
                  Weight lifted
                </div>
                <p className="absolute right-3 text-[10px] text-white-opacity-50">
                  last 8 weeks
                </p>
              </div>
              <div className=" flex justify-between">
                <div className=" mt-3 flex flex-col gap-3">
                  <p className=" flex flex-col gap-1 text-[10px] text-offwhite">
                    {' '}
                    <span className="font-futura text-[25px]   leading-[27px] text-blue">
                      {weeklyReport?.last8WeekWeightLifted[0]?.totalWeightLifted?.toFixed(
                        0,
                      )}{' '}
                      {weeklyReport?.weightUnit}
                    </span>{' '}
                    Total weight lifted this week
                    {weeklyReport?.last8WeekWeightLifted[0]
                      ?.totalWeightLifted !==
                      weeklyReport?.last8WeekWeightLifted[1]
                        ?.totalWeightLifted && (
                      <div className="flex flex-wrap items-center gap-1">
                        <div
                          className={`flex w-fit  items-center gap-1 rounded-[3px] px-1 py-[2px] font-sfpro text-[12px] ${
                            weightLiftedComapre() > 0
                              ? 'bg-green-opacity-12 text-green '
                              : 'bg-red-opacity-12 text-red'
                          } `}
                        >
                          {weightLiftedComapre() > 0 ? (
                            <img
                              src="/assets/upArrow.svg"
                              className="h-[11px] w-[11px]"
                              alt="shoe"
                            />
                          ) : (
                            <img
                              src="/assets/downArrow.svg"
                              className="h-[11px] w-[11px]"
                              alt="shoe"
                            />
                          )}
                          {weightLiftedComapre().toFixed(0)}{' '}
                          {weeklyReport?.weightUnit}
                        </div>
                        <p className="font-sfpro text-[10px] text-white-opacity-50">
                          {weightLiftedComapre() > 0 ? 'more' : 'less'} than
                          last week
                        </p>
                      </div>
                    )}
                  </p>
                </div>
                <WeightLineChart
                  grahpData={
                    weeklyReport?.last8WeekWeightLifted &&
                    reverseArray(weeklyReport?.last8WeekWeightLifted)
                  }
                  yAxisKey={'totalWeightLifted'}
                />
              </div>
            </div>

            <div className="relative  flex flex-col justify-between rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                  {' '}
                  <img src="/assets/shoe-icon.svg" alt="graph" />
                  Average steps
                </div>
                <p className="absolute right-3 text-[10px] text-white-opacity-50">
                  last 4 weeks
                </p>
              </div>
              <div className=" flex justify-between">
                <div className=" mt-3 flex flex-col gap-3">
                  <p className=" flex flex-col  text-[10px] text-offwhite">
                    {' '}
                    <span className="font-futura text-[25px]   leading-[27px] text-blue">
                      {weeklyReport?.last4WeekStepCount[0].steps} Steps
                    </span>{' '}
                    {weeklyReport?.last4WeekStepCount[1].steps > 0 &&
                      Number(weeklyReport?.last4WeekStepCount[0].steps) -
                        Number(weeklyReport?.last4WeekStepCount[1].steps) !==
                        0 && (
                        <div className="flex items-center gap-1">
                          {Math.abs(
                            Number(weeklyReport?.last4WeekStepCount[0].steps) -
                              Number(weeklyReport?.last4WeekStepCount[1].steps),
                          )}
                          <span className="font-sfpro text-[10px] text-white-opacity-50">
                            steps{' '}
                            {Number(weeklyReport?.last4WeekStepCount[0].steps) -
                              Number(
                                weeklyReport?.last4WeekStepCount[1].steps,
                              ) >
                            0
                              ? 'more'
                              : 'less'}{' '}
                            than last week
                          </span>
                        </div>
                      )}
                  </p>
                  <div className="flex items-center gap-1">
                    <img src="/assets/target-icon.svg" alt="target" />
                    <p className="font-sfpro text-[10px] text-floYellow">
                      target
                    </p>
                    <p className="font-futura text-[18px] leading-[19px] text-blue">
                      {weeklyReport?.targetStepCount &&
                        formatToK(weeklyReport?.targetStepCount)}
                    </p>
                    <p className="font-sfpro text-[10px] text-white-opacity-50">
                      steps per day
                    </p>
                  </div>
                </div>
                <WeightLineChart
                  grahpData={
                    weeklyReport?.last4WeekStepCount &&
                    reverseArray(weeklyReport?.last4WeekStepCount)
                  }
                  yAxisKey={'steps'}
                />
              </div>
            </div>

            {weeklyReport?.perfectWeek?.isPerfectWeek === true && (
              <div className=" flex min-h-[113px] flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                {weeklyReport?.perfectWeek?.isPerfectWeek === true &&
                  weeklyReport?.perfectWeek?.streak > 0 && (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <img src="/assets/star-icon.svg" alt="graph" />
                          Perfect week streak
                        </div>
                      </div>
                    </>
                  )}
                {weeklyReport?.perfectWeek?.isPerfectWeek === true &&
                  weeklyReport?.perfectWeek?.streak > 0 && (
                    <div>
                      <div className="flex items-center ">
                        <div className="perfect-week mt-2 flex w-fit items-center rounded">
                          <img src="assets/star.svg" alt="" />
                          <span className="mx-0.5  text-xs font-[700] -tracking-[0.36px] text-[#4a3e1d] ">
                            Perfect Week x{weeklyReport?.perfectWeek?.streak}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 font-sfpro text-[12px] text-offwhite">
                        You unlocked a perfect week badge this week. Keep
                        crushing your workouts to maintain your streak.
                      </div>
                    </div>
                  )}
              </div>
            )}
            {weeklyReport?.perfectWeek?.isPerfectWeek === false && (
              <div className=" flex min-h-[113px] flex-col gap-3 rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                    {' '}
                    <img src="/assets/star-icon.svg" alt="graph" />
                    Perfect week streak
                  </div>
                </div>
                <p className="font-sfpro text-[12px] text-offwhite">
                  You were{' '}
                  {Number(weeklyReport?.targetConsistency) -
                    (Number(weeklyReport?.last4WeekConsistency[0]?.count)
                      ? Number(weeklyReport?.last4WeekConsistency[0]?.count)
                      : 0)}{' '}
                  workout
                  {Number(weeklyReport?.targetConsistency) -
                    Number(weeklyReport?.last4WeekConsistency[0]?.count) >
                    1 && 's'}{' '}
                  away from unlocking a perfect week badge. Let's do better next
                  week!
                </p>
              </div>
            )}
            {weeklyReport?.energyLevelThisWeek === 0 &&
            weeklyReport?.sleepQualityThisWeek === 0 &&
            weeklyReport?.nutritionRatingThisWeek === 0 &&
            weeklyReport?.stressLevelsThisWeek === 0 ? (
              <></>
            ) : (
              <div className="flex flex-col justify-between gap-2">
                <div className="flex gap-2">
                  {weeklyReport?.energyLevelThisWeek &&
                  weeklyReport?.energyLevelThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex flex-col  justify-between ">
                        <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <img src="/assets/leaf-yellow-icon.svg" alt="graph" />
                          Energy level
                        </div>
                        <div className="mt-2 flex gap-3">
                          {' '}
                          <div
                            className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                              numbersColor[
                                Number(weeklyReport?.energyLevelThisWeek) - 1
                              ].bg
                            }`}
                          >
                            <p
                              className={`font-futura text-[32px]  ${`${
                                numbersColor[
                                  Number(weeklyReport?.energyLevelThisWeek) - 1
                                ].text
                              }`}`}
                            >
                              {weeklyReport?.energyLevelThisWeek}
                            </p>
                          </div>
                          <div className="text-[10px] text-offwhite">
                            {Number(weeklyReport?.energyLevelThisWeek) <= 3 && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                let's aim for a higher score
                              </div>
                            )}

                            {Number(weeklyReport?.energyLevelThisWeek) > 3 &&
                              Number(weeklyReport?.energyLevelThisWeek) <=
                                5 && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  Good job! Let's keep at it
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {weeklyReport?.stressLevelsThisWeek &&
                  weeklyReport?.stressLevelsThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow  flex-col rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex items-center justify-between ">
                        <div className="flex grow items-center gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <img
                            src="/assets/heart-icon.png"
                            alt="graph"
                            className="h-[15px] w-[15px]"
                          />
                          Stress level
                        </div>
                      </div>
                      <div className="mt-2 flex gap-3">
                        {' '}
                        <div
                          className={`border-box flex  h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                            revrseNumbersColor[
                              Number(weeklyReport?.stressLevelsThisWeek) - 1
                            ].bg
                          }`}
                        >
                          <p
                            className={`font-futura text-[32px]  ${`${
                              revrseNumbersColor[
                                Number(weeklyReport?.stressLevelsThisWeek) - 1
                              ].text
                            }`}`}
                          >
                            {weeklyReport?.stressLevelsThisWeek}
                          </p>
                        </div>
                        {Number(weeklyReport?.stressLevelsThisWeek) > 2 && (
                          <div className="font-sfpro text-[12px] text-offwhite">
                            Let's aim for a lower score
                          </div>
                        )}
                        {Number(weeklyReport?.stressLevelsThisWeek) <= 2 && (
                          <div className="font-sfpro text-[12px] text-offwhite">
                            Good job! Let's keep at it
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex gap-2">
                  {weeklyReport?.sleepQualityThisWeek &&
                  weeklyReport?.sleepQualityThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow  flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex flex-col  justify-between ">
                        <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <GiNightSleep className="text-floYellow" />
                          Sleep level
                        </div>
                        <div className="mt-2 flex gap-3">
                          {' '}
                          <div
                            className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                              numbersColor[
                                Number(weeklyReport?.sleepQualityThisWeek) - 1
                              ].bg
                            }`}
                          >
                            <p
                              className={`font-futura text-[32px]  ${`${
                                numbersColor[
                                  Number(weeklyReport?.sleepQualityThisWeek) - 1
                                ].text
                              }`}`}
                            >
                              {weeklyReport?.sleepQualityThisWeek}
                            </p>
                          </div>
                          <div className="text-[10px] text-offwhite">
                            {Number(weeklyReport?.sleepQualityThisWeek) <=
                              3 && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                Let's aim for a higher score
                              </div>
                            )}
                            {Number(weeklyReport?.sleepQualityThisWeek) > 3 &&
                              Number(weeklyReport?.sleepQualityThisWeek) <=
                                5 && (
                                <div className="font-sfpro text-[12px] text-offwhite">
                                  Good job! Let's keep at it
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  {weeklyReport?.nutritionRatingThisWeek &&
                  weeklyReport?.nutritionRatingThisWeek > 0 ? (
                    <div className=" flex w-1/2 grow  flex-col rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                      <div className="flex items-center justify-between ">
                        <div className="flex grow items-center gap-1 text-[15px] font-semibold text-offwhite">
                          {' '}
                          <IoIosNutrition className="text-floYellow" />
                          Nutrition level
                        </div>
                      </div>
                      <div className="mt-2 flex gap-3">
                        {' '}
                        <div
                          className={`border-box flex h-min w-min flex-row items-center justify-between rounded-[12px] px-3  ${
                            numbersColor[
                              Number(weeklyReport?.nutritionRatingThisWeek) - 1
                            ].bg
                          }`}
                        >
                          <p
                            className={`font-futura text-[32px]  ${`${
                              numbersColor[
                                Number(weeklyReport?.nutritionRatingThisWeek) -
                                  1
                              ].text
                            }`}`}
                          >
                            {weeklyReport?.nutritionRatingThisWeek}
                          </p>
                        </div>
                        <div className="text-[10px] text-offwhite">
                          {Number(weeklyReport?.nutritionRatingThisWeek) <=
                            3 && (
                            <div className="font-sfpro text-[12px] text-offwhite">
                              Let's aim for a higher score
                            </div>
                          )}

                          {Number(weeklyReport?.nutritionRatingThisWeek) > 3 &&
                            Number(weeklyReport?.nutritionRatingThisWeek) <=
                              5 && (
                              <div className="font-sfpro text-[12px] text-offwhite">
                                Good job! Let's keep at it
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
            {weeklyReport?.userLast8WeekWeightHistory.length > 0 && (
              <div className=" flex flex-col  rounded-lg bg-white-opacity-08 px-[16px] py-[9px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex grow gap-1 text-[15px] font-semibold text-offwhite">
                    {' '}
                    <img src="/assets/weight-machine.svg" alt="graph" />
                    Latest Body Weight
                  </div>
                  <p className="text-[10px] text-white-opacity-50">
                    last 8 weeks
                  </p>
                </div>
                <div className="flex justify-between gap-3">
                  <div>
                    <p className=" mb-1 mt-[10px] flex items-center gap-1 text-[10px] text-offwhite">
                      {' '}
                      <span className="font-futura text-[32px]   leading-[40px] text-blue">
                        {weeklyReport?.userLast8WeekWeightHistory[0]?.weight}{' '}
                        {weeklyReport?.weightUnit}
                      </span>{' '}
                    </p>
                    {weeklyReport?.userLast8WeekWeightHistory[1]?.weight ||
                    weeklyReport?.userLast8WeekWeightHistory[1]?.weight ===
                      '' ? (
                      <div className="flex flex-wrap items-center gap-1">
                        <div className="flex w-fit items-center  rounded-[3px] bg-[rgba(245,197,99,0.2)] px-1 py-[2px] font-sfpro text-[12px] text-yellow">
                          {weeklyReport?.userLast8WeekWeightHistory[0]?.weight -
                            weeklyReport?.userLast8WeekWeightHistory[1]
                              ?.weight >
                          0 ? (
                            <MdArrowDropUp className=" text-[19px]" />
                          ) : (
                            <MdArrowDropDown className=" text-[19px]" />
                          )}
                          {Math.abs(
                            Number(
                              weeklyReport?.userLast8WeekWeightHistory[0]
                                ?.weight,
                            ) -
                              Number(
                                weeklyReport?.userLast8WeekWeightHistory[1]
                                  ?.weight,
                              ),
                          ).toFixed(2)}{' '}
                          {weeklyReport?.weightUnit}
                        </div>
                        <p className="font-sfpro text-[10px] text-white-opacity-50">
                          since last week
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {weeklyReport?.userLast8WeekWeightHistory.length > 1 && (
                    <WeightLineChart
                      grahpData={
                        weeklyReport?.userLast8WeekWeightHistory &&
                        reverseArray(weeklyReport?.userLast8WeekWeightHistory)
                      }
                      yAxisKey={'weight'}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-[100] flex w-full gap-2 px-4 pb-[36px]">
        <button
          onClick={() => navigate('/home')}
          className="flex w-[114px] items-center justify-center rounded-lg bg-graySecond font-sfpro text-[18px] font-medium leading-[25px]"
        >
          <FaHome size={32} />
        </button>
        <button
          onClick={() => captureAndShareToWhatsApp()}
          className="flex grow items-center justify-center gap-1 rounded-lg bg-white py-[14px] font-sfpro text-lg leading-[26px] text-black"
        >
          Share with coach{' '}
          <span className="text-lack text-[18px]">
            <FiUpload />
          </span>
        </button>
      </div>
    </div>
  );
};

export default WeeklyCheckinResult;
