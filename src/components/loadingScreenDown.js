import React from 'react';

const LoadingScreenDown = () => {
  return (
    <div className="h-screen w-screen rounded-t-3xl">
      <div className="absolute left-36 top-36 h-[23.65px] w-[108px]">
        <img src={'/assets/green-logo.svg'} alt="green-logo"></img>
      </div>
      <div className="absolute bottom-0 h-[436px] w-[390px] rotate-180 rounded-bl-[30px] rounded-br-[170px] bg-[#5ECC7B]">
        <img
          className="absolute left-32 top-52 h-56 rotate-180 opacity-20"
          src={'/assets/tlogo.svg'}
          alt="tlogo"
        ></img>
        <div className="absolute left-8 top-[189px] h-[120px] w-[258px] rotate-180 font-['SF_Pro_Text'] text-[50.67px] font-bold leading-[60.46px] tracking-[-0.54px] text-[#0A3A17]">
          Fuelling your journey
        </div>
      </div>
    </div>
  );
};

export default LoadingScreenDown;
