import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const Conclusion = ({ apiData }) => {
  const handleClick = () => {
    window.open('https://lx7tw3786s6.typeform.com/to/ik4t8g1r?typeform-source=www.google.com', '_blank');
  };
    const nameParts = apiData?.data?.name.split(' ');
    const firstName = nameParts?.[0];
  return (
    <div className='mb-6'>
        <div className='sm:px-16 px-4 flex flex-col sm:gap-10 gap-4'>
            <h3 className='sm:text-center text-left sm:text-xl text-base font-sf-pro'>By following this future plan and addressing those areas for improvement, you'll be unstoppable on your quest for ultimate fitness glory! Get ready to conquer new heights and <span className='text-[#7E87EF]'>have an absolute blast along the way, {firstName}</span> !</h3>
            <h3 className='sm:text-center text-left sm:text-xl text-base font-sf-pro'>Take our <span className='italic'>2 mins</span> Survey to personalize your program and unlock even better results.<span className='text-[#7E87EF]'>Your feedback helps us keep you crushing your goals!</span></h3>
        </div>
        <div className="sm:mx-10 mx-2 sm:mt-8 mt-6 flex items-center justify-center">
         <button onClick={handleClick} className="w-full text-black bg-[#7E87EF] py-4 rounded-lg sm:text-xl text-base flex gap-2 items-center justify-center">
           <span>Take Survey</span>
           <span className="text-black"><FaArrowRightLong /></span>
         </button>
        </div>
    </div>
  )
}

export default Conclusion