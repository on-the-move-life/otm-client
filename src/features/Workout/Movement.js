import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { ChartComponent } from '../../components';
import { HiX } from 'react-icons/hi';

Modal.setAppElement('#root');

const Movement = ({ movement, code, movementLength }) => {
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
        className={`mb-8 flex h-[380px] ${
          movementLength > 1 ? 'w-[300px]' : 'w-[330px]'
        }  flex-col justify-between rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-lg`}
        onClick={() => openModal(movement)}
      >
        <div className="text-md h-1/12 flex justify-start px-2 text-lightGray">
          <span>{movement.fullName}</span>
        </div>
        {(code === 'STR' ||
          code === 'MR' ||
          code === 'HYP' ||
          code === 'ISO') && (
          <div className="tags h-1/12 space-x-2 p-2 text-xs font-semibold -tracking-[0.36px] text-black">
            {movement.personalRecord !== undefined && movement.personalRecord !== null &&  (
            <span className="my-1 bg-floYellow p-1">
              Personal Record - {movement.personalRecord}
            </span>
          )}
          {movement.lastUsedLoad !== undefined && movement.lastUsedLoad !== null &&(
            <span className="my-1 bg-blue p-1">
              Last Workout - {movement.lastUsedLoad}
            </span>
          )}
            {/* <span className="my-1 bg-floYellow p-1">Personal Record 24Kg</span>
            <span className="my-1 bg-blue p-1">Last Workout 12Kg</span> */}
          </div>
        )}
        <div
          className="h-fit w-full flex items-center justify-center p-2"
          style={{ maxHeight: '220px' }}
        >
          <img
            className="h-auto w-auto rounded-lg"
            style={{ maxHeight: '220px', maxWidth: '250px' }}
            src={movement.link[0]}
            alt="Movement"
          />
        </div>
        <div className="flex justify-center">
          <span className="w-fit rounded border bg-white p-0.5 text-center text-xs font-bold tracking-wider text-black">
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
          <h3 className="workout-gradient-text py-4 text-center text-2xl">
            {selectedMvmtName}
          </h3>
          <p className="rounded-lg border p-1 text-white">
            You have done this exercise <span className="text-green">32</span>{' '}
            times
          </p>
          <div className="flex h-full flex-col items-center justify-around">
            <ChartComponent />

            <img src={selectedImage} alt="Movement" />

            <button
              onClick={closeModal}
              className="workout-gradient-button h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-bold text-black"
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
