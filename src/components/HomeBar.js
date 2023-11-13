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
    <div className="fixed bottom-0 h-[139px] w-[358px] flex-shrink-0 bg-[rgba(0,_0,_0,_0.85)] backdrop-blur-[37px] backdrop-filter">

      <div className="relative left-7 flex h-[49px] w-[290px] justify-between pt-5">
        <img src={'/assets/home.svg'}></img>
        <img src={'/assets/stats.svg'}></img>
        <img src={'/assets/community.svg'}></img>
        <img src={'/assets/setting.svg'}></img>
      </div>
    </div>
  );
};

export default HomeBar;
