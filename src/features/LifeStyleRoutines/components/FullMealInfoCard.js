import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FullMealInfoCard = ({
  mealInfo = {},
  imageURL = '',
  finalDate = '',

}) => {
  console.log('inside FullMealInfoCard mealInfo ', mealInfo);

  const { carbohydrates, fat, protein, calories, feedback, mealName } = mealInfo;

  return (
    <>
      <div
        className="rounded-xl border border-[rgba(94,204,123,0.66)] bg-mediumGray pb-3 shadow-[0_50px_14px_0_rgba(94,204,123,0),0_32px_13px_0_rgba(94,204,123,0.03),0_18px_11px_0_rgba(94,204,123,0.1),0_8px_8px_0_rgba(94,204,123,0.17),0_2px_4px_0_rgba(94,204,123,0.2)]"

      >
        <div className="flex  items-center justify-between p-4 text-white shadow-md">
          <div className="flex">
            <img
              src={imageURL}
              alt="Meal"
              className="max-w-20 mr-4 aspect-square max-h-20 rounded-lg"
            />
            <div>
              <div className="flex flex-row items-center justify-between">
                <p className="text-xs text-custompurple">{finalDate}</p>
                {calories && (
                  <div className="text-lg font-semibold">{calories} Kcal</div>
                )}
              </div>

              <h2 className="font-sfpro text-[14px] font-medium leading-[16.71px] text-left">{mealName}</h2>
              <p className="truncate-text text-sm text-gray-400">{feedback}</p>
            </div>
          </div>
        </div>

        {carbohydrates && fat && protein && (
          <>
            <div className="m-2">
              <div className="mt-1 flex gap-1">
                <motion.div
                  className="h-[5px] rounded-full bg-red"
                  initial={{ width: 0 }}
                  animate={{ width: `${carbohydrates}%` }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="h-[5px] rounded-full bg-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${fat}%` }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <motion.div
                  className="h-[5px] rounded-full bg-green"
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
          </>
        )}
      </div>
    </>
  );
};

export default FullMealInfoCard;
