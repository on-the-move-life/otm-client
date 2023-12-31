import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ children }) => {
  return (
    <div className="h-screen flex w-screen flex-col items-center justify-evenly">
      <p className="text-xl">{children}</p>
      <Link to="/home" className="text-lg text-green underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Error;
