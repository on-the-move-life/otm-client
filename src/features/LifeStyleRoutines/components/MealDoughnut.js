import React from "react";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";


export const MealDoughnut = ({ mealdata }) => {


    const data = {
        datasets: [
            {
                data: [mealdata.carbohydrates, mealdata.protein, mealdata.fat],
                backgroundColor: [
                    '#FA5757',
                    '#7E87EF',
                    '#5ECC7B',
                ],
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

            <div className="bg-cover bg-center  bg-[#1C1C1E] opacity-72  rounded-lg shadow-md p-3 flex items-center flex-col">


                <div className="w-full"> <p className="text-[#F8F8F8] font-sfpro text-[20px] font-[20px] text-left">Meal Breakdown</p>  </div>

                <div className="relative w-[310px] h-[150px]" >

                    <Doughnut className=" h-[150px] w-auto ml-20  absolute inset-0 top-[-30px]" data={data} options={options} />
                    <div
                        className="text-center absolute inset-0 top-[50px] "
                    >

                        <h2 className="text-lightGray font-sfpro text-[12px] font-normal leading-normal">Total Calories</h2>
                        <p className="text-gray-300 font-sfpro text-[5px] not-italic font-semibold leading-normal tracking-1.286px uppercase">APPROX</p>
                        <h1 className="text-white font-sfpro text-[32px] font-medium leading-normal"> {mealdata.calories}</h1>

                    </div>

                </div>


                <div>

                    <div
                        className="flex justify-between text-white  space-x-6  "
                    >

                        <div className=" text-center">
                            <p className="text-[#FA5757] font-sfpro text-[14px] ">{mealdata.carbohydrates}% carbs</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[#7E87EF] font-sfpro text-[14px] ">{mealdata.protein}% fats</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[#5ECC7B] font-sfpro text-[14px] ">{mealdata.fat}% protein</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
