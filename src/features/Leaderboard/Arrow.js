import { toInteger } from 'lodash';
import React from 'react';

const Arrow = ({ value, showDecimalValue=true }) => {
  const isPositive = value > 0;
  const arrowImage =
    value !== 0 ? (
      <img
        src={isPositive ? '/assets/upArrow.svg' : '/assets/downArrow.svg'}
        alt={isPositive ? 'Up Arrow' : 'Down Arrow'}
      />
    ) : (
      <div className="bg-white-300 h-7 w-4" />
    );
  const arrowText = value !== 0 ? (isPositive ? `+${showDecimalValue ? value?.toFixed(1) : toInteger(value)}` : `${showDecimalValue ? value?.toFixed(1) : toInteger(value)}`) : '';

  return (
    <div className="mr-2 inline-flex h-7 w-4 flex-col items-center justify-start">
      <div className="relative origin-top-left w-3 h-3">{arrowImage}</div>
      <div
        className={`text-${
          isPositive ? 'green' : 'red'
        } text-[10px] font-bold lowercase tracking-tight`}
      >
        {arrowText}
      </div>
    </div>
  );
};

export default Arrow;
