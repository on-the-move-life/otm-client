import React from 'react';

const Button = ({ text, type="workout", action }) => {
  return (
    <button
      onClick={action}
      className={`${type}-gradient-button uppercase mt-4 h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-bold text-black`}
    >
      {text}
    </button>
  );
};

export default Button;
