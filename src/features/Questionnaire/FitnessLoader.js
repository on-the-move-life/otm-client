import React from 'react'
import { motion } from 'framer-motion';

function FitnessLoader() {
    return (
        <div className='fixed min-h-screen flex flex-col justify-between px-6 py-9 top-0 left-0 z-50 bg-black bg-no-repeat bg-auto bg-center' style={{ backgroundImage: `url('/assets/fitness_score_gradient.svg')` }}>
            <div className='w-full flex flex-col justify-start items-start gap-7'>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='w-full flex flex-col gap-4'>
                        <h1 className='text-[#848ce9] text-[32px]' style={{ lineHeight: '40px', fontWeight: 500 }}>Ready, Set, Go!!</h1>
                        <h3 className='text-[#b1b1b1] text-[24px]' style={{ lineHeight: '38px', fontWeight: 500 }}>Find Your Fitness Score</h3>
                    </div>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className='text-[#545454] text-[18px]' style={{ fontWeight: 400, lineHeight: '25px' }}>Hang tight for a moment as we create a personalized snapshot based on your choices.</motion.p>
                <div className="w-full h-fit flex flex-row justify-center items-center relative" >
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
                </div>
            </div>
        </div>
    )
}

export default FitnessLoader;