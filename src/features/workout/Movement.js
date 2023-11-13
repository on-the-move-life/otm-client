import React from 'react';

const Movement = ({ mvmt }) => {
  const { name, count, reps } = mvmt;
  return (
    <div className="mx-[0] my-[10px] flex h-[76px] w-[358px] flex-shrink-0 rounded-[12px] bg-[rgba(63,_63,_63,_0.30)] mix-blend-screen">
      <img
        src={'/assets/workout.png'}
        className="h-[76px] w-[109px] flex-shrink-0 rounded-bl-[12px] rounded-br-[0] rounded-tl-[12px] rounded-tr-[0]"
      ></img>
      <div className="p-[15px]">
        <p className="font-['SF_Pro_Display'] text-[16px] font-bold not-italic leading-[25px] text-[#FFF]">
          {name}
        </p>
        <p className="pt-[5px] font-['Regio_Mono'] text-[13.125px] font-normal not-italic leading-[normal] text-[#A3926F]">{`${reps} Reps x ${count} Sets`}</p>
      </div>
      <div className="relative top-4 right-2 h-[49px] w-px bg-[#0E0E0E] mix-blend-screen"></div>
      <p className="p-[20px] font-['SF_Pro_Display'] text-[12px] font-light not-italic leading-[normal] text-[#FFF]">
        Equipment
      </p>
    </div>
  );
};

export default Movement;
