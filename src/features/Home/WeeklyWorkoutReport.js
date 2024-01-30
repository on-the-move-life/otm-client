import React, { useEffect, useState } from 'react'

function WeeklyWorkoutReport({ suggestedWorkoutPerWeek, lastEightWeeksWorkout }) {
    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        // setting the average workout count
        let workoutCount = 0;
        lastEightWeeksWorkout.map((item, index) => {
            return workoutCount += item.count;
        })
        workoutCount = workoutCount / lastEightWeeksWorkout?.length;
        setCurrentScore(prevValue => workoutCount.toFixed(1));
    }, [lastEightWeeksWorkout])

    const Bar = ({ progress }) => {
        const [basicgreen, intermediategreen, advancedgreen, red, yellow, gray] = ['#119832', '#29C344', '#7FE08A', '#FA5757', '#F5C563', '#323232'] // colors of the bar
        const [height, setHeight] = useState(0);
        const [color, setColor] = useState(gray);

        useEffect(() => {
            if (progress >= suggestedWorkoutPerWeek) {
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
            <div className='h-[47px] w-[6px] rounded-xl bg-[#323232]'>
                <div className='w-full h-full bg-transparent flex flex-col justify-end items-center'>
                    <div style={barStyles} className='w-full rounded-xl barStyle'></div>
                </div>
            </div>
        )
    }
    return (
        <div className="weekly-workout-consistency">
            <section className='w-full flex flex-row justify-between items-center'>
                <div className='weekly-workout-consistency-heading'>weekly workout consistency</div>
                <div className='wwc-weeks'>last 8 weeks</div>
            </section>
            <section className='w-full flex flex-row justify-between items-center'>
                <div className='w-fit flex flex-col justify-center items-center gap-1'>
                    <div className='wwc-score'>{currentScore}</div>
                    <p className='wwc-suggestion-text'>Suggested workouts per week <span className='wwc-suggested-count'>{suggestedWorkoutPerWeek}</span></p>
                </div>
                <div className='wwc-chart-container flex flex-row justify-center items-center gap-[6px]'>
                    {
                        lastEightWeeksWorkout?.length === 0 ?
                            <div className='wwc-score'>-</div> :
                            lastEightWeeksWorkout?.map((progress, index) => {
                                return (
                                    <Bar progress={progress?.count} key={index} />
                                )
                            })
                    }
                </div>
            </section>
        </div>
    )
}

export default WeeklyWorkoutReport