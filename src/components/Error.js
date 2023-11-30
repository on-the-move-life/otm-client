import React from 'react';

const Error = ({ children }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
};

export default Error;
