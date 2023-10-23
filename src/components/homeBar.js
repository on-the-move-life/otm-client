import React from 'react';

const HomeBar = () => {
  const containerStyle = {
    width: '390px',
    height: '139px',
    flexShrink: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(37px)',
    // padding: '5px'
  };
  const startDivStyle = {
    width: '358px',
    height: '49px',
    flexShrink: 0,
    borderRadius: '12px',
    background: '#A3926F',
    mixBlendMode: 'screen',
  };
  const startContentStyle = {
    position: 'relative',
    top: '10px',
    left:'150px',
    color: '#000',
    fontFamily: 'SF Pro Display',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
  };
  const iconDivStyle = {
    position:'relative',
    left: '20px',
    display: 'flex',
    'justify-content': 'space-between',
    width: '320px',
    height: '49px',
    paddingTop: '15px'
  };
  return (
    <div style={containerStyle}>
      <div style={startDivStyle}>
        <p style={startContentStyle}>Start</p>
      </div>
      <div style={iconDivStyle}>
        <img src={'/assets/home.svg'}></img>
        <img src={'/assets/stats.svg'}></img>
        <img src={'/assets/community.svg'}></img>
        <img src={'/assets/setting.svg'}></img>
      </div>
    </div>
  );
};

export default HomeBar;
