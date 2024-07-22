import React from 'react';
import FitnessCounter from './FitnessCounter';

const TotalWorkoutFitness = ({ apiData }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="px-4 mt-4 sm:mt-10 sm:px-10">
        <h2 className="font-sf-pro text-left text-[9px] tracking-[3px] text-[#B1B1B1] sm:text-center sm:text-lg">
          TOTAL WORKOUTS
        </h2>
      </div>

      <div>
        <p className="purple-white-gradient  px-4 text-left text-[80px] font-extrabold sm:px-32 sm:text-center sm:text-base">
          {}
          <FitnessCounter currentValue={apiData} />
        </p>
      </div>
    </div>
  );
};

export default TotalWorkoutFitness;
