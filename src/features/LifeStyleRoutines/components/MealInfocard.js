import React from 'react'

export const MealInfocard = ({ ImagePath }) => {
    return (
        <div className="flex items-center bg-black rounded-lg p-5 text-white w-full justify-center self-center align-center">
            <img
                src={ImagePath} // Replace this with the actual image URL
                alt="Shrimps & Rice"
                className="w-[122px] h-[143px]  rounded-lg mr-5"
            />
            <div className="flex flex-col">
                <p className="text-lightGray font-sfpro text-14px font-medium">7 June 2024</p>
                <h2 className="text-xl font-bold my-1">Shrimps & Rice</h2>
                <p className="text-gray-400">
                    AI generated feedback on how well the plate is prepared according to their goals and restrictions
                </p>
            </div>
        </div>
    )
}
