import React from 'react';

const Button = ({ text, type, action }) => {
  return (
    <button
      onClick={action}
      className="workout-gradient-button uppercase mt-4 h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] text-black"
    >
      {text}
    </button>
  );
};

export default Button;
