import React, { useState, useEffect } from 'react';

const Counter = ({ currentValue = 56 }) => {
  const [animationDuration, setAnimationDuration] = useState('10s');
  const [digits, setDigits] = useState([]);
  // const [secondIndicator, setSecondIndicator] = useState([]);
  // const [minuteIndicator, setMinuteIndicator] = useState([]);

  useEffect(() => {
    const numberOfDigits = currentValue.toString().length;
    setAnimationDuration(`${numberOfDigits * 10}s`);
    getCounterDigits(currentValue);
  }, []);

  const getCounterDigits = (value) => {
    const incrementedValue = String(Number(value) + 1)

    const inputDigitsValue = value.toString().split('').map(Number)
    const incrementedDigitsValue = incrementedValue.toString().split('').map(Number);

    inputDigitsValue.reverse();
    incrementedDigitsValue.reverse();

    incrementedDigitsValue.map((value, index) => {
      if (index === inputDigitsValue.length) {
        setDigits(prev => [...prev, ['', incrementedDigitsValue[index]]])
      }
      else {
        setDigits(prev => [...prev, [inputDigitsValue[index], incrementedDigitsValue[index]]])
      }
    })
  };

  const renderCounterBoxes = () => {
    return digits.reverse().map((digit, index) => (
      <div key={index} className="countdown__box">
        <div className="countdown__inner">
          {
            digit.map((value, i) => {
              return <span key={index + '' + i}>{value}</span>
            })
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