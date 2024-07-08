import React from 'react';

const MovecoinsDetail = ({ apiData }) => {
  return (
    <div>
      <div className="px-4 mt-4 sm:mt-10 sm:px-10">
        <h1 className="purple-gradient font-sf-pro mt-2 text-left text-[22.33px] sm:mt-8 sm:text-center sm:text-2xl">
          MoveCoins
        </h1>
      </div>

      <div>
        <p className="px-4 mt-6 text-sm text-left font-sf-pro sm:px-32 sm:text-center sm:text-base">
          {apiData?.data?.summary}
        </p>
      </div>
    </div>
  );
};

export default MovecoinsDetail;
