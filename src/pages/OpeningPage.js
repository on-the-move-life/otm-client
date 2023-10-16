import React from 'react';
import { Link } from 'react-router-dom';

const OpeningPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="bg-icon ml-2.5 h-28 w-28 bg-no-repeat"></div>
      <Link to="/login" className="continueButton text-center bg-green">
        GET STARTED
      </Link>
    </div>
  );
};

export default OpeningPage;
