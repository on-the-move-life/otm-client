import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContainerDimensions } from '../../../../hooks/useContainerDimensions';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import NutrientsBubble from './NutrientsBubble';
import { useEffect } from 'react';
import BreakfastGuide from './BreakfastGuide';
import LunchDinnerGuide from './LunchDinnerGuide';
import SnackGuide from './SnackGuide';

function MealInfoTile({ meal, name, calories, ingredients, macros }) {
  const [isCollapsed, setCollapsed] = useState(true);
  const [mealImage, setMealImage] = useState('');

  useEffect(() => {
    if (meal === 'breakfast') {
      setMealImage('./assets/breakfast-nonVeg.svg');
    }
    if (meal === 'lunch' || meal === 'dinner') {
      setMealImage('./assets/lunch-nonVeg-weightLoss.svg');
    }
    if (meal === 'morning snack' || meal === 'evening snack')
      setMealImage('./assets/snack.svg');
  }, [meal]);

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
        className="flex flex-row items-start w-full "
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ opacity: { duration: 0.3 }, height: { duration: 0.3 } }}
      >
        <div className="relative w-full">
          <div className="relative">
            <h1 className="ml-[7px] text-sm capitalize text-offwhite">
              {meal} Guide
            </h1>
            <div className="absolute top-0 flex justify-center w-full">
              <img src="./assets/guide-bg.svg" className="     h-[150px]" />
            </div>
            <div className="mt-2 ml-3">
              {meal === 'breakfast' && <BreakfastGuide />}
              {(meal === 'lunch' || meal === 'dinner') && <LunchDinnerGuide />}
              {meal === 'morning snack' ||
                (meal === 'evening snack' && <SnackGuide />)}

              <div className="relative z-50 ml-auto mr-auto h-[95px] w-[95px] overflow-hidden rounded-full ">
                <img
                  src={mealImage}
                  className="relative -mt-[4px] ml-1 h-[128px] w-[127px] max-w-max object-cover "
                />
              </div>
            </div>
          </div>
          <div className="mt-3 flex min-h-[106px] w-full items-start justify-start gap-2 rounded-[12px]  bg-[rgba(0,0,0,0.40)] p-2">
            <div className="h-[91px] w-[77px]">
              <img src="./assets/suggested-meal.svg" />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-2">
              <div className="flex justify-between w-full">
                <h3
                  className="flex items-start font-sfpro text-[11px]  capitalize text-darkTextGray"
                  style={{ lineHeight: '16.71px' }}
                >
                  Meal Suggestion
                </h3>
                <h5
                  className="flex w-[110px] grow items-end  justify-end pl-2 font-sfpro text-[12px] uppercase  text-yellow"
                  style={{ lineHeight: '12.76px' }}
                >
                  {calories}
                </h5>
              </div>
              <h3 className="mt-1 font-sfpro text-[14px] leading-[14px]  text-offwhite">
                {name}
              </h3>
              <div className="flex w-full max-w-[200px] flex-wrap items-start  gap-1">
                {ingredients &&
                  ingredients.map((item) => {
                    return (
                      <p
                        className="text-darkTextGray"
                        style={{ fontSize: '9.33px', lineHeight: '11.14px' }}
                      >
                        {item}
                      </p>
                    );
                  })}
              </div>
            </div>

            {/* <div
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
          </div> */}
          </div>
          {/* <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black"
          onClick={() => setCollapsed(false)}
        >
          <MdKeyboardArrowDown color={'#929292'} size={30} />
        </div> */}
        </div>
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
    <motion.div className="w-full rounded-[12px] bg-[rgba(0,0,0,0.45)] px-1 py-1 ">
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
