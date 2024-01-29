import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [animationDuration, setAnimationDuration] = useState('10s');
  const [digits, setDigits] = useState([]);

  useEffect(() => {
    let totalWorkouts = localStorage.getItem('workouts');
    if (totalWorkouts && !totalWorkouts.includes('undefined')) {
      totalWorkouts = JSON.parse(totalWorkouts);
      console.log(totalWorkouts, 'total workouts');
    }

    const numberOfDigits = totalWorkouts.toString().length;
    setAnimationDuration(`${numberOfDigits * 10}s`);
    getCounterDigits(totalWorkouts);
  }, []);

  const getCounterDigits = (value) => {
    const incrementedValue = String(Number(value) + 1);

    // splitting the number into array of it's digits
    const inputDigitsValue = value.toString().split('').map(Number);
    const incrementedDigitsValue = incrementedValue
      .toString()
      .split('')
      .map(Number);

    // single digit number prefixed with 0
    if (inputDigitsValue.length === 1) {
      inputDigitsValue.unshift(0);
    }
    if (incrementedDigitsValue.length === 1) {
      incrementedDigitsValue.unshift(0);
    }

    // reverse the arrys to start iteration from unit place digit
    inputDigitsValue.reverse();
    incrementedDigitsValue.reverse();

    // creating a mapping between the original and incremented values
    incrementedDigitsValue.map((value, index) => {
      if (index === inputDigitsValue.length) {
        setDigits((prev) => [...prev, ['', incrementedDigitsValue[index]]]);
      } else {
        if (inputDigitsValue[index] === incrementedDigitsValue[index]) {
          setDigits((prev) => [...prev, [inputDigitsValue[index]]]);
        } else
          setDigits((prev) => [
            ...prev,
            [inputDigitsValue[index], incrementedDigitsValue[index]],
          ]);
      }
    });
  };

  const renderCounterBoxes = () => {
    return digits.reverse().map((digit, index) => (
      <div key={index} className="countdown__box">
        <div className="countdown__inner">
          {digit.map((value, i) => {
            return <span key={index + '' + i}>{value}</span>;
          })}
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
