import React, { useMemo } from 'react';
import info from './info.json';

const TrackSlider = ({ heading, detail, index }) => {
  const colors = useMemo(
    () => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'],
    [],
  );
  const headingColor = colors[index % colors.length];
  return (
    <div className="flex min-w-[300px] flex-col items-start justify-start gap-[2px]">
      <div className="w-full rounded-t-[12px] bg-[#1c1c1e] px-3 py-2">
        <h1
          className="text-[16px]"
          style={{ fontWeight: 600, color: headingColor }}
        >
          {heading}
        </h1>
      </div>
      <div className="w-full rounded-b-[12px] bg-[#1c1c1e] p-3">
        <p className="text-[14px] text-[#fff]" style={{ fontWeight: 500 }}>
          {detail}
        </p>
      </div>
    </div>
  );
};

const Track = () => {
  const { futureStrategies } = info.renewalReport;
  return (
    <div>
      <div className="mt-8 px-2 sm:mt-10 sm:px-10">
        <h1 className="purple-gradient font-sf-pro text-left text-[22.33px] sm:text-center sm:text-2xl">
          What More We Want to Track
        </h1>
        <p className="font-sf-pro mt-8 text-left text-sm text-white sm:px-32 sm:text-center sm:text-base">
          To take your fitness journey to the next level, we've got a few extra
          metrics to track that'll make you feel like a true{' '}
          <span className="text-[#7E87EF]">fitness superhero</span>
        </p>
      </div>
      <div className="flex w-full flex-col items-start justify-center">
        <div className="hide-scrollbar flex w-full flex-row gap-5 overflow-x-scroll px-4 py-8 sm:py-10">
          {futureStrategies?.map((item, index) => {
            return (
              <TrackSlider
                heading={item?.heading}
                detail={item?.details}
                index={index}
                key={item?.heading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Track;
