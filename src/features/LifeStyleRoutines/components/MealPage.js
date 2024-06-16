import React from 'react'
import { MealDoughnut } from './MealDoughnut'
import { MealInfocard } from './MealInfocard'

const MealPage = ({ mealdata, ImagePath }) => {
    return (

        <div>
            <div className="flex justify-center items-center h-auto mb-20">


                <MealInfocard mealdata={mealdata} ImagePath={ImagePath}> </MealInfocard>

            </div>
            <div className="flex justify-center items-center h-auto mb-20">



                <MealDoughnut mealdata={mealdata} ></MealDoughnut>
            </div>



            <div className='w-full px-3 bottom-4 left-0'>
                <button className="w-full bg-custompurple text-black rounded-xl p-2" >Done</button>
            </div>
        </div>
    )
}

export default MealPage