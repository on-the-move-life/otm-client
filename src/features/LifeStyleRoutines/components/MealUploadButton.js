import React from 'react';
import MealIcon1 from './icons/MealIcon1';
import MealImageicon from './icons/MealImageicon';

const MealUploadButton = () => {
  return (
    <div className="mb-2 flex flex-row rounded-lg rounded-[12px] border border-[rgba(94,204,123,0.66)] bg-[#1C1C1E] shadow-[0_50px_14px_0_rgba(94,204,123,0),0_32px_13px_0_rgba(94,204,123,0.03),0_18px_11px_0_rgba(94,204,123,0.1),0_8px_8px_0_rgba(94,204,123,0.17),0_2px_4px_0_rgba(94,204,123,0.2)] bg-[#1C1C1E] px-4 py-2">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <MealImageicon />

          <div className="pl-2 font-sfpro text-[14px] font-medium text-white">
            Upload meal photo
          </div>
        </div>
        <div className="font-sfpro text-[14px] font-medium text-lightGray">
          Let the power of AI breakdown <br />
          your meal
        </div>
      </div>
      <div className="ml-auto">


        <div className="h-16 w-16 rounded-lg">


          <div className="relative inline-block overflow-hidden">

            <span className="relative z-10 text-6xl">🍲</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealUploadButton;
