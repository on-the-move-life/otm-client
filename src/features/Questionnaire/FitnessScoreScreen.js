import React, { useState, useEffect } from 'react'
import { Button } from '../../components';
import { motion } from 'framer-motion';
import { axiosClient } from '../LifestyleQuiz';
import { useNavigate } from 'react-router-dom';
import { Error } from '../../components';

function FitnessScorePage() {
    const [score, setScore] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [pageError, setPageError] = useState(false);
    const navigate = useNavigate();

    function getFitnessScore(email) {
        setPageLoading(true);
        axiosClient.get(`/signup/snapshot?email=${email}`)
            .then(res => {
                console.log(res);
                setScore(res?.data?.fitnessScore);
            })
            .catch(err => {
                setPageError(true);
                console.log(err)
            })
            .finally(() => {
                setPageLoading(false);
            })
    }
    useEffect(() => {
        try {
            const email = JSON.parse(localStorage.getItem('user'))['email'];
            getFitnessScore(email);
        } catch (err) {
            console.log("error in the useEffect block : ",err);
        }
    }, [])
    return (
        <div className='fixed min-h-screen flex flex-col justify-between px-6 py-9 top-0 left-0 z-50 bg-black bg-no-repeat bg-auto bg-center' style={{ backgroundImage: `url('/assets/fitness_score_gradient.svg')` }}>
            {pageError && !pageLoading && <Error>Some Error Occured</Error>}
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
                    {
                        (!pageLoading && score !== null) ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className='flex flex-col justify-center items-center relative' style={{ top: "5rem" }}>
                                <h3 className='text-[#7e87ef] text-[90px] uppercase' style={{ fontFamily: 'Anton', fontWeight: 400, lineHeight: 'normal' }}>{score}</h3>
                                <p className='text-[10px] text-[#8c8c8c] uppercase' style={{ fontWeight: 510, letterSpacing: '3px', }}>Your fitness score is {score}</p>
                            </motion.div>
                        ):
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
            {!pageLoading && score !== null &&
                <motion.button
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='mt-10'
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <Button text={"Go to my Dashboard"} type="lifestyle" />
                </motion.button>}
        </div>
    )
}

export default FitnessScorePage