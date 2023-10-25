import React from 'react';

const LoadingScreenUp = () => {
  return (
    <div className="h-[830px] w-[390px] rounded-tl-[33px] rounded-tr-[33px]">
      <div className="h-[436px] w-[390px] rounded-bl-[30px] rounded-br-[170px] rounded-tl-[33px] rounded-tr-[33px] bg-[#FA5757]">
        <img
          className="absolute left-[155px] top-[225px] h-[225px] opacity-40"
          src={'/assets/tlogo.svg'}
        ></img>
        <div className="relative left-[15px] top-[189px] h-[120px] w-[258px] font-['SF_Pro_Text'] text-[#560F0F] text-[50.67px] font-bold leading-[60.46px] tracking-[-0.54px]">
          Prepping your repps!
        </div>
      </div>

      <div className="absolute left-[141px] top-[730px] h-[23.65px] w-[108px]">
        <img src={'/assets/red-logo.svg'}></img>
      </div>
    </div>
  );
};

export default LoadingScreenUp;
