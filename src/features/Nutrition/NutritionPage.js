import { useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../components';
import { axiosClient } from './apiClient';
import MainPage from './MealPlanner/MainPage';
import MealPlanPage from './MealPlanner/MealPlanPage';
import * as Actions from './MealPlanner/Redux/actions';
import * as Selectors from './MealPlanner/Redux/selectors';

const NutritionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});
  const [loading, setLoading] = useState(true);
  const [mealLoading, setMealLoading] = useState(false);
  const [mealData, setMealData] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [previousSelectedDate, setPreviousSelectedDate] = useState(null);
  const [pageError, setPageError] = useState(false);
  const [loadingWeeklyPlan, setLoadingWeeklyPlan] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState(null);

  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];

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
            className="absolute top-0 left-0 z-0 w-full h-screen"
            src="/assets/nutrition-bg.svg"
            style={{
              height: '-webkit-fill-available',
              filter: 'brightness(0.5)',
            }}
          />
          <div className="relative z-20 flex w-screen  flex-col  bg-transparent px-4 pb-[78px] ">
            <h3 className="mt-[77px] font-sfpro text-[14px] text-offwhite">
              Good Morning {firstName}
            </h3>

            <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
              Nutrition
            </h2>

            <div className="font-sfpro text-[14px] text-white-opacity-50">
              Everyday is an opportunity to do some main character shit.
            </div>
            {weeklyPlan === null ? (
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
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="  font-sfpro text-[20px] font-medium text-offwhite">
                        Find Your Plan
                      </h3>
                      <p className="relative z-10 mt-2 font-sfpro  text-[14px] font-medium text-white-opacity-50">
                        Take our quick text and we will find the perfect plan
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
                      <img src="/assets/camera-logo.svg" />
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
                    />
                    <img
                      className="absolute right-[16px]   "
                      src="/assets/meal-photo.png"
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <MealPlanPage
                  mealData={mealData}
                  setSelectedDate={setSelectedDate}
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
