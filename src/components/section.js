import React from 'react';

const Section = (props) => {
  const divStyle = {
    display: 'flex',
    borderRadius: '12px',
    background: 'rgba(63, 63, 63, 0.30)',
    mixBlendMode: 'screen',
    width: '358px',
    height: '76px',
    flexShrink: 0,
    margin: '10px 0 10px 0'
  };

  const workoutTextStyle = {
    color: '#FFF',
    fontFamily: 'SF Pro Display',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '25px',
  };

  const equipmentTextStyle = {
    color: '#FFF',
    fontFamily: 'SF Pro Display',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
    padding: '20px',
    // borderLeft: '1px solid white'
  };

  const repsStyle = {
    color: '#A3926F',
    fontFamily: 'Regio Mono',
    fontSize: '13.125px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    paddingTop: '5px',
  };

  const imageStyle = {
    width: '109px',
    height: '76px',
    flexShrink: 0,
    borderRadius: '12px 0 0 12px',
  };

  const middleDivStyle = {
    padding: '15px',
  };

  const lineDivStyle = {
    position: 'relative',
    top: '15px',
    width: '1px',
    height: '49px',
    background: '#0E0E0E',
    mixBlendMode: 'screen',
  };
  return (
    <div style={divStyle}>
      <img src={'/assets/workout.png'} style={imageStyle}></img>
      <div style={middleDivStyle}>
        <p style={workoutTextStyle}>Workout name</p>
        <p style={repsStyle}>10 Reps x 2 Sets</p>
      </div>
      <div style={lineDivStyle}></div>
      <p style={equipmentTextStyle}>Equipment</p>
    </div>
  );
};

export default Section;
