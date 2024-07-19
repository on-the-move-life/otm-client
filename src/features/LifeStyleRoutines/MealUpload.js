import React, { useState } from 'react';
import AnalyseMealComp from './components/AnalyseMealComp';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const MealUpload = () => {

    const navigate = useNavigate();


    return (
        <>
            <div className="flex h-screen w-screen flex-col  ">
                <div className=" flex h-fit border-b-[1px] border-white bg-darkGray bg-cover bg-blend-soft-light ">
                    <div className="flex w-full justify-between px-4">
                        <div className="flex h-full w-full flex-col items-start justify-between gap-2 py-2  ">
                            <HiArrowNarrowLeft
                                size={20}
                                onClick={() => {
                                    navigate('/home');
                                }}
                            />
                            <div className=" flex w-full flex-col items-start justify-center">
                                <h1 className=" text-2xl font-semibold ">
                                    Meal Upload
                                </h1>


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
