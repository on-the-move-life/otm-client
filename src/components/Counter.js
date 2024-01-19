import React, { useState, useEffect } from 'react';

const Counter = ({ currentValue = 56 }) => {
  const [animationDuration, setAnimationDuration] = useState('10s');

  useEffect(() => {
    const numberOfDigits = currentValue.toString().length;
    setAnimationDuration(`${numberOfDigits * 10}s`);
  }, [currentValue]);

  const getCounterDigits = (value) => {
    return value.toString().split('').map(Number);
  };

  const renderCounterBoxes = () => {
    const digits = getCounterDigits(currentValue);

    return digits.map((digit, index) => (
      <div key={index} className="countdown__box">
        <div className="countdown__inner">
          {[...Array(10)].map((_, i) => (
            <span key={i}>{(digit + i) % 10}</span>
          ))}
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
