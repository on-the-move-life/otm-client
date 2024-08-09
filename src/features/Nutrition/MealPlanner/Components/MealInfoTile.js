import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContainerDimensions } from '../../../../hooks/useContainerDimensions';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import NutrientsBubble from './NutrientsBubble';

function MealInfoTile({ meal, name, calories, ingredients, macros }) {
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
              className="flex items-start font-sfpro text-[14px] font-semibold text-offwhite"
              style={{ lineHeight: '16.71px' }}
            >
              {'Breakfast Suggestion'}
            </h3>
            <div className="flex">
              <h3
                className="font-sfpro text-[20px] font-semibold text-offwhite"
                style={{ lineHeight: '22px' }}
              >
                {name}
              </h3>
              <h5
                className="text-white-opacity-50 flex w-[60px]  grow items-end pl-2 font-sfpro text-[12px] font-bold"
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
                width: percentageToFloat(macros['carbs']) * width,
                height: '7px',
                borderRadius: '7px',
                backgroundColor: '#FA5757',
              }}
            ></div>
            <div
              style={{
                width: percentageToFloat(macros['fats']) * width,
                height: '7px',
                borderRadius: '7px',
                backgroundColor: '#7E87EF',
              }}
            ></div>
            <div
              style={{
                width: percentageToFloat(macros['protein']) * width,
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
        {/* <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black"
          onClick={() => setCollapsed(false)}
        >
          <MdKeyboardArrowDown color={'#929292'} size={30} />
        </div> */}
      </motion.div>
    );
  };

  const Uncollapsed = () => {
    return (
      <motion.div
        className="flex flex-row items-start justify-around w-full"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ opacity: { duration: 0.1 }, height: { duration: 0.3 } }}
      >
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col items-start justify-around w-full">
            <h3
              className="text-[14px] font-semibold text-[#DDF988]"
              style={{ lineHeight: '16.71px' }}
            >
              {meal}
            </h3>
            <div className="flex flex-col items-start justify-center w-full">
              <h3
                className="text-[14px] font-semibold text-[#F8F8F8]"
                style={{ lineHeight: '16.71px' }}
              >
                {name}
              </h3>
              <h5
                className="text-[10px] font-semibold text-[#F5C563]"
                style={{ lineHeight: '12.76px' }}
              >
                {calories}
              </h5>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-3">
              <h5
                style={{
                  fontSize: '9.33px',
                  lineHeight: '11.14px',
                  color: '#929292',
                }}
              >
                Ingredients used
              </h5>
              <div className="flex flex-col items-start justify-center w-full gap-1">
                {ingredients &&
                  ingredients.map((item) => {
                    return (
                      <p
                        className="text-white"
                        style={{ fontSize: '9.33px', lineHeight: '11.14px' }}
                      >
                        {item}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center w-full right-3">
            <NutrientsBubble
              size="small"
              carbs={parseInt(percentageToFloat(macros['carbs']) * 100)}
              proteins={parseInt(percentageToFloat(macros['protein']) * 100)}
              fats={parseInt(percentageToFloat(macros['fats']) * 100)}
            />
          </div>
        </div>
        <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black"
          onClick={() => setCollapsed(true)}
        >
          <MdKeyboardArrowUp color={'#929292'} size={30} />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div className="w-full rounded-[12px] bg-[rgba(0,0,0,0.45)] py-2 pl-5 pr-3 ">
      <AnimatePresence>
        {isCollapsed ? (
          <Collapsed key="collapsed" />
        ) : (
          <Uncollapsed key="uncollapsed" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MealInfoTile;
