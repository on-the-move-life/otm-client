import React from 'react'

const LifestyleDesignBanner = () => {
    return (
        <div className='w-auto p-1 mb-2 flex items-center justify-between rounded-md bg-gradient-to-b from-gradientStart to-gradientEnd'>

            {/* elem 1 */}
            <img src="/assets/ldbannerleft.svg" alt="lifestyle design banner" />

            <div className='text-black flex  font-sfpro text-sm font-semibold leading-none'>
                <img className='mr-1' src="/assets/ldbannertime.svg" alt="lifestyle design banner" />
                Routine Tracking. Coming Soon!
            </div>

            {/* elem 4 */}
            <img src="/assets/ldbannerright.svg" alt="lifestyle design banner" />




        </div>
    )
}

export default LifestyleDesignBanner