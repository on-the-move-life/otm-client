import React from 'react';

const LifestyleDesignBanner = () => {
  return (
    <div className="mb-2 flex w-auto items-center justify-between rounded-md bg-gradient-to-b from-gradientStart to-gradientEnd p-1">
      {/* elem 1 */}
      <img src="/assets/ldbannerleft.svg" alt="lifestyle design banner" />

      <div className="flex font-sfpro  text-sm font-semibold leading-none text-black">
        <img
          className="mr-1"
          src="/assets/ldbannertime.svg"
          alt="lifestyle design banner"
        />
        Routine Tracking Coming Soon!
      </div>

      {/* elem 4 */}
      <img src="/assets/ldbannerright.svg" alt="lifestyle design banner" />
    </div>
  );
};

export default LifestyleDesignBanner;
