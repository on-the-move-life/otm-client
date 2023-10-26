import React from 'react';

const Section = (props) => {
  return (
    <div className="flex rounded-[12px] bg-[rgba(63,_63,_63,_0.30)] mix-blend-screen w-[300px] h-[76px] flex-shrink-0 mx-[0] my-[10px]">
      <img src={'/assets/workout.png'} className="w-[80px] h-[76px] flex-shrink-0 rounded-tl-[12px] rounded-br-[0] rounded-tr-[0] rounded-bl-[12px]"></img>
      <div className="p-[12px]">
        <p className="text-[#FFF] font-['SF_Pro_Display'] text-[16px] not-italic font-bold leading-[25px]">Workout name</p>
        <p className="text-[#A3926F] font-['Regio_Mono'] text-[13.125px] not-italic font-normal leading-[normal] pt-[5px]">10 Reps x 2 Sets</p>
      </div>
      <div className="relative top-[15px] w-px h-[49px] bg-[#0E0E0E] mix-blend-screen"></div>
      <p className="text-[#FFF] font-['SF_Pro_Display'] text-[12px] not-italic font-light leading-[normal] p-[20px]">Equipment</p>
    </div>
  );
};

export default Section;
