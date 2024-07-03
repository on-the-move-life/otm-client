import React, { useEffect, useState } from 'react';

const WeeklyWorkoutJourney = ({ apiData }) => {
  const suggestedWorkoutPerWeek = 4;
  const lastEightWeeksWorkout = apiData?.data?.last8WeekConsistency;
  const Bar = ({ progress }) => {
    const [basicgreen, intermediategreen, advancedgreen, red, yellow, gray] = [
      '#119832',
      '#29C344',
      '#7FE08A',
      '#FA5757',
      '#F5C563',
      '#323232',
    ]; // colors of the bar
    const [height, setHeight] = useState(0);
    const [color, setColor] = useState(gray);

    useEffect(() => {
      if (
        progress >= suggestedWorkoutPerWeek &&
        suggestedWorkoutPerWeek !== 0
      ) {
        // if workout per week is >= 4 the bar is filled completely
        setHeight((prev) => String(90));
      } else {
        // if the workout < 4 then the bar is filled accordingly (out of <suggestedWorkoutPerWeek> scale)
        const calculatedHeight = (progress / suggestedWorkoutPerWeek) * 90;
        setHeight((prev) => calculatedHeight.toString());
      }
      if (progress >= 3 * suggestedWorkoutPerWeek) {
        setColor((prev) => advancedgreen);
      } else if (progress >= 2 * suggestedWorkoutPerWeek) {
        setColor((prev) => intermediategreen);
      } else if (progress >= suggestedWorkoutPerWeek) {
        setColor((prev) => basicgreen);
      } else if (
        progress >= suggestedWorkoutPerWeek / 2 &&
        progress < suggestedWorkoutPerWeek
      ) {
        setColor((prev) => yellow);
      } else {
        setColor((prev) => red);
      }
    }, [
      progress,
      color,
      height,
      basicgreen,
      intermediategreen,
      advancedgreen,
      red,
      yellow,
      gray,
    ]);

    const barStyles = {
      height: `${height}px`,
      backgroundColor: color,
      '--calculated-height': `${height}px`,
    };

    return (
      <div className="h-[90px] w-[50px] rounded-xl bg-[#323232] ">
        <div className="flex flex-col items-center justify-end w-full h-full bg-transparent">
          <div style={barStyles} className="w-full barStyle rounded-xl"></div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <p className="m-2 mb-8 text-center text-[12px] text-gray-500 sm:mb-6">
        last 8 weeks
      </p>
      {lastEightWeeksWorkout ? (
        <div className="wwc-chart-container flex flex-row items-center justify-center gap-[6px]">
          {[...Array(8).keys()]?.map((item, index) => {
            const progressCount =
              lastEightWeeksWorkout[index] !== undefined
                ? lastEightWeeksWorkout[index]?.count
                : 0;
            return <Bar progress={progressCount} key={Math.random() * 1000} />;
          })}
        </div>
      ) : (
        <div className="wwc-score wwc-chart-container flex flex-row items-center justify-center gap-[6px]">
          -
        </div>
      )}
    </div>
  );
};

export default WeeklyWorkoutJourney;
