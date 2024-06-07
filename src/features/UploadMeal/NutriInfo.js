import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const NutriInfo = ({ mealdata }) => {

    const [imageURL, setImageURL] = useState('https://storage.googleapis.com/otm_client_profile_pictures/thali-indian-1296x728-header.jpg');


    console.log(mealdata);

    const chartData = {
        labels: ['Carbohydrates', 'Protein', 'Fat'],
        datasets: [
            {
                data: [mealdata.carbohydrates, mealdata.protein, mealdata.fat],
                backgroundColor: ['#A855F7', '#EF4444', '#F59E0B'],
                hoverBackgroundColor: ['#A855F7', '#EF4444', '#F59E0B'],
            },
        ],
    };

    const chartOptions = {
        cutoutPercentage: 80,
        plugins: {
            legend: {
                display: false,
            },
        },
    };



    return (
        <>

            <div className="max-w-sm mx-auto  rounded-lg shadow-md p-3 flex items-center space-x-6 bg-mediumGray   " >




                <div className="w-1/2">
                    <Doughnut data={chartData} options={chartOptions} />
                </div>
                <div className="w-1/2 space-y-2 " >
                    <div className="text-center text-md font-bold text-lightGray font-sfpro ">Calories: {mealdata.calories} </div>

                    <div className="flex items-center text-gray-700 space-x-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500 "></span>
                        <span className='text-custompurple font-sfpro'>Carbohydrates</span>
                        <span className="ml-auto font-sfpro">{mealdata.carbohydrates}g</span>
                    </div>
                    <div className="flex items-center text-gray-700 space-x-2">
                        <span className="w-3 h-3 rounded-full bg-red"></span>
                        <span className='text-custompurple font-sfpro'>Protein</span>
                        <span className="ml-auto font-sfpro">{mealdata.protein}g</span>
                    </div>
                    <div className="flex items-center text-gray-700 space-x-2">
                        <span className="w-3 h-3 rounded-full bg-yellow"></span>
                        <span className='text-custompurple font-sfpro'>Fat</span>
                        <span className="ml-auto font-sfpro">{mealdata.fat}g</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NutriInfo