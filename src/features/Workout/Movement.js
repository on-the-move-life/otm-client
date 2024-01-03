import React from 'react';
import { useState } from 'react';
import MovementDetail from './MovementDetail.js';

const sectionWithLoadArray = ['ISO', 'MR', 'GYM', 'HYP'];

const Movement = ({ movement, sectionCode, movementLength }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <MovementDetail
          movement={movement}
          sectionCode={sectionCode}
          closeModal={closeModal}
        />
      )}

      {!isModalOpen && (
        <div className="card">
          <div
            className={`mb-8 flex h-[400px] ${
              movementLength > 1 ? 'w-[300px]' : 'w-[330px]'
            }  flex-col justify-between rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-lg`}
          >
            <div className="text-md flex justify-start px-2 text-lightGray">
              <span>{movement.fullName}</span>
            </div>
            {sectionWithLoadArray.includes(sectionCode) && (
              <div className="tags flex flex-col p-2 text-xs font-semibold -tracking-[0.36px] text-black">
                {movement.personalRecord !== null &&
                  movement.personalRecord > 0 && (
                    <span className="my-1 w-fit bg-floYellow p-1">
                      Personal Record - {movement.personalRecord} kg
                    </span>
                  )}
                {movement.lastUsedLoad !== null &&
                  movement.lastUsedLoad > 0 && (
                    <span className="my-1 w-fit bg-blue p-1">
                      Last Workout - {movement.lastUsedLoad} kg
                    </span>
                  )}
                {/* <span className="my-1 bg-floYellow p-1">Personal Record 24Kg</span>
            <span className="my-1 bg-blue p-1">Last Workout 12Kg</span> */}
              </div>
            )}
            <div
              className="flex h-fit w-full items-center justify-center p-2"
              style={{ maxHeight: '220px' }}
              onClick={() => openModal(movement)}
            >
              <img
                className="h-auto w-auto rounded-lg"
                style={{ maxHeight: '220px', maxWidth: '250px' }}
                src={movement.link[0]}
                alt="Movement"
              />
            </div>
            <div
              className="flex justify-center"
              onClick={() => openModal(movement)}
            >
              <span className="w-fit rounded border bg-white p-1 text-center text-xs font-bold tracking-wider text-black">
                Tap for Details
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movement;
