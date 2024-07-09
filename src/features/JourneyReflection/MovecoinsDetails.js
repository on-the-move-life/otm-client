import React from 'react';

const MovecoinsDetail = ({ apiData }) => {
  return (
    <div className="">
      <div className="px-4 mt-4 sm:mt-10 sm:px-10"></div>

      <div className="flex flex-col items-center ">
        <img src={'/assets/movecoinsgrouplogo.svg'}></img>

        <h1 className="font-sf-pro mt-5 flex gap-1 text-left text-[22.33px] sm:mt-8 sm:text-center sm:text-2xl">
          <span className="flex gap-2 px-1 font-semibold text-black border border-transparent rounded-md purple-gradient-background">
            {apiData?.data?.totalMovecoins}{' '}
          </span>{' '}
          <span className="purple-gradient"> Movecoins Earned!!</span>
        </h1>
      </div>
    </div>
  );
};

export default MovecoinsDetail;
