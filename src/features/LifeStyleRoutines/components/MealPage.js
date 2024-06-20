import React from 'react';
import { MealDoughnut } from './MealDoughnut';
import { MealInfocard } from './MealInfocard';
import CrossIcon from './icons/CrossIcon';
import MealCrossIcon from './icons/MealCrossIcon';

const MealPage = ({ mealInfo, imageURL, finalDate, setshowMealInfoPage }) => {

    console.log('inside Mealpage mealInfo ', mealInfo);

    return (
        <div>

            <div

                className="mt-2 flex flex-row items-center justify-center text-center align-middle w-full  "
            >
                <div className="pl-2 font-sfpro  text-[14px] font-medium text-lightGray">
                    <p>{finalDate}</p>
                </div>

                <div className='absolute right-0 mr-2' onClick={() => setshowMealInfoPage(false)}>
                    <MealCrossIcon />
                </div>
            </div>



            <div className="mb-5 mt-7 flex h-auto items-center justify-center">
                <MealInfocard imageURL={imageURL}> </MealInfocard>
            </div>
            <div className="flex items-center justify-center ">
                <MealDoughnut mealInfo={mealInfo}></MealDoughnut>
            </div>

            <div className="bottom-4 left-0 mt-60 w-full px-3">
                <button
                    className="w-full rounded-xl bg-custompurple pb-[10px] pl-[14px] pr-[14px]  pt-[10px]  text-black "
                    onClick={() => setshowMealInfoPage(false)}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default MealPage;
