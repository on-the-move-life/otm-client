import React from 'react';
import FitnessGraph from './graphs/FitnessGraph';
import info from './info.json';

const FitnessProgress = () => {
  return (
    <div>
      <div className="mt-16 px-4 sm:px-10">
        <h1 className="purple-gradient font-sf-pro mt-2 text-left text-[22.33px] sm:mt-8 sm:text-center sm:text-2xl">
          Fitness Score Progress
        </h1>
      </div>
      <div className="hide-scrollbar max-w-screen-[400px] mx-auto mt-10 flex flex-row overflow-hidden overflow-x-auto sm:mt-14 sm:max-w-screen-lg">
        <FitnessGraph />
      </div>
      <div>
        <p className="font-sf-pro mt-8 px-4 text-left text-sm sm:px-32 sm:text-center sm:text-base">
          {info.renewalReport.fitnessScore}
        </p>
      </div>
    </div>
  );
};

export default FitnessProgress;
