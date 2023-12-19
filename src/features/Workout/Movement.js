import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { HiX } from 'react-icons/hi';
import ChartComponent from './ChartComponent';

Modal.setAppElement('#root');

const sectionWithLoadArray = ['ISO', 'MR', 'GYM', 'HYP'];

const Movement = ({ movement, sectionCode, movementLength }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedMvmtName, setSelectedMvmtName] = useState('');

  const openModal = (mvmt) => {
    setSelectedImage(mvmt.link[0]);
    setSelectedMvmtName(mvmt.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMvmtName('');
    setSelectedImage('');
  };

  return (
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
            {movement.personalRecord !== null && movement.personalRecord > 0 && (
              <span className="my-1 w-fit bg-floYellow p-1">
                Personal Record - {movement.personalRecord} kg
              </span>
            )}
            {movement.lastUsedLoad !== null && movement.lastUsedLoad > 0 && (
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
        <div className="flex justify-center" onClick={() => openModal(movement)}>
          <span className="w-fit rounded border bg-white p-1 text-center text-xs font-bold tracking-wider text-black">
            Tap for Details
          </span>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="flex h-screen w-screen flex-col bg-theme p-8"
        >
          <div className="flex justify-end">
            <span onClick={closeModal} className="close-button">
              <HiX size={20} />
            </span>
          </div>
          <div className="my-4 flex h-full flex-col  justify-around">
            <h3 className="workout-gradient-text text-center text-2xl">
              {selectedMvmtName.toLocaleUpperCase()}
            </h3>
            {sectionWithLoadArray.includes(sectionCode) &&
              movement.totalTimesPerformed > 0 && (
                <div className="flex flex-col">
                  <p className="my-8 rounded-lg border p-1 text-white">
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
            <img src={selectedImage} alt="Movement" />

            <button
              onClick={closeModal}
              className="workout-gradient-button mt-4 h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-bold text-black"
            >
              CLOSE
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Movement;
