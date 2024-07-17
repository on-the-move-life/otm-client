import React from 'react';
import { MealDoughnut } from './MealDoughnut';
import MealCrossIcon from './icons/MealCrossIcon';

const MealPage = ({
  mealInfo = {},
  imageURL = 'No URL',
  finalDate = 'No Date',
  setIsVisible
}) => {


  console.log('mealInfo', mealInfo);
  return (
    <div className="py-4">
      <div className=" flex w-full flex-row items-center justify-center">
        <p className="pl-2 font-sfpro  text-[14px] font-medium text-custompurple">
          {finalDate}
        </p>

        {/* <div
          className="absolute right-0 mr-4"
        >
          <MealCrossIcon />
        </div> */}
      </div>

      {Object.keys(mealInfo).length !== 0 ? (
        <>
          <div className="mb-5 mt-7 flex h-auto items-center justify-center">
            {/* meal info */}
            <div className=" h-fit w-full rounded-lg  bg-black p-5 text-white">
              <img
                src={imageURL} // Replace this with the actual image URL
                alt="image title"
                className="float-left mr-3 h-[130px] w-[122px] rounded-lg bg-cover"
              />
              {/* <h2 className="my-1 text-xl font-bold">Shrimps & Rice</h2> */}
              <p className="text-gray-400">{mealInfo.feedback || ''}</p>
            </div>
          </div>
          {mealInfo.calories && (
            <div className="flex items-center justify-center ">
              <MealDoughnut mealInfo={mealInfo}></MealDoughnut>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center">
          No meal data found
        </div>
      )}

      <div onClick={() => setIsVisible(true)} className="fixed bottom-4 left-0 w-full px-3">
        <button
          className="w-full rounded-xl bg-custompurple px-[14px] py-[10px] text-black "
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default MealPage;
