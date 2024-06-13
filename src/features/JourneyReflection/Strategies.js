import React, { useMemo } from 'react';

const StrategiesSlider = ({ heading, detail, index }) => {
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

const Strategies = ({apiData}) => {
  return (
    <div>
      <div className="sm:mt-10 mt-4 flex w-full flex-col items-start justify-center">
        <h1
          className="purple-gradient w-full px-6 text-left text-[22.33px] sm:text-center sm:text-3xl"
          style={{ lineHeight: '40px', marginBlock: '10px' }}
        >
          Strategies To Build
        </h1>
        <div className="hide-scrollbar flex w-full flex-row gap-5 overflow-x-scroll px-4">
          {apiData?.data?.futureStrategies?.map((item, index) => {
            return (
              <StrategiesSlider
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

export default Strategies;
