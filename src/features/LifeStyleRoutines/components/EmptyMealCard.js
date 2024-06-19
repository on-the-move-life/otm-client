import React from 'react'
import MealIcon1 from './icons/MealIcon1'

const EmptyMealCard = () => {
    return (
        <div className='bg-[#1C1C1E] flex flex-row px-4 py-2 rounded-lg mb-2'>

            <div className='flex flex-col'>
                <div className='flex flex-row'>

                    <svg className='mt-1' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="elements">
                            <circle id="Ellipse 1119" cx="4.07031" cy="4.06152" r="0.8125" stroke="#F8F8F8" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                            <path id="Rectangle 2056" d="M1.35938 6.49935C1.35938 4.07358 1.35938 2.8607 2.11296 2.10711C2.86655 1.35352 4.07944 1.35352 6.50521 1.35352C8.93098 1.35352 10.1439 1.35352 10.8975 2.10711C11.651 2.8607 11.651 4.07358 11.651 6.49935C11.651 8.92512 11.651 10.138 10.8975 10.8916C10.1439 11.6452 8.93098 11.6452 6.50521 11.6452C4.07944 11.6452 2.86655 11.6452 2.11296 10.8916C1.35938 10.138 1.35938 8.92512 1.35938 6.49935Z" stroke="#F8F8F8" stroke-width="1.2" />
                            <path id="Vector" d="M2.71094 11.374C5.07935 8.54379 7.73439 4.81119 11.6471 7.33447" stroke="#F8F8F8" stroke-width="1.2" />
                        </g>
                    </svg>


                    <div className="text-white font-sfpro text-[14px] font-medium pl-2">Upload meal photo</div>


                </div>
                <div className="text-lightGray font-sfpro text-[14px] font-medium">Let the power of AI breakdown <br />your meal</div>
            </div>
            <div className="ml-auto">
                {/* <MealIcon1></MealIcon1> */}
                {/* <img
                    src="./components/icons/MealCardIcon1" // Replace with the correct path to the image
                    alt="Meal"
                    className="w-16 h-16 rounded-lg"
                /> */}

                <div className="w-16 h-16 rounded-lg">

                    {/* svg render */}

                    <div className="relative inline-block overflow-hidden">
                        {/* <div className="w-20 h-20 border-4 border-lightGray rounded-full absolute top-0 left-0"></div> */}
                        <span className="text-6xl relative z-10">🍲</span>
                    </div>


                </div>
            </div>





        </div>
    )
}

export default EmptyMealCard