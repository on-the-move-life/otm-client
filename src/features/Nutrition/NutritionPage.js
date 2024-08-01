import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TimelineHeading } from '../Timeline/StyledComponents';

const NutritionPage = () => {
  return (
    <div>
      <img className="absolute right-0 -z-20 " src="/assets/main-frame.svg" />
      <img
        className="absolute right-[85px] top-14 -z-10 "
        src="/assets/nutrition-logo.svg"
      />
      <div className="flex w-screen grow flex-col overflow-y-scroll px-4 pb-[78px] ">
        <div className="mt-[76px]">
          <TimelineHeading>Nutrition</TimelineHeading>
        </div>
        <div className="mt-[90px] flex flex-col gap-2">
          <Link
            to="/MealUpload"
            className="relative  flex h-[78px] rounded-lg bg-mediumGray"
          >
            <div className="my-2 ml-4 ">
              <div className="flex gap-2">
                <img src="/assets/camera-logo.svg" />
                <h3 className="text-offwhite">Meal Analysis</h3>
              </div>
              <div className="mt-1 w-[250px] text-[14px]  leading-[16px] text-lightGray">
                Let the power of AI breakdown your meal
              </div>
            </div>

            <div>
              <img className="absolute right-0 " src="/assets/spiral.svg" />
              <img
                className="absolute right-[16px]   "
                src="/assets/meal-photo.png"
              />
            </div>
          </Link>

          {/* <Link className="relative flex h-[78px] rounded-lg bg-mediumGray">
            <div className="my-2 ml-4 ">
              <div className="flex gap-2">
                <img src="/assets/meal-logo.svg" />
                <h3 className="text-offwhite">Meal Planner</h3>
              </div>
              <div className="mt-1 w-[250px] text-[14px]  leading-[16px] text-lightGray">
                This is a one line description of the feature
              </div>
            </div>
          </Link>

          <Link
            to="/MealUpload"
            className="relative flex h-[78px] rounded-lg bg-mediumGray"
          >
            <div className="my-2 ml-4 ">
              <div className="flex gap-2">
                <img src="/assets/supplement.svg" />
                <h3 className="text-offwhite">Supplements</h3>
              </div>
              <div className="mt-1 w-[250px] text-[14px] leading-[16px] text-lightGray">
                This is a one line description of the feature
              </div>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
