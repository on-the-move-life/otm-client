import React from 'react';
import { MealDoughnut } from './MealDoughnut';
import { MealInfocard } from './MealInfocard';
import CrossIcon from './icons/CrossIcon';

const MealPage = ({ mealInfo, imageURL, finalDate, setshowMealInfoPage }) => {
  return (
    <div>
      <p>{finalDate}</p>
      <div onClick={() => setshowMealInfoPage(false)}>
        <CrossIcon />
      </div>

      <div className="mb-5 mt-7 flex h-auto items-center justify-center">
        <MealInfocard imageURL={imageURL}> </MealInfocard>
      </div>
      <div className="flex items-center justify-center ">
        <MealDoughnut mealInfo={mealInfo}></MealDoughnut>
      </div>
    </div>
  );
};

export default MealPage;
