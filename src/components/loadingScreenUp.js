import React from 'react';

const LoadingScreenUp = () => {
  return (
    <div className="w-[390px] h-[844px] relative bg-black rounded-[33px]">
      <div className="h-1/2 w-96 rounded-bl-[30px] rounded-br-[170px] rounded-tl-[33px] rounded-tr-[33px] bg-[#FA5757]">
        <img
          className="absolute left-40 top-56 h-56 opacity-40"
          src={'/assets/tlogo.svg'}
          alt='tlogo'
        ></img>
        <div className="relative left-12 top-44 h-32 w-64 font-['SF_Pro_Text'] text-[#560F0F] text-5xl font-bold leading-[60.46px] tracking-[-0.54px]">
          Prepping your reps!
        </div>
      </div>

      <div className="relative left-36 top-64">
        <img src={'/assets/red-logo.svg'} alt='red-logo'/>
      </div>
    </div>
  );
};

export default LoadingScreenUp;
