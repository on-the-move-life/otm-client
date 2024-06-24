import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FullMealInfoCard = ({
    mealInfo = {},
    imageURL = '',
    finalDate = '',
    setshowMealInfoPage
}) => {


    console.log('inside FullMealInfoCard mealInfo ', mealInfo);

    const { carbohydrates, fat, protein, calories } = mealInfo;

    return (
        <>
            <div
                className="rounded-xl rounded-[12px] border border-[rgba(94,204,123,0.66)] bg-[#1C1C1E] shadow-[0_50px_14px_0_rgba(94,204,123,0),0_32px_13px_0_rgba(94,204,123,0.03),0_18px_11px_0_rgba(94,204,123,0.1),0_8px_8px_0_rgba(94,204,123,0.17),0_2px_4px_0_rgba(94,204,123,0.2)] bg-mediumGray pb-3"
                onClick={() => setshowMealInfoPage(true)}
            >
                <div className="flex  items-center justify-between p-4 text-white shadow-md">
                    <div className="flex items-center">
                        <img
                            src={imageURL}
                            alt="Meal"
                            className="mr-4 h-16 w-16 rounded-lg"
                        />
                        <div>
                            <div className="flex flex-row justify-between">
                                <p className="text-sm text-gray-400">{finalDate}</p>
                                <div className="text-xl font-semibold">
                                    {calories} Kcal
                                </div>
                            </div>

                            {/* <h2 className="text-lg font-semibold">Shrimps & Rice</h2> */}
                            <p className="text-sm text-gray-400">
                                AI generated feedback on how well the plate is prepared
                                according to their goals and restrictions
                            </p>
                        </div>
                    </div>
                </div>

                <div className="m-2">
                    <div className="mt-1 flex">
                        <motion.div
                            className="h-2 rounded-full bg-red"
                            initial={{ width: 0 }}
                            animate={{ width: `${carbohydrates}%` }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            className="h-2 rounded-full bg-blue"
                            initial={{ width: 0 }}
                            animate={{ width: `${fat}%` }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        />
                        <motion.div
                            className="h-2 rounded-full bg-green"
                            initial={{ width: 0 }}
                            animate={{ width: `${protein}%` }}
                            transition={{ duration: 0.5, delay: 1 }}
                        />
                    </div>
                </div>
                <div className="m-2 flex text-sm text-white">
                    <span className="mr-2 font-sfpro text-xs font-medium text-[#FA5757]">
                        {' '}
                        <p> {carbohydrates}% carbs </p>{' '}
                    </span>
                    <span className="mr-2 font-sfpro text-xs font-medium text-[#7E87EF]">
                        {' '}
                        <p>{fat}% fats </p>{' '}
                    </span>
                    <span className="mr-2 font-sfpro text-xs font-medium text-[#5ECC7B]">
                        {' '}
                        <p>{protein}% protein </p>{' '}
                    </span>
                </div>
            </div>
        </>
    );
};

export default FullMealInfoCard;
