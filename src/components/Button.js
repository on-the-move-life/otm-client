import React from 'react';

const Button = ({ text, type = 'workout', action, style }) => {
  return (
    <button
      onClick={action}
      className={`${type}-gradient-button mt-4 h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-semibold text-black`}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
