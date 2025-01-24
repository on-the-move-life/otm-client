import React from 'react';

const Loader = ({ className }) => {
  return (
    <div
      className={` flex w-full flex-row items-center justify-center ${
        className !== undefined ? className : 'h-screen'
      }`}
    >
      <div class="loader">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  );
};

export default Loader;
