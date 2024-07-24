import React, { useState } from 'react'
import CrossIcon from '../../../components/CrossIcon'
import { Button } from '../../../components'
import GetStarted from './GetStarted'

function MainPage() {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div className='w-full min-h-screen overflow-y-scroll py-4 px-3 bg-black'>
            <div className='absolute top-4 right-3'>
                <CrossIcon />
            </div>

            {/* Dynamic Section Starts */}
            <div className='mt-[5rem]'>
                {
                    currentPage === 0 && <GetStarted />
                }
            </div>
            {/* Dynamic Section Ends */}

            <div className='w-full absolute bottom-4 left-0 px-3'>
                <Button type="mealplanner" text="Get Started" />
            </div>
        </div>
    )
}

export default MainPage