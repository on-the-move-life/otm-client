import React, { useMemo } from 'react';
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
  const data = [
    {
      id:1,
      heading:"Calorie Counting",
      detail:"We'll keep tabs on those delicious calories you're fueling up with, so you can optimise your diet and unlock your full power potential!",
    },
    {
      id:2,
      heading:"Step Tracker",
      detail:"Get ready to become a step-counting machine! We'll monitor your daily steps to ensure you're staying active and energised like a true fitness dynamo.",
    },
    {
      id:3,
      heading:"Performance Goals",
      detail:"It's time to set some epic performance targets, like crushing more Metcon rounds in record time or lifting weights that would make Thor jealous. These goals will keep you laser-focused and motivated to the max!",
    },
    {
      id:4,
      heading:"Feeling Fantastic",
      detail:"We want to know how you're feeling on this adventure – your energy levels, motivation, and overall awesomeness. This will help us fine-tune your journey for maximum enjoyment and satisfaction",
    },
  ]
  return (
    <div>
      <div className="px-2 sm:mt-10 mt-4 sm:px-10">
        <h1 className="purple-gradient font-sf-pro text-left text-[22.33px] sm:text-center sm:text-2xl px-4">
          What More We Want to Track
        </h1>
        <p className="font-sf-pro sm:mt-10 mt-4 text-left text-sm text-white sm:px-32 sm:text-center sm:text-base px-4">
          To take your fitness journey to the next level, we've got a few extra
          metrics to track that'll make you feel like a true{' '}
          <span className="text-[#7E87EF]">fitness superhero :</span>
        </p>
      </div>
      <div className="flex w-full flex-col items-start justify-center">
        <div className="hide-scrollbar flex w-full flex-row gap-5 overflow-x-scroll px-4 py-4 sm:py-4">
          {data?.map((item, index) => {
            return (
              <TrackSlider
                heading={item?.heading}
                detail={item?.detail}
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
