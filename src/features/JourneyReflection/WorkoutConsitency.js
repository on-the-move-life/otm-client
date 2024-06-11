import React from 'react';
import info from './info.json';
import WorkoutGraph from './graphs/WorkoutGraph';
const WorkoutConsitency = () => {
  return (
    <div>
      <div className="sm:mt-10 mt-4 px-4 sm:px-10">
        <h2 className="font-sf-pro text-left text-xs tracking-[5px] text-[#B1B1B1] sm:text-center sm:text-lg">
          PERFORMACE STATS
        </h2>
        <h1 className="purple-gradient font-sf-pro mt-2 text-left text-[22.33px] sm:mt-8 sm:text-center sm:text-2xl">
          Workout Consistency Progress
        </h1>
      </div>
      <div className="hide-scrollbar mt-10 flex items-center justify-center flex-row overflow-hidden overflow-x-auto sm:mt-14 w-full">
        <WorkoutGraph />
      </div>
      <div className="mt-8 sm:px-10">
        <p className="font-sf-pro px-4 text-left text-sm sm:px-32 sm:text-center sm:text-base">
          {info.renewalReport.workoutConsistencySummary}
        </p>
      </div>
    </div>
  );
};

export default WorkoutConsitency;
