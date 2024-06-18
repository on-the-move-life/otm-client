import React from 'react';
import { motion } from 'framer-motion';

const FullMealInfoCard = ({ mealdata, ImagePath, finalDate }) => {
    return (
        <div className='bg-mediumGray rounded-xl pb-3'>

            <div className="text-white  p-4 shadow-md flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src={ImagePath}
                        alt="Meal"
                        className="rounded-lg w-16 h-16 mr-4"
                    />
                    <div>
                        <div className='flex flex-row justify-between'>
                            <p className="text-sm text-gray-400">{finalDate}</p>
                            <div className="text-xl font-semibold">{mealdata.calories} Kcal</div>


                        </div>


                        <h2 className="text-lg font-semibold">Shrimps & Rice</h2>
                        <p className="text-sm text-gray-400">
                            AI generated feedback on how well the plate is prepared according to their goals and restrictions
                        </p>
                    </div>
                </div>
            </div>



            <div className="m-2">

                <div className="flex mt-1">
                    <motion.div
                        className="bg-red h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${mealdata.carbohydrates}%` }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div
                        className="bg-blue h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${mealdata.protein}%` }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    />
                    <motion.div
                        className="bg-green h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${mealdata.fat}%` }}
                        transition={{ duration: 0.5, delay: 1 }}
                    />
                </div>
            </div>
            <div className="flex text-white text-sm m-2">
                <span className='mr-2 text-[#FA5757] font-sfpro text-xs font-medium' > <p> {mealdata.carbohydrates}% carbs </p> </span>
                <span className='mr-2 text-[#7E87EF] font-sfpro text-xs font-medium'> <p>{mealdata.fat}% fats </p>  </span>
                <span className='mr-2 text-[#5ECC7B] font-sfpro text-xs font-medium'> <p>{mealdata.protein}% protein </p> </span>
            </div>


        </div>
    )
}

export default FullMealInfoCard