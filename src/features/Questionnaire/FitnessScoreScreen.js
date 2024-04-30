import React from 'react'
import { Button } from '../../components';
import { motion } from 'framer-motion';

function FitnessScorePage({ type, score, submitResponse }) {
    return (
        <div className='fixed min-h-screen flex flex-col justify-between px-6 py-9 top-0 left-0 z-50 bg-black bg-no-repeat bg-auto bg-center' style={{ backgroundImage: `url('/assets/fitness_score_gradient.svg')` }}>
            <div className='w-full flex flex-col justify-start items-start gap-7'>
                <div className='w-full flex flex-col gap-4'>
                    <h1 className='text-[#848ce9] text-[32px]' style={{ lineHeight: '40px', fontWeight: 500 }}>Ready, Set, Go!!</h1>
                    <h3 className='text-[#b1b1b1] text-[24px]' style={{ lineHeight: '38px', fontWeight: 500 }}>Find Your Fitness Score</h3>
                </div>
                <p className='text-[#545454] text-[18px]' style={{ fontWeight: 400, lineHeight: '25px' }}>Hang tight for a moment as we create a personalized snapshot based on your choices.</p>
                <div className="w-full h-fit flex flex-row justify-center items-center" >
                    {
                        (type === "fitnessScore" && score !== undefined) ? (
                            <div className='flex flex-col justify-center items-center relative' style={{top: "5rem"}}>
                                <h3 className='text-[#7e87ef] text-[90px] uppercase' style={{ fontFamily: 'Anton', fontWeight: 400, lineHeight: 'normal' }}>6.7</h3>
                                <p className='text-[10px] text-[#8c8c8c] uppercase' style={{ fontWeight: 510, letterSpacing: '3px', }}>Your fitness score is 6.7</p>
                            </div>
                        ) :
                            (
                                <motion.img
                                    src={'/assets/fitness_score_loader.svg'}
                                    alt="loader"
                                    animate={{ rotate: 360 }} // Rotate the image 360 degrees
                                    transition={{
                                        duration: 2, // Set the duration of the animation to 2 seconds
                                        repeat: Infinity, // Make the animation repeat indefinitely
                                        ease: "linear", // Set the easing function to linear
                                    }}
                                    className='relative'
                                    style={{ top: "5rem" }}
                                />
                            )
                    }
                </div>
            </div>
            {type === "fitnessScore" &&
                <Button
                    text={"Finish"}
                    type="lifestyle"
                    action={() => {
                        submitResponse();
                    }}
                />}
        </div>
    )
}

export default FitnessScorePage