import React from 'react';

const HomeBar = () => {
  const containerStyle = {
    width: '358px',
    height: '139px',
    flexShrink: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(37px)',
    // padding: '5px'
  };

  return (
    <div className="h-[139px] w-[358px] flex-shrink-0 bg-[rgba(0,_0,_0,_0.85)] backdrop-blur-[37px] backdrop-filter">
      <div className="h-[49px] w-[290px] flex-shrink-0 rounded-[12px] bg-[#A3926F] mix-blend-screen">
        <p className="relative left-[125px] top-[12px] font-['SF_Pro_Display'] text-[20px] font-medium not-italic leading-[normal] text-[#000]">
          Start
        </p>
      </div>
      <div className="relative left-[10px] flex h-[49px] w-[275px] justify-between pt-[15px]">
        <img src={'/assets/home.svg'}></img>
        <img src={'/assets/stats.svg'}></img>
        <img src={'/assets/community.svg'}></img>
        <img src={'/assets/setting.svg'}></img>
      </div>
    </div>
  );
};

export default HomeBar;
