import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ children, className }) => {
  return (
    <div className={`h-screen flex flex-col items-center justify-evenly ${className !== undefined ? className : ' w-screen'}`}>
      <div className="text-xl">{children}</div>
      <Link to="/home" className="text-lg text-green underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Error;
