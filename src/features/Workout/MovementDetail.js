import React from 'react';
import { HiX } from 'react-icons/hi';
import ChartComponent from './ChartComponent';

const sectionWithLoadArray = ['ISO', 'MR', 'STR', 'HYP'];

const MovementDetail = ({ movement, sectionCode, closeMovementDetail }) => {
  const selectedImage = movement.link[0];
  const selectedMvmtName = movement.name;

  const handleCloseModal = () => {
    closeMovementDetail();
  };

  return (
    <div
      className="flex h-screen w-screen flex-col overflow-x-hidden bg-[#141414] px-4 pb-32 pt-8"
      style={{ maxHeight: 'content-fit' }}
    >
      <div className=" flex justify-end">
        <span
          onClick={handleCloseModal}
          className="rounded-full bg-[#202020] p-2"
        >
          <HiX size={20} />
        </span>
      </div>
      <div className="my-4 flex h-full flex-col justify-around px-8 ">
        <h3 className="text-center text-3xl text-white ">{selectedMvmtName}</h3>
        {sectionWithLoadArray.includes(sectionCode) &&
          movement.totalTimesPerformed > 0 && (
            <div className="flex flex-col">
              <p className="my-8 rounded-lg border p-1 text-center text-white">
                You have done this exercise{' '}
                <span className="text-green">
                  {movement.totalTimesPerformed}{' '}
                </span>
                {movement.totalTimesPerformed === 1 ? 'time' : 'times'}
              </p>
              <ChartComponent data={movement} />
              <p className=" my-4 text-center text-base">
                Your personal record is{' '}
                <span className="rounded-lg bg-floYellow p-0.5 font-bold text-black">
                  {movement.personalRecord} {''}KG
                </span>
              </p>
            </div>
          )}
        <div className="flex h-[216px] w-full items-center justify-center ">
          <img
            className="my-4  h-full rounded-2xl"
            src={selectedImage}
            alt="Movement"
          />
        </div>

        <button
          onClick={closeMovementDetail}
          className="workout-gradient-button mt-10 h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-bold text-black"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default MovementDetail;
