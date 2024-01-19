import React from 'react';

const Arrow = (value, direction) => {
  return (
    <>
      <div class="inline-flex h-[27.62px] w-[15.62px] flex-col items-center justify-start">
        <div class="relative h-[15.62px] w-[15.62px] origin-top-left -rotate-180"></div>
        <div class="text-rose-500 text-[9.80px] font-bold lowercase tracking-tight">
          {value}
        </div>
      </div>
    </>
  );
};

export default Arrow;
