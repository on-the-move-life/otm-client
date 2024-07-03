import React from 'react';
import { motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { CiDumbbell } from "react-icons/ci";

const WeightChoosingGuide = ({ closeWeightGuide }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col bg-[#1C1C1E] items-center relative">
        <button 
          onClick={closeWeightGuide} 
          className="absolute top-4 right-4 text-[#B1B1B1] bg-black rounded-full p-2 z-10"
        >
          <HiX size={24} />
        </button>

        <div className="flex flex-col p-4 w-full sm:w-[900px]">  
          <div className='flex justify-center sm:w-[900px]'>
            <span className='flex items-center justify-center gap-1 text-[#929292]'>
              <span className='text-[11px]'><CiDumbbell /></span>
              <span className='text-[9.33px]'>Weight Choosing Guide</span>
            </span>
          </div>
          <div className='mt-2 w-full items-start flex flex-col'>
            <h2 className="text-xl font-semibold text-white">Weight Choosing Guide</h2>
            <h4 className='text-[14px] text-[#B1B1B1] py-2'>Find the right weight for your workout</h4>
            <h4 className='text-[14px] text-[#B1B1B1]'>Aim for a <span className='text-[#5ECC7B]'>70-80% </span>effort level, meaning you shouldn't feel completely exhausted after finishing the reps.</h4>
          </div>
        </div>
        
        <div className='h-auto w-[360px] sm:w-[900px] mt-4'>
          <div className='flex flex-col space-y-4'>
            <div className='w-full h-auto bg-black rounded-lg sm:px-10 sm:py-10 px-4 py-4'>
              <ul className='flex flex-col sm:gap-4 gap-2 sm:mt-2 mt-0'>
                <li className='flex items-start'>
                  <div className='w-2 h-2 rounded-full bg-[#7E87EF] sm:mt-[8px] mt-[6px] mr-2 flex-shrink-0'></div>
                  <span className='text-[#7E87EF] sm:text-[16px] text-[13px]'>Select a weight that challenges you to complete the mentioned repetitions (reps) with good form.</span>
                </li>
                <li className='flex items-start'>
                  <div className='w-2 h-2 rounded-full bg-[#7E87EF] sm:mt-[8px] mt-[6px] mr-2 flex-shrink-0'></div>
                  <span className='text-[#7E87EF] sm:text-[16px] text-[13px]'>It should feel manageable at the beginning but increasingly difficult by the second half of the set.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className='relative h-auto w-[360px] sm:w-[450px] mt-4'>
          <img 
            src={`${process.env.PUBLIC_URL}/assets/weight-choosing-guide.png`} 
            alt="Weight-Guide-image" 
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 text-white text-center px-4">
            <p className="text-sm sm:text-base text-left">
              To ensure effective workouts while maintaining good form and avoiding injury.
            </p>
          </div>
        </div>
        
        <div className="p-4 fixed bottom-5 left-0 right-0">
          <button
            onClick={closeWeightGuide}
            className="sm:w-full w-[360px] py-2 px-4 bg-[#7E87EF] text-black font-semibold rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WeightChoosingGuide;