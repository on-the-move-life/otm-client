import React  from 'react';
// import 

const LoadingScreenUp = () => {

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

  const iconImageStyle = {
    position: 'absolute',
    width: '108px',
    height: '23.65px',
    top: '734px',
    left: '141px',
  };

  const logoImageStyle = {
    height: '225px',
    position: 'absolute',
    top: '225px',
    left: '155px',
    opacity: '0.2'
  };


  return (
    <div className="flex h-screen w-screen items-center justify-center">
        <div style={divStyleTop}>
          <img
            // className="inline-flex h-[228px] w-64 items-center justify-center"
            style={logoImageStyle}
            src={'/assets/tlogo.svg'}
          ></img>
          <div style={contentStyle}>Prepping your repps! </div>
        </div>

        <div style={iconImageStyle}>
          <img src={'/assets/red-logo.svg'}></img>
        </div>
    </div>
  );
};

export default LoadingScreenUp;
