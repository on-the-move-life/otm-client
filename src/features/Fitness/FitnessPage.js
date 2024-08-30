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

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

const dummyCalender = [
  {
    day: 'Monday',
    totalCalorie: '3050 kcal',
    mealPreference: 'vegetarian',
    dietPreference: 'Build muscle',
    plan: [
      {
        meal: 'breakfast',
        name: 'Moong Dal Pancakes with Avocado and Greek Yogurt',
        items: ['Moong Dal', 'Greek Yogurt', 'Avocado'],
        calories: '700 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Monday_breakfast.jpg',
      },
      {
        meal: 'morning snack',
        name: 'Mixed Nuts and Fruit Bowl',
        items: ['Almonds', 'Walnuts', 'Apple', 'Banana'],
        calories: '350 kcal',
        macros: {
          carbs: '40%',
          fats: '50%',
          protein: '10%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Monday_morning snack.jpg',
      },
      {
        meal: 'lunch',
        name: 'Quinoa Lentil Salad with Roasted Vegetables',
        items: [
          'Quinoa',
          'Lentils',
          'Cauliflower',
          'Beetroot',
          'Carrots',
          'Balsamic Dressing',
        ],
        calories: '750 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Monday_lunch.jpg',
      },
      {
        meal: 'evening snack',
        name: 'Greek Yogurt with Honey and Chia Seeds',
        items: ['Greek Yogurt', 'Honey', 'Chia Seeds'],
        calories: '250 kcal',
        macros: {
          carbs: '35%',
          fats: '40%',
          protein: '25%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Monday_evening snack.jpg',
      },
      {
        meal: 'dinner',
        name: 'Stuffed Bell Peppers with Paneer and Brown Rice',
        items: ['Bell Peppers', 'Paneer', 'Brown Rice', 'Tomatoes', 'Spinach'],
        calories: '1000 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Monday_dinner.jpg',
      },
    ],
    date: 26,
  },
  {
    day: 'Tuesday',
    totalCalorie: '3050 kcal',
    mealPreference: 'vegetarian',
    dietPreference: 'Build muscle',
    plan: [
      {
        meal: 'breakfast',
        name: 'Oats and Moong Dal Chilla with Avocado Greek Yogurt Spread',
        items: ['Oats', 'Moong Dal', 'Avocado', 'Greek Yogurt'],
        calories: '650 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Tuesday_breakfast.jpg',
      },
      {
        meal: 'morning snack',
        name: 'Mixed Nuts and Fruit Platter',
        items: ['Almonds', 'Walnuts', 'Apple', 'Banana'],
        calories: '400 kcal',
        macros: {
          carbs: '40%',
          fats: '50%',
          protein: '10%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Tuesday_morning snack.jpg',
      },
      {
        meal: 'lunch',
        name: 'Quinoa Lentil Salad with Grilled Veggies',
        items: [
          'Quinoa',
          'Lentils',
          'Eggplant (Brinjal)',
          'Zucchini',
          'Red Bell Peppers',
          'Olive Oil',
          'Lemon Dressing',
        ],
        calories: '750 kcal',
        macros: {
          carbs: '35%',
          fats: '30%',
          protein: '35%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Tuesday_lunch.jpg',
      },
      {
        meal: 'evening snack',
        name: 'Cucumber and Carrot Sticks with Hummus',
        items: ['Cucumber', 'Carrots', 'Hummus'],
        calories: '300 kcal',
        macros: {
          carbs: '30%',
          fats: '50%',
          protein: '20%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Tuesday_evening snack.jpg',
      },
      {
        meal: 'dinner',
        name: 'Mung Beans and Brown Rice with Sauteed Greens',
        items: [
          'Mung Beans',
          'Brown Rice',
          'Kale',
          'Spinach',
          'Garlic',
          'Olive Oil',
        ],
        calories: '950 kcal',
        macros: {
          carbs: '35%',
          fats: '30%',
          protein: '35%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Tuesday_dinner.jpg',
      },
    ],
    date: 27,
  },
  {
    day: 'Wednesday',
    totalCalorie: '3050 kcal',
    mealPreference: 'vegetarian',
    dietPreference: 'Build muscle',
    plan: [
      {
        meal: 'breakfast',
        name: 'Moong Dal Pancakes with Avocado and Greek Yogurt',
        items: ['Moong Dal', 'Avocado', 'Greek Yogurt'],
        calories: '650 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Wednesday_breakfast.jpg',
      },
      {
        meal: 'morning snack',
        name: 'Mixed Nuts and Fruit Bowl',
        items: ['Almonds', 'Walnuts', 'Apple', 'Banana'],
        calories: '450 kcal',
        macros: {
          carbs: '40%',
          fats: '40%',
          protein: '20%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Wednesday_morning snack.jpg',
      },
      {
        meal: 'lunch',
        name: 'Quinoa Salad with Beetroot and Roasted Cauliflower',
        items: ['Quinoa', 'Beetroot', 'Cauliflower'],
        calories: '750 kcal',
        macros: {
          carbs: '40%',
          fats: '30%',
          protein: '30%',
        },
      },
      {
        meal: 'evening snack',
        name: 'Greek Yogurt with Honey and Chia Seeds',
        items: ['Greek Yogurt', 'Honey', 'Chia Seeds'],
        calories: '300 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Wednesday_evening snack.jpg',
      },
      {
        meal: 'dinner',
        name: 'Lentil and Veggie Stir-fry over Brown Rice',
        items: ['Lentils', 'Green Beans', 'Cauliflower', 'Brown Rice'],
        calories: '900 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Wednesday_dinner.jpg',
      },
    ],
    date: 28,
  },
  {
    day: 'Thursday',
    totalCalorie: '3050 kcal',
    mealPreference: 'vegetarian',
    dietPreference: 'Build muscle',
    plan: [
      {
        meal: 'breakfast',
        name: 'Moong Dal Pancakes with Avocado and Greek Yogurt Topping',
        items: ['Moong Dal', 'Avocado', 'Greek Yogurt'],
        calories: '600 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Thursday_breakfast.jpg',
      },
      {
        meal: 'morning snack',
        name: 'Mixed Nuts and Fruit Bowl',
        items: ['Almonds', 'Walnuts', 'Blueberries', 'Apple'],
        calories: '300 kcal',
        macros: {
          carbs: '40%',
          fats: '40%',
          protein: '20%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Thursday_morning snack.jpg',
      },
      {
        meal: 'lunch',
        name: 'Lentil Quinoa Buddha Bowl with Roasted Veggies',
        items: [
          'Lentils',
          'Quinoa',
          'Bok Choy',
          'Cauliflower',
          'Beets',
          'Avocado dressing',
        ],
        calories: '750 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Thursday_lunch.jpg',
      },
      {
        meal: 'evening snack',
        name: 'Greek Yogurt with Honey and Mixed Seeds',
        items: [
          'Greek Yogurt',
          'Honey',
          'Chia Seeds',
          'Flaxseeds',
          'Pumpkin Seeds',
        ],
        calories: '300 kcal',
        macros: {
          carbs: '25%',
          fats: '45%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Thursday_evening snack.jpg',
      },
      {
        meal: 'dinner',
        name: 'Stuffed Bell Peppers with Paneer and Mushroom',
        items: ['Bell Peppers', 'Paneer', 'Mushrooms', 'Brown Rice'],
        calories: '1100 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Thursday_dinner.jpg',
      },
    ],
    date: 29,
  },
  {
    day: 'Friday',
    totalCalorie: '3050 kcal',
    mealPreference: 'vegetarian',
    dietPreference: 'Build muscle',
    plan: [
      {
        meal: 'breakfast',
        name: 'Moong Dal Pancakes with Avocado Spread',
        items: ['Moong Dal', 'Avocado', 'Greek Yogurt'],
        calories: '700 kcal',
        macros: {
          carbs: '30%',
          fats: '40%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Friday_breakfast.jpg',
      },
      {
        meal: 'morning snack',
        name: 'Mixed Nuts and Fruit Bowl',
        items: ['Almonds', 'Walnuts', 'Apple', 'Banana'],
        calories: '350 kcal',
        macros: {
          carbs: '40%',
          fats: '45%',
          protein: '15%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Friday_morning snack.jpg',
      },
      {
        meal: 'lunch',
        name: 'Quinoa Bean Salad with Grilled Veggies',
        items: ['Quinoa', 'Chickpeas', 'Zucchini', 'Bell Peppers', 'Bok Choy'],
        calories: '850 kcal',
        macros: {
          carbs: '35%',
          fats: '30%',
          protein: '35%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Friday_lunch.jpg',
      },
      {
        meal: 'evening snack',
        name: 'Greek Yogurt with Honey and Walnuts',
        items: ['Greek Yogurt', 'Honey', 'Walnuts'],
        calories: '300 kcal',
        macros: {
          carbs: '20%',
          fats: '50%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Friday_evening snack.jpg',
      },
      {
        meal: 'dinner',
        name: 'Lentil and Vegetable Stuffed Peppers',
        items: [
          'Lentils',
          'Bell Peppers',
          'Cauliflower',
          'Carrots',
          'Tomatoes',
        ],
        calories: '850 kcal',
        macros: {
          carbs: '35%',
          fats: '30%',
          protein: '35%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Friday_dinner.jpg',
      },
    ],
    date: 30,
  },
  {
    day: 'Saturday',
    totalCalorie: '3050 kcal',
    mealPreference: 'vegetarian',
    dietPreference: 'Build muscle',
    plan: [
      {
        meal: 'breakfast',
        name: 'Moong Dal Pancakes with Avocado and Greek Yogurt',
        items: ['Moong Dal', 'Avocado', 'Greek Yogurt'],
        calories: '600 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Saturday_breakfast.jpg',
      },
      {
        meal: 'morning snack',
        name: 'Mixed Nuts and Seeds with Fruit Salad',
        items: ['Almonds', 'Walnuts', 'Chia Seeds', 'Apple', 'Banana'],
        calories: '400 kcal',
        macros: {
          carbs: '40%',
          fats: '45%',
          protein: '15%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Saturday_morning snack.jpg',
      },
      {
        meal: 'lunch',
        name: 'Quinoa Lentil Salad with Steamed Green Veggies',
        items: [
          'Quinoa',
          'Lentils',
          'Broccoli',
          'Brussels Sprouts',
          'Bok Choy',
        ],
        calories: '800 kcal',
        macros: {
          carbs: '35%',
          fats: '30%',
          protein: '35%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Saturday_lunch.jpg',
      },
      {
        meal: 'evening snack',
        name: 'Greek Yogurt with Honey and Mixed Berries',
        items: ['Greek Yogurt', 'Honey', 'Mixed Berries'],
        calories: '350 kcal',
        macros: {
          carbs: '45%',
          fats: '25%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Saturday_evening snack.jpg',
      },
      {
        meal: 'dinner',
        name: 'Stuffed Bell Peppers with Paneer and Brown Rice',
        items: ['Bell Peppers', 'Paneer', 'Brown Rice', 'Spices'],
        calories: '900 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Saturday_dinner.jpg',
      },
    ],
    date: 31,
  },
  {
    day: 'Sunday',
    totalCalorie: '3050 kcal',
    mealPreference: 'vegetarian',
    dietPreference: 'Build muscle',
    plan: [
      {
        meal: 'breakfast',
        name: 'Moong Dal Pancakes with Greek Yogurt and Avocado',
        items: ['Moong Dal', 'Greek Yogurt', 'Avocado'],
        calories: '600 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Sunday_breakfast.jpg',
      },
      {
        meal: 'lunch',
        name: 'Quinoa Chickpea Buddha Bowl',
        items: [
          'Quinoa',
          'Chickpeas',
          'Avocado',
          'Spinach',
          'Cucumber',
          'Carrots',
        ],
        calories: '750 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Sunday_lunch.jpg',
      },
      {
        meal: 'evening snack',
        name: 'Fruit and Nut Mix',
        items: ['Almonds', 'Walnuts', 'Dried Cranberries', 'Apple Slices'],
        calories: '300 kcal',
        macros: {
          carbs: '30%',
          fats: '40%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Sunday_evening snack.jpg',
      },
      {
        meal: 'dinner',
        name: 'Stuffed Bell Peppers with Paneer and Vegetables',
        items: [
          'Bell Peppers',
          'Paneer',
          'Bok Choy',
          'Mushrooms',
          'Brown Rice',
        ],
        calories: '1000 kcal',
        macros: {
          carbs: '35%',
          fats: '35%',
          protein: '30%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Sunday_dinner.jpg',
      },
      {
        meal: 'morning snack',
        name: 'Oats and Chia Seeds Pudding',
        items: ['Oats', 'Chia Seeds', 'Greek Yogurt', 'Honey'],
        calories: '400 kcal',
        macros: {
          carbs: '35%',
          fats: 'sa',
          protein: '35%',
        },
        mealImage:
          'https://storage.googleapis.com/otm_client_meal_pictures/Sunday_morning snack.jpg',
      },
    ],
    date: 1,
  },
];

const WeeklySchedule = [
  {
    num: 4,
    text: 'workouts',
    taskDetail: ['3 done', '1 left'],
  },
  {
    num: 1,
    text: 'areobic session',
    taskDetail: ['completed'],
  },
  {
    num: 1,
    text: 'walk',
    taskDetail: ['not started'],
  },
  {
    num: 6,
    text: 'strechers',
    taskDetail: ['not started'],
  },
];

const FitnessPage = () => {
  const [showQuestion, setShowQuestion] = useState(true);
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

  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];

  const smallArr = [1, 2, 3, 4];

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

  const chargeArray = ['', '', '', '', '', '2', '3'];

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
    <div>
      <img
        src="assets/movement-frame.svg"
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />
      <div className="px-[16px]">
        <h2 className="mt-[70px] w-4/5 text-lg text-offwhite">
          Based on your answers, we’ve designed your personalised journey
        </h2>
        <div className="mt-[22px] rounded-xl bg-black-opacity-45 p-1 ">
          <div className="flex items-end gap-[10px] px-3">
            <img src="./assets/evolve.svg" />
            <h5 className="bg-browm-opacity-12 h-min rounded px-2 text-xs text-yellow">
              Level 2
            </h5>
          </div>
          <p className="mt-[10px] w-11/12 px-3 text-sm text-white-opacity-50">
            We'll focus on sustainable integration of fitness and wellbeing
            practices with minimal restrictions and effort!
          </p>
          <div className=" bg-black-opacity-40 flex flex-col items-center rounded-lg">
            <p className="text-[10px] text-white-opacity-50">
              ₹21,000 per person billed quarterly
            </p>
            <div className="mt-3 flex gap-3">
              <div>
                {smallArr.map(() => (
                  <div className="flex gap-1">
                    <img src="./assets/check-purpule.svg" />{' '}
                    <p className="text-[10px] text-offwhite">
                      {' '}
                      Lorem ipsum dolor
                    </p>
                  </div>
                ))}
              </div>
              <div>
                {smallArr.map(() => (
                  <div className="flex gap-1">
                    <img src="./assets/check-purpule.svg" />{' '}
                    <p className="text-[10px] text-offwhite">
                      {' '}
                      Lorem ipsum dolor
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <img className="rounded-tr-2xl" src="./assets/evolve-level.svg" />
        <button
          type="submit"
          style={{
            backgroundColor: '#F8F8F8',

            color: 'rgba(0,0,0)',
          }}
          className="relative  mt-10  flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg leading-8  text-black backdrop-blur-md"
        >
          Get Started Your journey
        </button>
      </div>

      {/* <div className="overflow-y-scroll px-4">
        <div className="mt-[77px] flex w-full items-end">
          <div className="flex-1">
            <h3 className=" font-sfpro text-[14px] text-offwhite">
              Good Morning {firstName}
            </h3>

            <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
              Nutrition
            </h2>

            <div className="font-sfpro text-[14px] text-white-opacity-50">
              Everyday is an opportunity to do some main character shit.
            </div>
          </div>

          <div className="flex flex-1 justify-end">
            <div className="flex h-[51px] max-w-[188px]  items-center justify-between rounded-xl bg-black-opacity-45 p-1">
              <span className=" pl-2  text-sm">Total workouts</span>
              <div
                className={`flex h-min w-[61px] items-center  justify-center rounded-lg text-center font-anton text-4xl  text-blue   `}
              >
                {homeStats && formatNumber(homeStats?.totalWorkoutsDone)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[24px] flex flex-col items-center gap-2">
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
                  Take our quick test and we will find the perfect plan for you.
                </p>
              </div>
            </div>
            <Link
              style={{ backgroundColor: 'rgba(31, 31, 31, 0.2)' }} // camelCase for backgroundColor
              className=" w-full rounded-lg p-2.5 text-center font-sfpro text-[18px] font-medium text-offwhite" // Replaced p-[10px] with Tailwind equivalent
            >
              Let's Go
            </Link>
          </div>
        </div>
        {showQuestion === false && (
          <>
            <div className="my-4 flex justify-center">
              {dummyCalender &&
                dummyCalender.map((item) => {
                  const slicedDay = item.day.substr(0, 3);
                  console.log(slicedDay);
                  return (
                    <div>
                      <CalendarTile
                        date={item.date}
                        day={slicedDay}
                        isSelected={item.day === dummyCalender.day}
                        selectedDay={dummyCalender.day}
                      />
                    </div>
                  );
                })}
            </div>

            <div className="flex gap-2">
              <div className="w-full rounded-xl bg-black-opacity-45 py-2">
                <div className="mx-3  flex justify-between">
                  <h4 className="text-sm text-offwhite">
                    Your weekly schedule
                  </h4>
                  <img src="./assets/maximize-schedule.svg" />
                </div>
                <div className="mt-5">
                  {WeeklySchedule.map((item, index) => (
                    <div
                      className={`flex h-[25px] justify-between   ${
                        WeeklySchedule.length - 1 !== index &&
                        'border-b-[1px] border-b-white-opacity-50 border-opacity-80'
                      }  px-2`}
                    >
                      <div className="flex items-center gap-1">
                        <h5 className="text-sm text-blue">{item.num}</h5>{' '}
                        <h5 className="text-[10px] text-offwhite">
                          {item.text}
                        </h5>
                      </div>
                      <div className="flex  items-center ">
                        {' '}
                        {item.taskDetail.map((data) => (
                          <div className="bg-green-opacity-12 h-[15px] rounded-[3px] px-1 text-[10px] text-green">
                            {data}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-black-opacity-45 px-4 py-2">
                <div className="flex">
                  <img src="./assets/yellow-bg-power.svg" />
                  <h4 className="text-sm text-yellow ">Level 2</h4>
                  <img src="./assets/level-question.svg" className="ml-1" />
                </div>
                <div className="my-2 flex flex-col items-center">
                  {chargeArray.map((item, index) => {
                    console.log(item);

                    return (
                      <div
                        style={{
                          boxShadow:
                            item !== '' &&
                            '0 2px 4px   rgba(245 ,197, 99 , 0.2), 0 -4px 6px rgba(245 ,197, 99 , 0.2), 4px 0 6px rgba(221, 249, 136, 0.2), -4px 0 6px rgba(221, 249, 136, 0.2)',
                        }}
                        className={`mb-[1px]    ${
                          item !== ''
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

        <div className="my-4 flex w-full items-center justify-between">
          <h3>Today's Plan</h3>

          <div className=" flex   " onClick={() => setShowActivity(true)}>
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
        {showQuestion === false && (
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
                    <h2 className="text-xl  ">Active Recovery</h2>

                    <div className="mt-1 flex gap-3">
                      <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                        <img
                          src="/assets/yellowTimer.svg"
                          className="mr-[2px]"
                        />
                        {homeStats?.hyperWorkoutParams.duration} mins
                      </h2>
                      <h2 className=" flex rounded-md border border-floYellow bg-gray px-1  font-sfpro text-[12px] text-floYellow">
                        <img
                          src="/assets/yellow-power.svg"
                          className="mr-[2px]"
                        />
                        {homeStats?.hyperWorkoutParams.calories} cal
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
                    <h2 className="text-xl  ">Strength Training</h2>

                    <div className="mt-1 flex gap-3">
                      <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                        <img
                          src="/assets/yellowTimer.svg"
                          className="mr-[2px]"
                        />
                        {homeStats?.hyperWorkoutParams.duration} mins
                      </h2>
                      <h2 className=" flex rounded-md border border-floYellow bg-gray px-1  font-sfpro text-[12px] text-floYellow">
                        <img
                          src="/assets/yellow-power.svg"
                          className="mr-[2px]"
                        />
                        {homeStats?.hyperWorkoutParams.calories} cal
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
        )}
      </div> */}
    </div>
  );
};

export default FitnessPage;
