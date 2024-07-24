import { isInteger, toInteger } from 'lodash';
import React from 'react';

const Arrow = ({ value }) => {
  const isPositive = value > 0;
  const integer = isInteger(value);
  const arrowImage =
    value !== 0 ? (
      <img
        src={isPositive ? '/assets/upArrow.svg' : '/assets/downArrow.svg'}
        alt={isPositive ? 'Up Arrow' : 'Down Arrow'}
      />
    ) : (
      <div className="w-4 bg-white-300 h-7" />
    );
  const arrowText =
    value !== 0
      ? isPositive
        ? `+${!integer ? value?.toFixed(1) : toInteger(value)}`
        : `${!integer ? value?.toFixed(1) : toInteger(value)}`
      : '';

  return (
    <div className="inline-flex flex-col items-center justify-start w-4 mr-2 h-7">
      <div className="relative w-3 h-3 origin-top-left">{arrowImage}</div>
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
