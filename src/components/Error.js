import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ children, className, showButton = true }) => {
  return (
    <div
      className={`flex h-screen flex-col items-center justify-evenly ${
        className !== undefined ? className : ' w-screen'
      }`}
    >
      <div className="text-xl text-center">{children}</div>
      {showButton && (
        <Link to="/home" className="text-lg underline text-green">
          Go Back to Home
        </Link>
      )}
    </div>
  );
};

export default Error;
