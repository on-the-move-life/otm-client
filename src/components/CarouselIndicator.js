import React, { useState, useEffect, useRef } from 'react'

/**
 * @param {number} numberOfSlides -> number of carousel slides
 * @param {number} currentIndex -> 0 based index of the current slide
 * @param {function} setCurentIndex -> function passed from the parent component to set the index, used for automatic upadate of index
 * @param {bool} isHolding -> used to detect if the user is holding the slide
 * @param {number} countDownTimer (time in seconds) -> used for auto-play
 * @param {bool} autoPlay -> used to select between auto-play on or off
 */
function CarouselIndicator({ numberOfSlides, currentIndex, setCurrentIndex, isHolding, countDownTimer, autoPlay }) {
    // progress percentage
    const [progress, setProgress] = useState(0);
    const elapsedTimeRef = useRef(0);

    useEffect(() => {
        if(autoPlay){
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
        }
    }, [currentIndex, isHolding, countDownTimer, numberOfSlides, autoPlay])


    return (
        <div className='w-fit flex flex-row justify-center items-center gap-1'>
            {
                autoPlay ?
                [...Array(numberOfSlides)].map((item, idx) => {
                    return (
                        currentIndex !== idx ?
                            <div className='w-[7px] h-[7px] rounded-full bg-[#c3c3c3]/60'></div> :
                            <meter className='rounded-[7px] meter' value={progress} max={100}></meter>
                    )
                }) :
                [...Array(numberOfSlides)].map((item, idx) => {
                    return (
                        currentIndex !== idx ?
                            <div className='w-[7px] h-[7px] rounded-full bg-[#c3c3c3]/60'></div> :
                            <div className='w-[7px] h-[7px] rounded-full bg-white'></div>
                    )
                })
            }
        </div>
    )
}

export default CarouselIndicator;