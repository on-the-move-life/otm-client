import React from 'react'
import info from './info.json';

const Conclusion = () => {
    const nameParts = info.renewalReport.name.split(' ');
    const firstName = nameParts[0];
  return (
    <div className='mb-20'>
        <div className='sm:px-16 px-4 mt-20 flex flex-col sm:gap-10 gap-4'>
            <h3 className='sm:text-center text-left sm:text-xl text-base font-sf-pro'>By following this future plan and addressing those areas for improvement, you'll be unstoppable on your quest for ultimate fitness glory! Get ready to conquer new heights and <span className='text-[#7E87EF]'>have an absolute blast along the way, {firstName}</span> !</h3>
            <h3 className='sm:text-center text-left sm:text-xl text-base font-sf-pro'>Take our Survey <span className='italic'>2 mins</span> to personalize your program and unlock even better results.<span className='text-[#7E87EF]'>Your feedback helps us keep you crushing your goals!</span></h3>
        </div>
    </div>
  )
}

export default Conclusion