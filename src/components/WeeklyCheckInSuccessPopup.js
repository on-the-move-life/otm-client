// src/components/WeeklyCheckInSuccessPopup.js
import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io'; // Make sure to install react-icons if you haven't already

const WeeklyCheckInSuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-md rounded-md bg-gradient-to-b from-gradientStart to-gradientEnd p-6 shadow-lg">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-black hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="mb-4 anton-black text-lg sm:text-xl md:text-2xl">Weekly Check-In Recorded</h2>
          <p className="mb-6 font-sfpro text-xs sm:text-sm leading-tight text-black max-w-[280px]">
            This Week's Weekly CheckIn Successfully Recorded
          </p>
          <Link
            to="/home"
            onClick={onClose}
            className="rounded-full bg-black py-3 px-6 font-sfpro text-sm font-semibold text-white hover:bg-opacity-90 transition duration-300 whitespace-nowrap"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCheckInSuccessPopup;