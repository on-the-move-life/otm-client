import React from 'react';

const LoadingScreenUp = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="h-1/2 w-96 rounded-bl-[30px] rounded-br-[170px] bg-[#FA5757]">
        <img
          className="absolute left-40 top-56 h-56 opacity-40"
          src={'/assets/tlogo.svg'}
          alt="tlogo"
        ></img>
        <div className="relative left-12 top-44 h-32 w-64 font-['SF_Pro_Text'] text-5xl font-bold leading-[60.46px] tracking-[-0.54px] text-[#560F0F]">
          Prepping your reps!
        </div>
      </div>

      <div className="relative left-36 top-64">
        <img src={'/assets/red-logo.svg'} alt="red-logo" />
      </div>
    </div>
  );
};

export default LoadingScreenUp;
