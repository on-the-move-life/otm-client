import React, { useState } from 'react';
import AnalyseMealComp from './components/AnalyseMealComp';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const MealUpload = () => {

    const navigate = useNavigate();


    return (
        <>
            <div className="flex h-screen w-screen flex-col  ">
                <div className=" flex h-fit border-b-2 border-white bg-mediumGray bg-cover bg-blend-soft-light ">
                    <div className="flex w-full justify-between px-4">
                        <div className="flex h-full w-full flex-col items-start justify-between gap-4 py-2  ">
                            <HiArrowNarrowLeft
                                size={20}
                                onClick={() => {
                                    navigate('/home');
                                }}
                            />
                            <div className="mt-2 flex w-full flex-col items-start justify-center">
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
                    </div>
                </div>

                <div className="p-2">
                    <AnalyseMealComp />
                </div>
            </div>
        </>
    );
};

export default MealUpload;
