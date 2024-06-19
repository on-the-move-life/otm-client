import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FullMealInfoCard = ({
  mealInfo = {},
  imageURL = '',
  finalDate = '',
  setshowMealInfoPage
}) => {

  return (
    <>
      <div
        className="rounded-xl border border-red bg-mediumGray pb-3"
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
                  {mealInfo?.calories} Kcal
                </div>
              </div>

              <h2 className="text-lg font-semibold">Shrimps & Rice</h2>
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
              animate={{ width: `${mealInfo.carbohydrates}%` }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="h-2 rounded-full bg-blue"
              initial={{ width: 0 }}
              animate={{ width: `${mealInfo.protein}%` }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.div
              className="h-2 rounded-full bg-green"
              initial={{ width: 0 }}
              animate={{ width: `${mealInfo.fat}%` }}
              transition={{ duration: 0.5, delay: 1 }}
            />
          </div>
        </div>
        <div className="m-2 flex text-sm text-white">
          <span className="mr-2 font-sfpro text-xs font-medium text-[#FA5757]">
            {' '}
            <p> {mealInfo.carbohydrates}% carbs </p>{' '}
          </span>
          <span className="mr-2 font-sfpro text-xs font-medium text-[#7E87EF]">
            {' '}
            <p>{mealInfo.fat}% fats </p>{' '}
          </span>
          <span className="mr-2 font-sfpro text-xs font-medium text-[#5ECC7B]">
            {' '}
            <p>{mealInfo.protein}% protein </p>{' '}
          </span>
        </div>
      </div>
    </>
  );
};

export default FullMealInfoCard;
