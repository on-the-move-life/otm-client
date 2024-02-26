import React from 'react';

const Loader = ({ className }) => {
  return (
      <div className={`text-green flex w-screen items-center justify-center text-2xl ${className !== undefined ? className : ' h-screen'}`}>
        LOADING...
      </div>
  );
};

export default Loader;
