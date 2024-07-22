import React, { useEffect, useState } from 'react'

function WeeklyWorkoutReport({ consistencyTrend ,suggestedWorkoutPerWeek, lastEightWeeksWorkout }) {
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
        const [basicgreen, intermediategreen, advancedgreen, red, yellow, gray] = ['#119832', '#29C344', '#7FE08A', '#FA5757', '#F5C563', '#323232'] // colors of the bar
        const [height, setHeight] = useState(0);
        const [color, setColor] = useState(gray);

        useEffect(() => {
            if (progress >= suggestedWorkoutPerWeek && suggestedWorkoutPerWeek !== 0) {
                // if workout per week is >= 4 the bar is filled completely
                setHeight(prev => String(47));
            }
            else {
                // if the workout < 4 then the bar is filled accordingly (out of <suggestedWorkoutPerWeek> scale)
                const calculatedHeight = (progress / suggestedWorkoutPerWeek) * 47;
                setHeight(prev => calculatedHeight.toString());
            }
            if (progress >= 3 * suggestedWorkoutPerWeek) {
                setColor(prev => advancedgreen);
            }
            else if (progress >= 2 * suggestedWorkoutPerWeek) {
                setColor(prev => intermediategreen);
            }
            else if (progress >= suggestedWorkoutPerWeek) {
                setColor(prev => basicgreen);
            }
            else if (progress >= suggestedWorkoutPerWeek / 2 && progress < suggestedWorkoutPerWeek) {
                setColor(prev => yellow);
            }
            else {
                setColor(prev => red);
            }
        }, [progress, color, height, basicgreen, intermediategreen, advancedgreen, red, yellow, gray])

        const barStyles = {
            height: `${height}px`,
            backgroundColor: color,
            '--calculated-height': `${height}px`,
        };

        return (
            <div className='h-[47px] w-[6px] rounded-xl bg-[#323232] relative'>
            <div className='w-full h-full bg-transparent flex flex-col justify-end items-center'>
                <div style={barStyles} className='w-full rounded-xl barStyle'></div>
            </div>
            {isFirstBar && (
                <div className="absolute mt-1 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[8px] w-[4px] h-[4px] bg-white rounded-full"></div>
            )}
        </div>
        )
    }
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
    }
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
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="weekly-workout-consistency">
            <section className='w-full flex flex-row justify-between items-center'>
                <div className='weekly-workout-consistency-heading'>weekly workout consistency</div>
                <div className='wwc-weeks'>last 8 weeks</div>
            </section>
            <section className='w-full flex flex-row justify-between items-center'>
                <div className='w-fit flex flex-col justify-center items-center gap-1'>
                <div className='flex items-center'>
                        <div className='wwc-score'>{currentScore}</div>
                        <div className={`ml-2 sm:text-[10px] text-[8px] ${getTrendBorderColor(consistencyTrend)} border-[1px] sm:px-[6px] sm:py-[3px] px-[6px] py-[3px] rounded-[6px] ${getTrendTextColor(consistencyTrend)}`}>
                            {capitalizeFirstLetter(consistencyTrend)}
                        </div>
                    </div>
                    <p className='wwc-suggestion-text'>Suggested workouts per week <span className='wwc-suggested-count'>{suggestedWorkoutPerWeek}</span></p>
                </div>
                {lastEightWeeksWorkout ? <div className='wwc-chart-container flex flex-row justify-center items-center gap-[6px]'>
                    {
                            [...Array(8).keys()]?.map((item, index) => {
                                const progressCount = lastEightWeeksWorkout[index] !== undefined ? lastEightWeeksWorkout[index]?.count : 0
                                return (
                                    <Bar progress={progressCount} key={Math.random() * 1000} isFirstBar={index === 0}  />
                                )
                            })
                    }
                </div> : <div className='wwc-score wwc-chart-container flex flex-row justify-center items-center gap-[6px]'>-</div>}
            </section>
        </div>
    )
}

export default WeeklyWorkoutReport