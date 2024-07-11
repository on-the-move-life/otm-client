import React from 'react';
import WorkoutGraph from './graphs/WorkoutGraph';
const WorkoutConsitency = ({ apiData }) => {
  return (
    <div>
      <div className="px-4 mt-4 sm:mt-10 sm:px-10">
        <h2 className="font-sf-pro text-left text-xs tracking-[5px] text-[#B1B1B1] sm:text-center sm:text-lg">
          PERFORMACE STATS
        </h2>
        <h1 className="purple-gradient font-sf-pro mt-2 text-left text-[22.33px] sm:mt-8 sm:text-center sm:text-2xl">
          Workout Consistency Progress
        </h1>
      </div>
      <div className="">
        <WorkoutGraph apiData={apiData} />
      </div>
      <div className="mt-8 sm:px-10">
        <p className="px-4 text-sm text-left font-sf-pro sm:px-32 sm:text-center sm:text-base">
          {apiData?.data?.workoutConsistencySummary}
        </p>
      </div>
    </div>
  );
};

export default WorkoutConsitency;
