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
        className="flex flex-row items-start justify-around w-full"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ opacity: { duration: 0.3 }, height: { duration: 0.3 } }}
      >
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <div className="flex flex-col items-start justify-start w-full gap-2">
            <h3
              className="flex items-start font-sfpro text-[14px]  capitalize text-offwhite"
              style={{ lineHeight: '16.71px' }}
            >
              {`${meal} Suggestion`}
            </h3>
            <div className="flex">
              <h3
                className="font-sfpro text-[20px]  text-offwhite"
                style={{ lineHeight: '22px' }}
              >
                {name}
              </h3>
              <h5
                className="text-white-opacity-50 flex w-[110px] grow  items-end pl-2 font-sfpro text-[12px] uppercase "
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
            <p style={{ color: '#FA5757' }}>{macros['carbs']} carbs</p>
            <p style={{ color: '#7E87EF' }}>{macros['fats']} fats</p>
            <p style={{ color: '#5ECC7B' }}>{macros['protein']} proteins</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div className="w-full rounded-[12px] bg-[rgba(0,0,0,0.45)] px-4 py-2 ">
      <AnimatePresence>
        <Collapsed key="collapsed" />
      </AnimatePresence>
    </motion.div>
  );
}

export default MealUploadTile;
