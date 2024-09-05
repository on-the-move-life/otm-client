import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import CalendarTile from './Components/CalendarTile';
import MealInfoTile from './Components/MealInfoTile';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Selectors from './Redux/selectors';
import * as Actions from './Redux/actions';
import { motion } from 'framer-motion';
import MealUploadTile from './Components/MealUploadTile';

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
    currentWeek.push(date);
  }

  return currentWeek;
}

// Function to check if a given day is in the current week
function isDateInCurrentWeek(day) {
  const currentWeek = getCurrentWeek();

  // Find if the day exists in the current week
  const matchedDate = currentWeek.find((date) => date.getDate() === day);

  if (matchedDate) {
    return matchedDate; // Return the Date object if found
  }

  return null; // Return null if not found
}

function MealPlanPage({ mealData, setSelectedDate, selectedDate }) {
  const selectWeeklyPlans = Selectors.makeGetWeeklyPlan();
  const weeklyPlan = useSelector(selectWeeklyPlans, shallowEqual);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dateWiseWeeklyPlan, setDateWiseWeeklyPlan] = useState(null);
  const [mealSelected, setMealSelected] = useState('Breakfast');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [takenCalorie, setTakenCalorie] = useState(null);

  console.log(mealData, takenCalorie);
  useEffect(() => {
    setTakenCalorie(mealData?.totalCalories);
  }, [mealData]);

  const [isTrackerVisible, setIsTrackerVisible] = useState(null);

  useEffect(() => {
    if (selectedPlan && weeklyPlan) {
      const trackerVisible = selectedPlan.some(
        (item) => item.day === selectedDay,
      );
      setIsTrackerVisible(trackerVisible);
    }
  }, [selectedPlan, selectedDay]);

  useEffect(() => {
    if (
      dateWiseWeeklyPlan?.date !== undefined &&
      dateWiseWeeklyPlan?.date !== null
    ) {
      // Ensure the prop is valid
      const result = isDateInCurrentWeek(dateWiseWeeklyPlan?.date);
      setSelectedDate(result);
    }
  }, [dateWiseWeeklyPlan]);

  const totalCalories = dateWiseWeeklyPlan?.totalCalorie;
  const idealCalorie = parseInt(totalCalories, 10);

  const completedCalorie = takenCalorie ? takenCalorie : 0;

  const completedCaloriePercentage = (completedCalorie / idealCalorie) * 100;
  const foodPerDay = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  let gradient;

  if (completedCaloriePercentage <= 50) {
    gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 100%)';
  } else if (completedCaloriePercentage <= 80) {
    gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 100%)';
  } else {
    gradient =
      'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 80%, #5ECC7B 100%)';
  }

  useEffect(() => {
    if (weeklyPlan !== null && weeklyPlan.length > 0) {
      const todayDate = new Date().getDate();

      // Create array of selected plan fwhich are equal or less than today date.
      const startIndex = weeklyPlan.findIndex(
        (item) => item.date === todayDate,
      );
      const planTillToday = weeklyPlan.slice(0, startIndex + 1);
      setSelectedPlan(planTillToday);

      // Find the plan for today
      const todayPlan = weeklyPlan.find((plan) => plan.date === todayDate);
      console.log('todayPlan  : ', todayPlan, weeklyPlan[0]['day'], weeklyPlan);
      setSelectedDay(todayPlan['day']);
      // setSelectedDate(todayPlan['date']);
    }
    console.log('weekly plan : ', weeklyPlan);
  }, [weeklyPlan]);

  useEffect(() => {
    const requiredWeeklyPlan = weeklyPlan.filter(
      (item) => item?.day === selectedDay,
    );
    console.log('requiredWeeklyPlan : ', requiredWeeklyPlan[0]);
    setDateWiseWeeklyPlan(requiredWeeklyPlan[0]);
    console.log('date wise weekly plan :', dateWiseWeeklyPlan);
  }, [selectedDay]);

  return (
    <>
      {dateWiseWeeklyPlan && (
        <div className="relative z-10 my-4 flex h-full w-full flex-col items-start justify-start ">
          <div className="flex w-full flex-row items-center justify-between ">
            {weeklyPlan &&
              weeklyPlan.map((item) => {
                const slicedDay = item.day.substr(0, 3);
                console.log(slicedDay);
                return (
                  <div onClick={() => setSelectedDay(item.day)}>
                    <CalendarTile
                      date={item.date}
                      day={slicedDay}
                      isSelected={item.day === dateWiseWeeklyPlan.day}
                      selectedDay={dateWiseWeeklyPlan.day}
                    />
                  </div>
                );
              })}
          </div>

          {takenCalorie >= 0 && totalCalories && isTrackerVisible && (
            <div className="mt-2 flex h-fit w-full flex-col items-center justify-center rounded-[12px] bg-[rgba(0,0,0,0.45)] px-4 py-2">
              <div className="w-full">
                <h5
                  className="font-sfpro text-[14px] font-medium text-offwhite"
                  style={{ lineHeight: '16.71px' }}
                >
                  Track Calories
                </h5>
                <p
                  className=" my-[4px] text-offwhite"
                  style={{
                    fontSize: '20.61px',
                    lineHeight: '25.77px',
                  }}
                >
                  <span className="text-[#F5C563]">{takenCalorie}</span> /
                  {dateWiseWeeklyPlan['totalCalorie']}
                </p>
              </div>
              {/* <h5
                className=" text-[14px] text-[#929292]"
                style={{ lineHeight: '16.71px' }}
              >
                It looks like you’re going to exceed today’s calorie count.
                Let’s get an extra 25 min walk in.
              </h5> */}
              <div className="my-1 h-3 w-full overflow-hidden rounded-full bg-gray">
                <motion.div
                  className="relative h-full rounded-full px-[2px]"
                  style={{
                    background: gradient,
                    width: `${completedCaloriePercentage}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completedCaloriePercentage}%` }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute right-1 top-0 flex pt-[1px]">
                    <span className="mt-[1px] h-2 w-2 rounded-full  bg-white"></span>
                  </div>
                </motion.div>
                <span className="font-bold text-white">
                  {completedCaloriePercentage}%
                </span>
                <div className="border-gray-400 ml-2 h-6 w-6 rounded-full border-2 bg-white"></div>
              </div>
            </div>
          )}
          <div
            className={`my-[20px] flex h-[38px] w-full items-center rounded-[7px] bg-[rgba(0,0,0,0.45)] p-[2px]`}
          >
            {foodPerDay.map((item) => (
              <div
                style={{
                  border:
                    item === mealSelected
                      ? '0.5px solid rgba(221, 249, 136, 0.50)'
                      : '',
                  borderRadius: '7px',
                }}
                className={`${
                  item === mealSelected
                    ? `bg-[rgba(77,77,77,0.4)] text-floYellow`
                    : 'text-white-opacity-50 '
                } flex h-full grow items-center justify-center `}
                onClick={() => setMealSelected(item)}
              >
                {item}{' '}
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-2 ">
            {dateWiseWeeklyPlan &&
              dateWiseWeeklyPlan.plan.map((item) => {
                const isSnack =
                  mealSelected.toLowerCase() === 'snack' &&
                  (item.meal.toLowerCase() === 'morning snack' ||
                    item.meal.toLowerCase() === 'evening snack');

                if (item.meal === mealSelected.toLowerCase() || isSnack) {
                  return (
                    <>
                      <MealInfoTile
                        key={item.id} // Add a unique key for each element
                        name={item?.name}
                        meal={item?.meal}
                        calories={item?.calories}
                        macros={item?.macros}
                        ingredients={item?.items}
                        mealSuggestionImage={item?.mealImage}
                        mealPreference={dateWiseWeeklyPlan.mealPreference}
                        dietPreference={dateWiseWeeklyPlan.dietPreference}
                      />
                    </>
                  );
                } else {
                  return <></>;
                }
              })}
          </div>
          {isTrackerVisible && (
            <Link
              to={`/MealUpload?meal=${mealSelected}&date=${selectedDate}`}
              className="mt-2 flex w-full gap-2"
            >
              <div className="flex h-[65px] grow items-center justify-between rounded-lg bg-[rgba(0,0,0,0.45)] p-1">
                <div className="ml-[20px] flex items-center">
                  {mealSelected.toLowerCase() === 'breakfast' && (
                    <img src="/assets/trackbreakfast.svg" />
                  )}
                  {mealSelected.toLowerCase() === 'lunch' && (
                    <img src="/assets/tracklunch.svg" />
                  )}
                  {mealSelected.toLowerCase() === 'snack' && (
                    <img src="/assets/tracksnack.svg" />
                  )}
                  {mealSelected.toLowerCase() === 'dinner' && (
                    <img src="/assets/trackdinner.svg" />
                  )}

                  <span className="ml-[20px] text-xl  text-offwhite">
                    Track {mealSelected}
                  </span>
                </div>
                <div className="flex min-h-[55px] min-w-[55px] items-center justify-center rounded-lg bg-floYellow ">
                  <img src="/assets/fitness-add.svg" />
                </div>
              </div>
            </Link>
          )}

          {mealData &&
            mealData.meals.map((item) => {
              const isSnack =
                mealSelected.toLowerCase() === 'snack' &&
                (item.mealType === 'morningSnack' ||
                  item.mealType === 'eveningSnack');

              if (
                item.mealType.toLowerCase() === mealSelected.toLowerCase() ||
                isSnack
              ) {
                return (
                  <div className="w-full" key={item._id}>
                    <MealUploadTile
                      mealType={item.mealType}
                      mealUrl={item.mealUrl}
                      mealNutritionAnalysis={item.mealNutritionAnalysis}
                    />
                  </div>
                );
              } else {
                return <></>;
              }
            })}
        </div>
      )}
    </>
  );
}

export default MealPlanPage;
