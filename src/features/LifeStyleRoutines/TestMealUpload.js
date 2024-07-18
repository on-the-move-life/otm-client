import React, { useState } from 'react'
import AnalyseMealComp from './components/AnalyseMealComp'
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const TestMealUpload = () => {

    const [parentVisibilityCheck, setParentVisibilityCheck] = useState(true)

    const navigate = useNavigate();

    const handleClick = () => {
        setParentVisibilityCheck(false);
        console.log('Clicked');
    }
    return (

        <>

            {parentVisibilityCheck &&
                <div className="flex h-screen w-screen flex-col hide-scrollbar ">


                    <div className=" flex h-fit bg-mediumGray bg-cover bg-blend-soft-light border-b-2 border-white ">
                        <div className="flex w-full justify-between px-4">
                            <div className="h-full w-full flex flex-col justify-between items-start gap-4 py-2  ">
                                <HiArrowNarrowLeft
                                    size={20}
                                    onClick={() => {
                                        navigate('/home');
                                    }}

                                />
                                <div className='w-full flex flex-col justify-center items-start mt-2'>
                                    <h1 className="metallic-workout-gradient-text text-2xl font-semibold ">
                                        Meal Upload
                                    </h1>


                                    <div className="flex gap-2">
                                        <div>
                                            <h2 className="text-xl">Log your daily meals here </h2>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-4 h-fit rounded-xl border border-white p-2 text-center text-[10px] uppercase tracking-widest">
            <p>{workoutData.day.split(' ')[0]} </p>
            <p>Day </p>
            <p className="text-base">{workoutData.day.split(' ')[2]}</p>
          </div> */}
                        </div>
                    </div>

                    <div className='flex items-center justify-center '>

                        <div className="bg-mediumGray mt-[58px] h-[100px] w-[300px] border-[1px]  border-gray-400 rounded-lg flex items-center justify-center" onClick={handleClick}>

                            <p className='text-center'>
                                Click here to upload your meal
                            </p>


                        </div>


                    </div>


                    {/* {showAnalysis ? <p>Meal Analysis</p> : <h1 onClick={handleClick} >Click to analyse your meal</h1>} */}
                </div>
            }


            {!parentVisibilityCheck && <div className='p-2'>

                <AnalyseMealComp setParentVisibilityCheck={setParentVisibilityCheck} />

            </div>}
        </>
    )
}

export default TestMealUpload