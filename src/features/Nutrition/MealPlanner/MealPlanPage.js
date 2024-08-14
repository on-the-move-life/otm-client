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

function MealPlanPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectWeeklyPlans = Selectors.makeGetWeeklyPlan();
  const weeklyPlan = useSelector(selectWeeklyPlans, shallowEqual);

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateWiseWeeklyPlan, setDateWiseWeeklyPlan] = useState(null);
  const [mealSelected, setMealSelected] = useState('Breakfast');

  const str = '3308 kcal';
  const idealCalorie = parseInt(str, 10);

  const completedCalorie = 3309;

  const completedCaloriePercentage = (completedCalorie / idealCalorie) * 100;
  const foodPerDay = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  console.log(dateWiseWeeklyPlan);

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
      setSelectedDate(weeklyPlan[0]['day']);
    }
    console.log('weekly plan : ', weeklyPlan);
  }, [weeklyPlan]);

  useEffect(() => {
    const requiredWeeklyPlan = weeklyPlan.filter(
      (item) => item?.day === selectedDate,
    );
    console.log('requiredWeeklyPlan : ', requiredWeeklyPlan[0]);
    setDateWiseWeeklyPlan(requiredWeeklyPlan[0]);
    console.log('date wise weekly plan :', dateWiseWeeklyPlan);
  }, [selectedDate]);

  const handleMealDay = (item) => {
    console.log('rrrtrtrtrtrtrtr', item);
  };

  return (
    dateWiseWeeklyPlan && (
      <div className="">
        <img
          className="absolute top-0 left-0 z-0 w-full h-screen"
          src="/assets/nutrition-bg.svg"
        />
        <div className="relative z-10 flex flex-col items-start justify-start w-full h-full my-4 ">
          <div className="flex flex-row items-center justify-between w-full ">
            {weeklyPlan &&
              weeklyPlan.map((item) => {
                const slicedDay = item.day.substr(0, 3);
                return (
                  <div onClick={() => setSelectedDate(item.day)}>
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
          <div className="mt-2 flex h-fit w-full flex-col items-center justify-center rounded-[12px] bg-[rgba(0,0,0,0.45)] px-4 py-2">
            <div className="w-full">
              <h5
                className="font-sfpro text-[14px] font-medium text-offwhite"
                style={{ lineHeight: '16.71px' }}
              >
                Suggested Calories
              </h5>
              <p
                style={{
                  fontSize: '20.61px',
                  lineHeight: '25.77px',
                  color: '#F5C563',
                }}
              >
                {dateWiseWeeklyPlan['totalCalorie']}
              </p>
            </div>
            <h5
              className="mt-2 text-[14px] text-[#929292]"
              style={{ lineHeight: '16.71px' }}
            >
              It looks like you’re going to exceed today’s calorie count. Let’s
              get an extra 25 min walk in.
            </h5>
            <div className="w-full h-3 mt-2 overflow-hidden rounded-full bg-gray">
              <motion.div
                className="relative h-full rounded-full p-[2px]"
                style={{
                  background: gradient,
                  width: `${completedCaloriePercentage}%`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${completedCaloriePercentage}%` }}
                transition={{ duration: 1 }}
              >
                <div className="absolute flex right-1 ">
                  <span>23</span>
                  <span className="w-2 h-2 bg-white rounded-full "></span>
                </div>
              </motion.div>
              <span className="font-bold text-white">
                {completedCaloriePercentage}%
              </span>
              <div className="w-6 h-6 ml-2 bg-white border-2 border-gray-400 rounded-full"></div>
            </div>
          </div>

          <div
            className={`mt-[26px] flex h-[38px] w-full items-center rounded-[7px] bg-[rgba(0,0,0,0.45)] p-[2px]`}
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
          <div className="flex flex-col items-center justify-start w-full gap-2 my-2">
            {dateWiseWeeklyPlan &&
              dateWiseWeeklyPlan.plan.map((item) => {
                const isSnack =
                  mealSelected.toLowerCase() === 'snack' &&
                  (item.meal.toLowerCase() === 'morning snack' ||
                    item.meal.toLowerCase() === 'evening snack');

                if (item.meal === mealSelected.toLowerCase() || isSnack) {
                  return (
                    <MealInfoTile
                      key={item.id} // Add a unique key for each element
                      name={item?.name}
                      meal={item?.meal}
                      calories={item?.calories}
                      macros={item?.macros}
                      ingredients={item?.items}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>

          <Link to="/MealUpload" className="flex w-full gap-2 mt-2">
            <div className="flex h-[65px] grow items-center justify-between rounded-lg bg-[rgba(0,0,0,0.45)] p-1">
              <div className="ml-[20px] flex items-center">
                <img src="/assets/food.svg" />
                <span className="ml-[20px] text-xl  text-offwhite">
                  Add Breakfast
                </span>
              </div>
              <div className="flex min-h-[55px] min-w-[55px] items-center justify-center rounded-lg bg-floYellow ">
                <img src="/assets/fitness-add.svg" />
              </div>
            </div>
          </Link>
          <MealUploadTile />
        </div>
      </div>
    )
  );
}

export default MealPlanPage;
