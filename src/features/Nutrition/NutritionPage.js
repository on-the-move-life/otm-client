import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../../components';
import { capitalizeFirstLetter } from '../../utils';
import {
  getCurrentHourInTimezone,
  getDeviceTimezone,
  getGreeting,
} from '../Fitness/utils';
import { axiosClient } from './apiClient';
import MealPlanPage from './MealPlanner/MealPlanPage';
import * as Actions from './MealPlanner/Redux/actions';

const NutritionPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [mealLoading, setMealLoading] = useState(false);
  const [mealData, setMealData] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [previousSelectedDate, setPreviousSelectedDate] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);

  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];
  const userProfilePicture = JSON.parse(localStorage.getItem('profilePicture'));
  const caiptalInitial = capitalizeFirstLetter(fullName);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timezone = getDeviceTimezone();
    const currentHour = getCurrentHourInTimezone(timezone);
    const greetingMessage = getGreeting(currentHour);
    setGreeting(greetingMessage);
  }, []);

  const code = JSON.parse(localStorage.getItem('user'))['code'];

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

  useEffect(() => {
    if (!userProfilePicture && userProfilePicture !== '') {
      getMemberData(code);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    // if the meal is already planned then set the section name to 'Weekly Plan'
    const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
    axiosClient
      .get(`/meal-plan?memberCode=${memberCode}`)
      .then((res) => {
        console.log('response /meal-plan : ', res.data);
        if (res?.data?.success === true && res?.data?.data.length !== 0) {
          dispatch(Actions.updateWeeklyPlan(res?.data?.data));
          dispatch(Actions.updateSectionName('Weekly Plan'));
          setWeeklyPlan('Weekly Plan');
        } else {
          dispatch(Actions.updateSectionName('Get Started'));
        }
      })
      .catch((err) => {
        // else start with the 'Get Started'
        dispatch(Actions.updateSectionName('Get Started'));
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setMealLoading(true);
    // if the meal is already planned then set the section name to 'Weekly Plan'
    if (selectedDate && selectedDate !== previousSelectedDate) {
      const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
      axiosClient
        .get(`/meals?memberCode=${memberCode}&date=${selectedDate}`)
        .then((res) => {
          console.log('response /meal-plan : ', res.data);
          if (res?.data?.success === true) {
            setMealData(res.data.data);
            setPreviousSelectedDate(selectedDate);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setMealLoading(false);
  }, [selectedDate, previousSelectedDate]);

  return (
    <>
      {mealLoading === true || loading === true ? (
        <Loader />
      ) : (
        <div className="relative h-screen overflow-y-scroll bg-[#161513]">
          <img
            className="absolute left-0 top-0 z-0 h-screen w-full"
            src="/assets/nutrition-bg.svg"
            alt="img"
            style={{
              height: '-webkit-fill-available',
              filter: 'brightness(0.5)',
            }}
          />
          <div className="relative z-20 flex w-screen  flex-col   px-4 pb-[78px] ">
            <div className="mt-[77px] flex justify-between">
              <div>
                <h3 className="font-sfpro text-[14px] text-offwhite">
                  {greeting} {firstName}
                </h3>

                <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
                  Nutrition
                </h2>

                <div className="mr-[20px] font-sfpro text-[14px] text-white-opacity-50">
                  Everyday is an opportunity to do some main character shit.
                </div>
              </div>
              <div className="h-[53px] min-w-[53px]">
                {' '}
                {userProfilePicture ? (
                  <img
                    loading="lazy"
                    src={userProfilePicture}
                    className="h-[53px] w-[53px] rounded-xl object-cover"
                    alt="img"
                  />
                ) : (
                  <div className="flex h-[53px] w-[53px] items-center justify-center rounded-xl bg-black-opacity-45 text-3xl text-white">
                    {caiptalInitial}
                  </div>
                )}
              </div>
            </div>
            {/* {weeklyPlan === null ? (
              <div className="mt-[24px] flex flex-col items-center gap-2">
                <div
                  style={{
                    background:
                      'radial-gradient(circle at top left, #97EBAD 0%, #439258 60%)',
                  }}
                  className="flex w-full flex-col items-center justify-between rounded-xl px-[8px] pb-[8px]"
                >
                  <div className="flex">
                    <img
                      src="/assets/arrow-board.svg"
                      className="h-[150px] w-[150px]"
                      alt="img"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="  font-sfpro text-[20px] font-medium text-offwhite">
                        Find Your Plan
                      </h3>
                      <p className="relative z-10 mt-2 font-sfpro  text-[14px] font-medium text-white-opacity-50">
                        Take our quick test and we will find the perfect plan
                        for you
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/meal-planner"
                    style={{ backgroundColor: 'rgba(31, 31, 31, 0.2)' }} // camelCase for backgroundColor
                    className=" w-full rounded-lg p-2.5 text-center font-sfpro text-[18px] font-medium text-offwhite" // Replaced p-[10px] with Tailwind equivalent
                  >
                    Let's Go
                  </Link>
                </div>
                <Link
                  to="/MealUpload"
                  className="transparent-frame relative  flex min-h-[78px] w-full rounded-lg"
                >
                  <div className="my-2 ml-4 ">
                    <div className="flex gap-2">
                      <img src="/assets/camera-logo.svg" alt="img" />
                      <h3 className="text-offwhite">Meal Analysis</h3>
                    </div>
                    <div className="mt-1 max-w-[250px] text-[14px]  leading-[16px] text-lightGray">
                      Let the power of AI breakdown your meal
                      <div className="mt-2 w-min rounded-sm border border-lightGray px-2 text-center text-[10px]">
                        BETA
                      </div>
                    </div>
                  </div>

                  <div>
                    <img
                      className="absolute right-0 "
                      src="/assets/spiral.svg"
                      alt="img"
                    />
                    <img
                      className="absolute right-[16px]   "
                      src="/assets/meal-photo.png"
                      alt="img"
                    />
                  </div>
                </Link>
              </div>
              
            ) : ( */}
            {weeklyPlan && (
              <>
                <MealPlanPage
                  mealData={mealData}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NutritionPage;
