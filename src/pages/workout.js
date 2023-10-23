import React from 'react';
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
  return (
    <div style={containerStyle}>
      <p style={sectionHeaderStyle}>Section</p>
      <p style={roundStyle}>2 rounds</p>
      <div style={sectionContainerStyle}>
        <Section />
        <Section />
        <Section />
        <Section />
      </div>
    </div>
  );
};

export default Workout;
