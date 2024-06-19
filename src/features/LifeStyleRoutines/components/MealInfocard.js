import React from 'react';

export const MealInfocard = ({ imageURL, finalDate }) => {
  return (
    <div className="align-center flex w-full items-center justify-center self-center rounded-lg  bg-black p-5 text-white">
      <img
        src={imageURL} // Replace this with the actual image URL
        alt="Shrimps & Rice"
        className="mr-5 h-[143px]  w-[122px] rounded-lg"
      />
      <div className="flex flex-col">
        {/* <h2 className="my-1 text-xl font-bold">Shrimps & Rice</h2> */}
        <p className="text-gray-400">
          AI generated feedback on how well the plate is prepared according to
          their goals and restrictions
        </p>
      </div>
    </div>
  );
};
