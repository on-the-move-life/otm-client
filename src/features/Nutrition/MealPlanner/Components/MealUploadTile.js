import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContainerDimensions } from '../../../../hooks/useContainerDimensions';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import NutrientsBubble from './NutrientsBubble';

function MealUploadTile({ meal, name, calories, ingredients, macros }) {
  const [isCollapsed, setCollapsed] = useState(true);

  function percentageToFloat(percentage) {
    // Remove the '%' symbol and convert the string to a float
    const floatValue = percentage?.replace('%', '');
    const floatVal = parseFloat(floatValue);

    // Divide by 100 to convert the percentage to a decimal
    return floatVal / 100;
  }

  const Collapsed = () => {
    const barRef = useRef();
    const { width } = useContainerDimensions(barRef);

    return (
      <motion.div
        className="flex flex-row items-start justify-around w-full "
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ opacity: { duration: 0.3 }, height: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center justify-between w-full">
              <h3
                className="text-customBlack flex items-start rounded-[4.5px] bg-green p-[3.5px] font-sfpro text-[12px]  font-medium capitalize"
                style={{ lineHeight: '16.71px' }}
              >
                <img src="./assets/correct.svg" className="mr-1" />
                Completed Breakfast
              </h3>
              <h3
                className=" flex items-start font-sfpro text-[20px]  capitalize text-offwhite"
                style={{ lineHeight: '16.71px' }}
              >
                {`650KCAL`}
              </h3>
            </div>
            <div>
              <img />
              <div>
                <p className="font-sfpro text-[9.3px] font-medium text-white-opacity-50">
                  7 June 2024
                </p>
                <p className="text-customWhite font-sfpro text-[14px] font-medium">
                  Shrimps & Rice
                </p>
                <p className="font-sfpro text-[10px] font-medium text-darkTextGray">
                  AI generated feedback on how well the plate is prepared
                  according to their goals and restrictions
                </p>
              </div>
            </div>
            <div className="flex">
              <h3
                className="font-sfpro text-[20px]  text-offwhite"
                style={{ lineHeight: '22px' }}
              >
                {name}
              </h3>
              <h5
                className="flex w-[110px] grow items-end  pl-2 font-sfpro text-[12px] uppercase text-white-opacity-50 "
                style={{ lineHeight: '12.76px' }}
              >
                {calories}
              </h5>
            </div>
          </div>
          <div
            ref={barRef}
            className="flex flex-row items-center justify-start w-full gap-1"
          >
            <div
              style={{
                width: percentageToFloat('50%') * width,
                height: '7px',
                borderRadius: '7px',
                backgroundColor: '#FA5757',
              }}
            ></div>
            <div
              style={{
                width: percentageToFloat('30%') * width,
                height: '7px',
                borderRadius: '7px',
                backgroundColor: '#7E87EF',
              }}
            ></div>
            <div
              style={{
                width: percentageToFloat('20%') * width,
                height: '7px',
                borderRadius: '7px',
                backgroundColor: '#5ECC7B',
              }}
            ></div>
          </div>
          <div
            className="flex flex-row items-center justify-start w-full gap-2"
            style={{ fontSize: '9.33px', lineHeight: '11.14px' }}
          >
            <p style={{ color: '#FA5757' }}>{'10%'} carbs</p>
            <p style={{ color: '#7E87EF' }}>{'10%'} fats</p>
            <p style={{ color: '#5ECC7B' }}>{'10%'} proteins</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div className="mt-2 w-full rounded-[12px] bg-[rgba(0,0,0,0.45)] px-4 py-2">
      <AnimatePresence>
        <Collapsed key="collapsed" />
      </AnimatePresence>
    </motion.div>
  );
}

export default MealUploadTile;
