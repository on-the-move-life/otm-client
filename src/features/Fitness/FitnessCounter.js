import React, { useState, useEffect } from 'react';

const FitnessCounter = ({ currentValue }) => {
  return (
    <>
      <div
        className="countdown__inner__sec"
        style={{
          animation: `a-countdown ${2} linear`,
        }}
      >
        {currentValue}
      </div>
    </>
  );
};

export default FitnessCounter;
