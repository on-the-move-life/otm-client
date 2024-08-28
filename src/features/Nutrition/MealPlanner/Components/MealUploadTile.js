import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContainerDimensions } from '../../../../hooks/useContainerDimensions';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import NutrientsBubble from './NutrientsBubble';

function MealUploadTile({ mealType, mealUrl, mealNutritionAnalysis }) {
  const [isCollapsed, setCollapsed] = useState(true);

  function percentageToFloat(percentage) {
    // Remove the '%' symbol and convert the string to a float
    const floatValue = percentage?.replace('%', '');
    const floatVal = parseFloat(floatValue);

    // Divide by 100 to convert the percentage to a decimal
    return floatVal / 100;
  }

  // const Collapsed = () => {
  //   const barRef = useRef();
  //   const { width } = useContainerDimensions(barRef);

  //   return (

  //   );
  // };

  return (
    <div className="mt-2 w-full rounded-[12px] bg-[rgba(0,0,0,0.45)] px-4 py-2">
      <div className="flex flex-row items-start justify-around w-full ">
        <div className="flex items-start justify-start w-full gap-2">
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center justify-between w-full ">
              <h3
                className="flex items-start rounded-[4.5px] bg-[rgba(94,204,123,0.12)] px-[8px] py-[3.5px] font-sfpro text-[12px] font-medium capitalize text-green"
                style={{ lineHeight: '16.71px' }}
              >
                <img
                  src="./assets/correct.svg"
                  className="mr-[4px]"
                  alt="Completed"
                />
                Completed {mealType === 'eveningSnack' && 'Evening Snack'}
                {mealType === 'morningSnack' && 'Morning Snack'}
                {(mealType === 'lunch' ||
                  mealType === 'breakfast' ||
                  mealType === 'dinner') &&
                  mealType}
              </h3>
              <h3
                className=" flex items-start font-sfpro text-[20px]  capitalize text-yellow"
                style={{ lineHeight: '16.71px' }}
              >
                {mealNutritionAnalysis.calories}KCAL
              </h3>
            </div>
            <div className="flex">
              <div className="h-[99px] w-[84px] grow">
                <img src={mealUrl} className="object-cover" />
              </div>
              <span className="ml-4 w-[200px]">
                <p className="font-sfpro text-[14px] font-medium text-customWhite">
                  {mealNutritionAnalysis.mealName}
                </p>
                <p className="font-sfpro text-[10px] font-medium text-darkTextGray">
                  {mealNutritionAnalysis.feedback}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealUploadTile;
