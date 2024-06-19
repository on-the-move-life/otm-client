import React from 'react'
import { MealDoughnut } from './MealDoughnut'
import { MealInfocard } from './MealInfocard'

const MealPage = ({ mealdata, ImagePath }) => {
    return (

        <div>

            <div className="flex justify-center items-center h-auto mb-5 mt-7">


                <MealInfocard mealdata={mealdata} ImagePath={ImagePath}> </MealInfocard>

            </div>
            <div className="flex justify-center items-center ">



                <MealDoughnut mealdata={mealdata} ></MealDoughnut>
            </div>




        </div>
    )
}

export default MealPage