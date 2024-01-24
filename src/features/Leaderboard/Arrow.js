import React from 'react';

const Arrow = ({ value }) => {
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
  const arrowText = value !== 0 ? (isPositive ? `+${value}` : `${value}`) : '';

  return (
    <div className="mr-2 mr-3 inline-flex h-7 w-4 flex-col items-center justify-start">
      <div className="relative origin-top-left">{arrowImage}</div>
      <div
        className={`text-${
          isPositive ? 'rose' : 'green'
        }-500 text-sm font-bold lowercase tracking-tight`}
      >
        {arrowText}
      </div>
    </div>
  );
};

export default Arrow;
