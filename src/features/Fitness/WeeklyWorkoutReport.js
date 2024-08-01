import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Heading = styled.div`
  color: var(--off-white, #f8f8f8);

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16.71px;
`;

const ScoreDetail = styled.div`
  color: #929292;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14.32px;
`;

function WeeklyWorkoutReport({
  consistencyTrend,
  suggestedWorkoutPerWeek,
  lastEightWeeksWorkout,
}) {
  const [currentScore, setCurrentScore] = useState(0);

    //let test = 'improving';
    //let test1 = 'maintaining';
    //let test 2 = 'decreasing';
    useEffect(() => {
        // setting the average workout count
        try{
            let workoutCount = 0;
            lastEightWeeksWorkout.map((item, index) => {
                return workoutCount += item.count;
            })
            workoutCount = workoutCount / lastEightWeeksWorkout?.length;
            if(isNaN(workoutCount)){
                workoutCount = 0;
            }
            setCurrentScore(prevValue => workoutCount.toFixed(1));
        }
        catch(e){
            // expected exception when lastEightWeeksWorkout is empty array or undefined or null
            setCurrentScore(prevValue => Number(0).toFixed(1));
        }
    }, [lastEightWeeksWorkout])
   
    const Bar = ({ progress , isFirstBar }) => {
        const [basicgreen, intermediateGreen, advancedgreen, red, yellow, gray, purple] = ['#7FE08A','#29C344','#119832', '#FA5757', '#F5C563', '#323232','#7E87EF']
        const [height, setHeight] = useState(0);
        const [color, setColor] = useState(gray);
        console.log(progress);

        useEffect(() => {
            // Calculate height
            if (progress >= suggestedWorkoutPerWeek && suggestedWorkoutPerWeek !== 0) {
                setHeight(47);
            } else {
                const calculatedHeight = (progress / suggestedWorkoutPerWeek) * 47;
                setHeight(calculatedHeight);
            }
    
            // Determine color based on progress percentage

    
            if (progress > suggestedWorkoutPerWeek) {
                setColor(purple);
            }     
            else if (progress == suggestedWorkoutPerWeek) {
                setColor(advancedgreen); 
            }
            else if (progress==1) {
                setColor(red);
            }
            else {
                setColor(yellow);
            } 
        }, [progress, suggestedWorkoutPerWeek]);
    
        const barStyles = {
            height: `${height}px`,
            backgroundColor: color,
            '--calculated-height': `${height}px`,
        };

    return (
      <div className="relative h-[60px] w-[6px] rounded-xl bg-[#323232]">
        <div className="flex flex-col items-center justify-end w-full h-full bg-transparent">
          <div style={barStyles} className="w-full barStyle rounded-xl"></div>
        </div>
        {isFirstBar && (
          <div className="absolute bottom-0 left-1/2 mt-1 h-[4px] w-[4px] -translate-x-1/2 translate-y-[8px] transform rounded-full bg-white"></div>
        )}
      </div>
    );
  };
  const getTrendTextColor = (trend) => {
    switch (trend) {
      case 'decreasing':
        return 'text-[#FA5757]';
      case 'maintaining':
        return 'text-[#F5C563]';
      case 'improving':
        return 'text-[#7FE08A]';
      default:
        return 'text-gray-500';
    }
  };
  const getTrendBorderColor = (trend) => {
    switch (trend) {
      case 'decreasing':
        return 'border-[#FA5757]';
      case 'maintaining':
        return 'border-[#F5C563]';
      case 'improving':
        return 'border-[#7FE08A]';
      default:
        return 'border-gray-500';
    }
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="mt-3 weekly-workout-consistency">
      <div className="flex w-full h-full">
        <div className="flex flex-col justify-between">
          <section className="flex flex-row items-center justify-between w-full">
            <div className="flex gap-2">
              <img src="/assets/bar-graph-logo.svg" />
              <Heading>Weekly workout consistency</Heading>
            </div>
          </section>
          <section className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col ">
              <div className="flex items-end">
                {currentScore ? (
                  <div className="h-[45px] font-sfpro text-[32px] text-blue">
                    {currentScore}
                  </div>
                ) : (
                  <div className="h-[45px] font-sfpro text-[32px] text-blue">
                    -
                  </div>
                )}
                <div
                  className={`mb-2 ml-2 text-[8px] sm:text-[10px] ${getTrendBorderColor(
                    consistencyTrend,
                  )} h-min rounded-[6px] border-[1px] px-[6px] py-[3px] sm:px-[6px] sm:py-[3px] ${getTrendTextColor(
                    consistencyTrend,
                  )}`}
                >
                  {capitalizeFirstLetter(consistencyTrend)}
                </div>
                {lastEightWeeksWorkout ? <div className='wwc-chart-container flex flex-row justify-center items-center gap-[6px]'>
                {
  [...Array(8).keys()].reverse().map((item, index) => {
    const reversedIndex = 7 - index;
    const progressCount = lastEightWeeksWorkout[reversedIndex] !== undefined ? lastEightWeeksWorkout[reversedIndex]?.count : 0
    return (
      <Bar progress={progressCount} key={Math.random() * 1000} isFirstBar={index === 7}  />
    )
  })
}
                </div> : <div className='wwc-score wwc-chart-container flex flex-row justify-center items-center gap-[6px]'>-</div>}
            </section>
        </div>
        <div className="flex flex-col items-center justify-end grow">
          <div>
            {lastEightWeeksWorkout ? (
              <div className=" flex flex-row items-center justify-center gap-[6px]">
                {[...Array(8).keys()]?.map((item, index) => {
                  const progressCount =
                    lastEightWeeksWorkout[index] !== undefined
                      ? lastEightWeeksWorkout[index]?.count
                      : 0;
                  return (
                    <Bar
                      progress={progressCount}
                      key={Math.random() * 1000}
                      isFirstBar={index === 0}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="wwc-score wwc-chart-container flex flex-row items-center justify-center gap-[6px]">
                -
              </div>
            )}
          </div>
          <ScoreDetail> last 8 weeks</ScoreDetail>
        </div>
      </div>
    </div>
  );
}

export default WeeklyWorkoutReport;
