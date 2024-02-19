import React from 'react';

const Loader = ({ className }) => {
  console.log('className', className);
  return (
    className !== undefined ?
      <div className={"text-green flex w-screen items-center justify-center text-2xl " + className}>
        LOADING...
      </div> :
      <div className="text-green flex h-screen w-screen items-center justify-center text-2xl ">
        LOADING...
      </div>
  );
};

export default Loader;
