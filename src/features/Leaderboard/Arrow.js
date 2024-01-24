import React from 'react';

const Arrow = ({ value }) => {
  const isPositive = value > 0;

  return (
    <>
      <div className="inline-flex h-7 w-4 flex-col items-center justify-start">
        <div className="relative h-7 w-4 origin-top-left">
          {value !== 0 ? (
            <img
              src={isPositive ? '/assets/upArrow.svg' : '/assets/downArrow.svg'}
              alt={isPositive ? 'Up Arrow' : 'Down Arrow'}
            />
          ) : (
            <div className="bg-white-300 h-7 w-4" />
          )}
        </div>
        <div
          className={`text-${
            isPositive ? 'rose' : 'green'
          }-500 text-sm font-bold lowercase tracking-tight`}
        >
          {value !== 0 ? (isPositive ? `+${value}` : `${value}`) : ''}
        </div>
      </div>
    </>
  );
};

export default Arrow;
