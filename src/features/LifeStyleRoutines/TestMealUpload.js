import React, { useState } from 'react'
import AnalyseMealComp from './components/AnalyseMealComp'
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const TestMealUpload = () => {

    const [showAnalysis, setShowAnalysis] = useState(false)
    const navigate = useNavigate();

    const handleClick = () => {
        setShowAnalysis(true);
        console.log('Clicked');
    }
    return (
        <>
            <div className="flex h-screen w-screen flex-col  py-8 hide-scrollbar ">
                <div className="mb-4">
                    <HiArrowNarrowLeft
                        size={20}
                        onClick={() => {
                            navigate('/home');
                        }}
                    />
                </div>

                <div className='flex items-center justify-center '>

                    {showAnalysis ? <AnalyseMealComp /> : <div className="bg-mediumGray mt-[58px] h-[100px] w-[300px] border-[1px]  border-gray-400 rounded-lg flex items-center justify-center" onClick={handleClick}>

                        <p className='text-center'>
                            Click here to upload your meal
                        </p>


                    </div>
                    }

                </div>


                {/* {showAnalysis ? <p>Meal Analysis</p> : <h1 onClick={handleClick} >Click to analyse your meal</h1>} */}
            </div>


        </>
    )
}

export default TestMealUpload