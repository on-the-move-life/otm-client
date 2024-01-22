import React, { useState, useEffect } from 'react';

const Counter = ({ currentValue = 56 }) => {
  const [animationDuration, setAnimationDuration] = useState('10s');
  const [secondIndicator, setSecondIndicator] = useState([]);
  const [minuteIndicator, setMinuteIndicator] = useState([]);

  useEffect(() => {
    const numberOfDigits = currentValue.toString().length;
    setAnimationDuration(`${numberOfDigits * 10}s`);
    getCounterDigits(currentValue);
    console.log(secondIndicator)
  }, []);

  const getCounterDigits = (value) => {
    const digits = value.toString().split('').map(Number);
    setSecondIndicator(prevValue => [...prevValue, digits[1], (digits[1] + 1) % 10]);
    if ((digits[1] + 1) % 10 === 0) {
      // increment the minute indicator value
      setMinuteIndicator(prevValue => [...prevValue, digits[0], digits[0] + 1]);
    }
    else {
      setMinuteIndicator(prevValue => [...prevValue, digits[0]]);
    }
  };

  const renderCounterBoxes = () => {
    return [...Array(2)].map((digit, index) => (
      <div key={index} className="countdown__box">
        <div className="countdown__inner">
          {
            index === 1 ?
              secondIndicator.map((second, i) => (
                <span key={i}>{second}</span>
              ))
              :
              minuteIndicator.map((minute, i) => (
                <span key={i}>{minute}</span>
              ))
          }
        </div>
      </div>
    ));
  };



  return (
    <>
      <div className="countdown__wrapper counter">
        <div
          className="countdown countdown__seconds"
          style={{
            animation: `a-countdown ${animationDuration} linear`,
          }}
        >
          {renderCounterBoxes()}
        </div>
      </div>
    </>
  );
};

export default Counter;