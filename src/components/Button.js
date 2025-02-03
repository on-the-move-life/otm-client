import React from 'react';

const Button = ({ text, type = 'workout', action, style, disabled }) => {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className={`text-black ${type}-gradient-button mt-4 h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-semibold`}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
