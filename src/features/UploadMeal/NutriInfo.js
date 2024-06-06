import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const NutriInfo = () => {

    const [imageURL, setImageURL] = useState('https://storage.googleapis.com/otm_client_profile_pictures/thali-indian-1296x728-header.jpg');


    const data = {
        estimated_weight: 300,
        calories: 400,
        protein: 35,
        carbohydrates: 20,
        fat: 15,
    };


    const chartData = {
        labels: ['Carbohydrates', 'Protein', 'Fat'],
        datasets: [
            {
                data: [data.carbohydrates, data.protein, data.fat],
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

            <div className="max-w-sm mx-auto  rounded-lg shadow-md p-3 flex items-center space-x-6 bg-transparent-50/75 " style={{
                backgroundImage: `url(${imageURL})`
            }}>


                <div className="w-1/2 brightness-100">
                    <Doughnut data={chartData} options={chartOptions} />
                </div>
                <div className="w-1/2 space-y-2">
                    <div className="text-center text-sm font-bold text-lightGray font-sfpro ">Calories: {data.calories} </div>
                    <div className="text-center text-sm font-bold text-lightGray font-sfpro">Estimated Weight: {data.estimated_weight} </div>
                    <div className="flex items-center text-gray-700 space-x-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500 "></span>
                        <span className='text-custompurple font-sfpro'>Carbohydrates</span>
                        <span className="ml-auto font-sfpro">{data.carbohydrates}g</span>
                    </div>
                    <div className="flex items-center text-gray-700 space-x-2">
                        <span className="w-3 h-3 rounded-full bg-red"></span>
                        <span className='text-custompurple font-sfpro'>Protein</span>
                        <span className="ml-auto font-sfpro">{data.protein}g</span>
                    </div>
                    <div className="flex items-center text-gray-700 space-x-2">
                        <span className="w-3 h-3 rounded-full bg-yellow"></span>
                        <span className='text-custompurple font-sfpro'>Fat</span>
                        <span className="ml-auto font-sfpro">{data.fat}g</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NutriInfo