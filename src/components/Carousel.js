import React, { useState } from 'react'
import CarouselIndicator from './CarouselIndicator'

/**
 * @param {array} carouselComponents -> takes an array of carousel components to be displayed in the carousel slide show
 * @param {bool} autoPlay -> indicates if the carousel shold play automatically or manually by sliding
 * @param {number} playTime (in seconds) -> when autoPlay is enabled, sets the time to display each component in the carousel
 */
function Carousel({ carouselComponents, autoPlay=true, playTime=5 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [holding, setHolding] = useState(false);

    // function to reduce the current index by 1
    function reduceCurrentIndex(){
        if(currentIndex === 0){
            setCurrentIndex(carouselComponents.length - 1);
        }
        else{
            setCurrentIndex(currentIndex - 1);
        }
    }
    // function to increase the current index by 1
    function increaseCurrentIndex(){
        if(currentIndex === carouselComponents.length - 1){
            setCurrentIndex(0);
        }
        else{
            setCurrentIndex(currentIndex + 1);
        }
    }
  return (
    <div className='w-full h-fit flex flex-col justify-center items-center gap-2'>
        <div className='w-[358px] h-[406px] rounded-[12px]' onMouseDown={() => setHolding(true)} onMouseUp={() => setHolding(false)}>
            {carouselComponents[currentIndex]}
            <div className='w-full h-full bg-transparent z-[100] flex flex-row justify-between items-center'>
                <div className='h-full w-1/2' onClick={reduceCurrentIndex}></div>
                <div className='h-full w-1/2' onClick={increaseCurrentIndex}></div>
            </div>
        </div>
        <CarouselIndicator numberOfSlides={carouselComponents.length} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isHolding={holding} countDownTimer={playTime} autoPlay={autoPlay}/>
    </div>
  )
}

export default Carousel