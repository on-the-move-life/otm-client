import React, { useState } from 'react';

const JourneyScreen = ({ id }) => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="relative z-20 h-screen w-screen overflow-y-scroll bg-black">
      <img
        src="/assets/weekly-checkin-intro.png"
        className=" w-full object-cover"
        onLoad={() => setShowComponent(true)}
        alt="intro_image"
      />
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        class="absolute top-0 z-50 h-screen  w-full brightness-75 saturate-150 filter  "
        alt="background"
      />
      <div className="text-offWhite-opacity-1 absolute left-4 top-[80px] flex gap-3 text-[20px]">
        <img src="/assets/otm-small-white-logo.svg" className="h-[30px]" />
        Craft Your Journey
      </div>
      {showComponent && (
        <div className="animate-fadeIn  relative z-[60]  px-4  transition-opacity duration-1000">
          <div className={`flex ${id !== 'evolve' && 'gap-2'} `}>
            <img
              src={
                id === 'evolve'
                  ? 'assets/v-sign-light.svg'
                  : 'assets/muscle-star-color.svg'
              }
              className={` ${id === 'evolve' && 'h-[30px] w-[30px]'}  `}
            />
            <div className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text font-futura text-2xl uppercase text-transparent">
              {id === 'evolve' ? 'evolve' : 'Ultimate Shred'}
            </div>
          </div>

          <div className="mb-[80px] mt-[30px]">
            <div className="text-[10px] text-white-opacity-50">
              Usually takes 5 mins
            </div>
            <p className="text-offWhite-opacity-70 mt-[6px] font-sfpro text-[20px]">
              Take a{' '}
              <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent">
                {' '}
                quick questionnaire
              </span>{' '}
              so we can understand you better and deliver results aligned with{' '}
              <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent">
                your unique goals.
              </span>{' '}
              It only takes a few minutes to unlock a more{' '}
              <span className="bg-gradient-to-r from-lightPurple to-blue bg-clip-text text-transparent">
                personalised journey!
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyScreen;
