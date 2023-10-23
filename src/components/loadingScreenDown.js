import React from 'react';

const LoadingScreenDown = () => {
  const divStyle = {
    backgroundColor: '#5ECC7B',
    position: 'absolute',
    width: '390px',
    height: '436px',
    top: '410px',
    borderRadius: '0px 0px 170px 30px',
    transform: 'rotate(180deg)',
  };

  const contentStyle = {
    position: 'absolute',
    width: '258px',
    height: '120px',
    top: '189px',
    left: '34px',
    fontFamily: 'SF Pro Text',
    fontWeight: 700,
    fontSize: '50.67px',
    lineHeight: '60.46px',
    letterSpacing: '-0.54px',
    transform: 'rotate(180deg)',
  };

  const imageStyle = {
    position: 'absolute',
    width: '108px',
    height: '23.65px',
    top: '170px',
    left: '141px',
  };

  const logoImageStyle = {
    height: '225px',
    position: 'absolute',
    top: '205px',
    left: '125px',
    transform: 'rotate(180deg)',
    opacity: '0.2',
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div style={imageStyle}>
        <img src={'/assets/green-logo.svg'}></img>
      </div>
      <div style={divStyle}>
        <img
          // className="inline-flex h-[228px] w-64 items-center justify-center"
          style={logoImageStyle}
          src={'/assets/tlogo.svg'}
        ></img>
        <div style={contentStyle}>Fuelling your journey </div>
      </div>
    </div>
  );
};

export default LoadingScreenDown;
