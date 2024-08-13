import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NutritionPage = () => {
  return (
    <div className="relative h-full bg-[#161513]">
      <img
        className="absolute top-0 left-0 z-0 w-full "
        src="/assets/nutrition-bg.svg"
      />
      <div className="relative z-20 flex w-screen grow flex-col overflow-y-scroll px-4 pb-[78px] ">
        <h3 className="mt-[77px] font-sfpro text-[14px] text-offwhite">
          Good Morning Rishi
        </h3>

        <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
          Nutrition
        </h2>

        <div className="text-white-opacity-50 font-sfpro text-[14px]">
          Everyday is an opportunity to do some main character shit.
        </div>
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
                <p className="text-white-opacity-50 relative z-10 mt-2  font-sfpro text-[14px] font-medium">
                  Take our quick text and we will find the perfect plan for you
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
              <img className="absolute right-0 " src="/assets/spiral.svg" />
              <img
                className="absolute right-[16px]   "
                src="/assets/meal-photo.png"
              />
            </div>
          </Link>

          <Link
            to="/meal-planner"
            className="relative flex min-h-[78px] rounded-lg bg-mediumGray"
          >
            <div className="my-2 ml-4 ">
              <div className="flex gap-2">
                <img src="/assets/meal-logo.svg" />
                <h3 className="text-offwhite">Meal Planner</h3>
              </div>
              <div className="mt-1 max-w-[280px] text-[14px]  leading-[16px] text-lightGray">
                Your Weekly Meal Plan according to your goals and preferences
                <div className="mt-2 w-min rounded-sm border border-lightGray px-2 text-center text-[10px]">
                  BETA
                </div>
              </div>
            </div>
          </Link>

          {/* <Link
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
