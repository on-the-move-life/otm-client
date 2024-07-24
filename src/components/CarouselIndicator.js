import { progress } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react'

/**
 * numberOfSlides(number) -> number of carousel slides
 * currentIndex(number) -> 0 based index of the current slide
 * setCurentIndex(function) -> function passed from the parent component to set the index, used for automatic upadate of index
 * isHolding(bool) -> used to detect if the user is holding the slide
 * countDownTimer(time in seconds) -> used for auto-play
 */
function CarouselIndicator({ numberOfSlides, currentIndex, setCurrentIndex, isHolding, countDownTimer }) {
    // progress percentage
    const [progress, setProgress] = useState(0);
    const elapsedTimeRef = useRef(0);

    useEffect(() => {
        // runs on every 100 ms
        const intervalId = setInterval(() => {
            // update the elapsed time only when the user is not holding the slide
            if (!isHolding && elapsedTimeRef.current < countDownTimer * 1000){
                elapsedTimeRef.current += 10;
                const percentage = Math.floor(((elapsedTimeRef.current / (countDownTimer * 1000))) * 100);
                setProgress(percentage);
            }

            if (elapsedTimeRef.current >= countDownTimer * 1000) {
                // reset the time to 0
                elapsedTimeRef.current = 0;
                // reset the progres to 0
                setProgress(0);
                setCurrentIndex(prev => {
                    if (prev === numberOfSlides - 1) return 0;
                    else return prev + 1;
                })
            }
        }, 10);
        return () => clearInterval(intervalId);
    }, [currentIndex, isHolding, countDownTimer, numberOfSlides])


    return (
        <div className='w-fit flex flex-row justify-center items-center gap-1'>
            {
                [...Array(numberOfSlides)].map((item, idx) => {
                    return (
                        currentIndex !== idx ?
                            <div className='w-[7px] h-[7px] rounded-full bg-[#c3c3c3]/60'></div> :
                            <meter className='rounded-[7px] meter' value={progress} max={100}></meter>
                    )
                })
            }
        </div>
    )
}

export default CarouselIndicator;