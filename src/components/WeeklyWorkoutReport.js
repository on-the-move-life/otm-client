import React, { useEffect, useState } from 'react'

function WeeklyWorkoutReport({currentScore, suggestedWorkoutPerWeek, lastEightWeeksWorkout }) {

    const Bar = ({ progress }) => {
        const [green, red, yellow, gray] = ['#5ECC7B', '#FA5757', '#F5C563', '#323232'] // colors of the bar
        const [height, setHeight] = useState(0);
        const [color, setColor] = useState(gray);

        useEffect(() => {
            const calculatedHeight = (progress / 7) * 47; // progess is calculated out of 7

            setHeight(prev => calculatedHeight.toString());
            if (progress === 1) {
                setColor(prev => red);
            }
            else if (progress >= 2 && progress <= 3) {
                setColor(prev => yellow);
            }
            else {
                setColor(prev => green);
            }

        }, [progress, color, height, green, red, yellow, gray])

        const barStyles = {
            height: `${height}px`,
            backgroundColor: color,
        };

        return (
            <div className='h-[47px] w-[6px] rounded-xl bg-[#323232]'>
                <div className='w-full h-full bg-transparent flex flex-col justify-end items-center'>
                    <div style={barStyles} className='w-full rounded-xl'></div>
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
                    <p className='wwc-suggestion-text'>suggested workout per week <span className='wwc-suggested-count'>{suggestedWorkoutPerWeek}</span></p>
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