import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

export const MealDoughnut = ({ mealInfo = {} }) => {

  const data = {
    datasets: [
      {
        data: [mealInfo.carbohydrates, mealInfo.protein, mealInfo.fat],
        backgroundColor: ['#FA5757', '#7E87EF', '#5ECC7B'],
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        hoverBorderColor: 'rgba(0,0,0,0.1)',
        borderJoinStyle: 'round',
        borderRadius: 20, // For rounded ends
      },
    ],
  };

  const options = {
    cutout: '93%',
    rotation: 270,
    circumference: 180,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <div className="flex h-[236px] w-[358px] flex-col items-center  rounded-xl bg-center p-3 shadow-md mealInfoBoxGradient">
        <div className="w-full">
          {' '}
          <p className="text-left font-sfpro text-[20px] font-[20px] text-[#F8F8F8]">
            Meal Breakdown
          </p>{' '}
        </div>

        <div className="relative ">
          <div className="flex  h-[138px] w-[246px] items-center justify-center ">
            <Doughnut className="h-full w-full" data={data} options={options} />
          </div>

          <div className="absolute inset-0 top-[50px] text-center ">
            {/* <h2 className="font-sfpro text-[12px] font-normal leading-normal text-lightGray">
              Total Calories
            </h2> */}
            <p className="tracking-1.286px font-sfpro text-[8px] font-semibold uppercase not-italic leading-normal text-lightGray">
              APPROX
            </p>
            <h1 className="font-sfpro text-[32px] font-medium leading-normal text-white">
              {' '}
              {mealInfo.calories}
            </h1>
          </div>
        </div>

        <div>
          <div className="flex justify-between space-x-6  text-white  ">
            <div className=" text-center">
              <p className="font-sfpro text-[14px] text-[#FA5757] ">
                {mealInfo?.carbohydrates}% carbs
              </p>
            </div>
            <div className="text-center">
              <p className="font-sfpro text-[14px] text-[#7E87EF] ">
                {mealInfo?.protein}% fats
              </p>
            </div>
            <div className="text-center">
              <p className="font-sfpro text-[14px] text-[#5ECC7B] ">
                {mealInfo?.fat}% protein
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
