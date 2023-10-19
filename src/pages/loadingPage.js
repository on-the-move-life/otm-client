import React from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const LoadingPage = () => {
  const divStyleTop = {
    backgroundColor: '#FA5757',
    borderRadius: '0px 0px 170px 30px',
    width: '390px',
    height: '436px',
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
  };

  const imageStyle = {
    position: 'absolute',
    width: '108px',
    height: '23.65px',
    top: '734px',
    left: '141px',
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="ml-2.5 h-28 w-28 bg-icon bg-no-repeat">
        <ProgressBar
          height="40"
          width="350"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
        <div style={divStyleTop}>
          <div style={contentStyle}>Prepping your repps! </div>
        </div>

        <div style={imageStyle}>
          <img src={'/assets/logo.svg'}></img>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
