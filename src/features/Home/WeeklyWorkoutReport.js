import { last } from 'lodash';
import React, { useEffect, useState } from 'react'

function WeeklyWorkoutReport({ suggestedWorkoutPerWeek, lastEightWeeksWorkout }) {
    const [currentScore, setCurrentScore] = useState(0);

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
                {lastEightWeeksWorkout ? <div className='wwc-chart-container flex flex-row justify-center items-center gap-[6px]'>
                    {
                            [...Array(8).keys()]?.map((item, index) => {
                                const progressCount = lastEightWeeksWorkout[index] !== undefined ? lastEightWeeksWorkout[index]?.count : 0
                                return (
                                    <Bar progress={progressCount} key={Math.random() * 1000} />
                                )
                            })
                    }
                </div> : <div className='wwc-score wwc-chart-container flex flex-row justify-center items-center gap-[6px]'>-</div>}
            </section>
        </div>
    )
}

export default WeeklyWorkoutReport