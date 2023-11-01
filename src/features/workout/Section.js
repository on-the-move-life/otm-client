import React from 'react';
import Movement from './Movement';

const Section = ({ program: data }) => {
  const { name, format, movements } = data;
  return (
    <div className="bg-slate-50	pl-4">
      <div>
        <p className="font-['SF_Pro_Display'] text-[16px] font-bold not-italic leading-[25px] text-[#FFF]">
          {name}
        </p>
        <p className="pt-[5px] font-['Regio_Mono'] text-[13.125px] font-normal not-italic leading-[normal] text-[#A3926F]">
          {format}
        </p>
      </div>
      {movements.map((mvmt, index) => (
        <Movement key={index} mvmt={mvmt} />
      ))}
    </div>
  );
};

export default Section;
