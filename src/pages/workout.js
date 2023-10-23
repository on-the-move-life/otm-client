import React from 'react';
import HomeBar from '../components/homeBar';
import Section from '../components/section';

const Workout = () => {
  const containerStyle = {};

  const sectionContainerStyle = {
    // width: '920px',
    // height: '920px',
    flexShrink: 0,
    // borderRadius: '920px',
    // background: 'rgba(163, 146, 111, 0.15)',
    // filter: 'blur(199.13499450683594px)',
  };
  const sectionHeaderStyle = {
    color: '#FFF',
    fontFamily: 'SF Pro Display',
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px',
  };

  const roundStyle = {
    color: '#A3926F',
    fontFamily: 'SF Pro Text',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '20px',
  };

  const homeContentStyle = {
    color: 'var(--Gold, #A3926F)',
    fontFamily: 'SF Pro Text',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    paddingLeft: '10px',
  };

  const workoutContentStyle = {
    color: 'var(--White, #FFF)',
    fontFamily: 'SF Pro Display',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '40px',
  };

  const focusContentStyle = {
    color: 'var(--White, #FFF)',
    fontFamily: 'SF Pro Display',
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px',
    paddingTop: '2px',
  };

  const strengthContentStyle = {
    color: 'var(--Gold, #A3926F)',
    fontFamily: 'SF Pro Display',
    fontSize: '31.565px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '45.913px',
    padding: '10px 0 10px 0',
  };

  const topDivStyle = {
    'background-image': "url('/assets/workout-top.png')",
    background:
      'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.87) 20.83%, rgba(0, 0, 0, 0.71) 45.47%, rgba(0, 0, 0, 0.72) 68.01%, rgba(0, 0, 0, 0.42) 100%)',
    // width: '390px',
    // height: '233px',
  };

  return (
    <div style={containerStyle}>
      <div style={topDivStyle}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src={'/assets/chevron.left.svg'}></img>
          <p style={homeContentStyle}>Home</p>
        </div>

        <p style={workoutContentStyle}>Workout</p>
        <p style={focusContentStyle}>Today's focus</p>
        <p style={strengthContentStyle}>STRENGTH</p>
      </div>
      <p style={sectionHeaderStyle}>Section</p>
      <p style={roundStyle}>2 rounds</p>
      <div style={sectionContainerStyle}>
        <Section />
        <Section />
        <Section />
        <Section />
      </div>
      <HomeBar />
    </div>
  );
};

export default Workout;
