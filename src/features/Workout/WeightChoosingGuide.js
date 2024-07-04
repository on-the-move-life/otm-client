import React from 'react';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { CiDumbbell } from 'react-icons/ci';

const WeightChoosingGuide = ({ closeWeightGuide }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#141414]"
    >
      <div className="relative flex min-h-screen flex-col items-center  bg-[#1C1C1E] p-4">
        {/* <div className="flex w-full flex-col p-4 sm:w-[900px] border border-yellow"> */}
        <div className="flex w-full items-center justify-between  sm:w-[900px]">
          <div className="mx-auto my-0 flex h-[42px] items-center gap-1 text-[#929292]">
            <span className="text-[11px]">
              <CiDumbbell />
            </span>
            <span className="text-[9.33px]">Weight Choosing Guide</span>
          </div>
          <div className="absolute right-4 top-4 ">
            <button
              onClick={closeWeightGuide}
              className="ml-2 rounded-full border border-yellow bg-black p-2 text-[#B1B1B1]"
            >
              <HiX size={24} />
            </button>
          </div>
        </div>
        <div className="mt-2 flex w-full flex-col items-start ">
          <h2 className="text-xl font-semibold text-white">
            Weight Choosing Guide
          </h2>
          <h4 className="py-2 text-[14px] text-[#B1B1B1]">
            Find the right weight for your workout
          </h4>
          <h4 className="text-[14px] text-[#B1B1B1]">
            Aim for a <span className="text-[#5ECC7B]">70-80% </span>effort
            level, meaning you shouldn't feel completely exhausted after
            finishing the reps.
          </h4>
        </div>
        {/* </div> */}

        <div className="mt-4 h-auto w-[360px] sm:w-[900px]">
          <div className="flex flex-col space-y-4">
            <div className="h-auto w-full rounded-lg bg-black px-4 py-4 sm:px-10 sm:py-10">
              <ul className="mt-0 flex flex-col gap-2 sm:mt-2 sm:gap-4">
                <li className="flex items-start">
                  <div className="mr-2 mt-[6px] h-2 w-2 flex-shrink-0 rounded-full bg-[#7E87EF] sm:mt-[8px]"></div>
                  <span className="text-[13px] text-[#7E87EF] sm:text-[16px]">
                    Select a weight that challenges you to complete the
                    mentioned repetitions (reps) with good form.
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-[6px] h-2 w-2 flex-shrink-0 rounded-full bg-[#7E87EF] sm:mt-[8px]"></div>
                  <span className="text-[13px] text-[#7E87EF] sm:text-[16px]">
                    It should feel manageable at the beginning but increasingly
                    difficult by the second half of the set.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mt-4 h-auto w-[360px] sm:w-[450px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/weight-choosing-guide.png`}
            alt="Weight-Guide-image"
            className="h-auto w-full rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 px-4 text-center text-white">
            <p className="text-left text-sm sm:text-base">
              Maintaining proper form is essential for effective workouts and
              injury prevention
            </p>
          </div>
        </div>

        <div className="fixed bottom-5 left-0 right-0 p-4">
          <button
            onClick={closeWeightGuide}
            className="w-[360px] rounded-lg bg-[#7E87EF] px-4 py-2 font-semibold text-black sm:w-full"
          >
            Back
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WeightChoosingGuide;
