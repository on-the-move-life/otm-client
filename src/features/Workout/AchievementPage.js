import React from 'react';
import Counter from '../../components/Counter';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import AnimatedComponent from '../../components/AnimatedComponent';

const AchievementPage = ({ setShowAchievemntsPage, totalWorkouts }) => {

  return (
    <AnimatedComponent>
      <div className="hero bg-no-repeat">
        <div
          onClick={() => setShowAchievemntsPage(false)}
          className="relative  flex h-full flex-col  items-center justify-around"
        >
          {/* heading */}
          <div className="">
            <img src="/assets/congratulations.svg" alt="" />

            <h3 className="-mt-4 text-center text-xs text-yellow">
              You completed another workout today
            </h3>
          </div>

          {/* total workout */}
          <div className=" text-center text-lightGray">
            <h4 className="text-[10px] uppercase  tracking-[3px]">
              total workouts
            </h4>
            <Counter currentValue={totalWorkouts} />
          </div>

          {/* achievements */}
          {/* <h3 className="text-md text-lightGray">Achievements Unlocked</h3> */}
          <div></div>
          <div className="flex items-center">
            <span className="mx-2">Continue</span> <HiOutlineChevronDoubleRight />
          </div>
          <div></div>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default AchievementPage;
