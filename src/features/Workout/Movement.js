import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import ChartComponent from './ChartComponent';

Modal.setAppElement('#root');

const includeLoadSections = ['ISO', 'MR', 'GYM', 'HYP'];

const Movement = ({ movement, sectionCode }) => {
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
    <>
      <div
        className="h-68 mb-8 w-full flex-col items-start justify-between rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-2 text-lg"
        onClick={() => openModal(movement)}
      >
        <div className="text-md h-1/12 px-4 text-lightGray">
          <span>{movement.fullName}</span>
        </div>
        <div className="h-11/12 w-full items-center justify-center p-2">
          <img
            className="h-full w-full rounded-lg"
            src={movement.link[0]}
            alt="Movement"
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          // style={customStyles}
          className=" h-screen w-screen  bg-black p-8"
        >
          <div className=" flex justify-end">
            <span onClick={closeModal} className="close-button">
              X
            </span>
          </div>
          <div className="flex flex-col justify-around ">
            <h3 className="workout-gradient-text my-8 text-center text-2xl">
              {selectedMvmtName.toLocaleUpperCase()}
            </h3>
            {includeLoadSections.includes(sectionCode) &&
              movement.totalTimesPerformed && (
                <div className="flex flex-col">
                  <p className="workout-gradient-text my-2 text-center text-base">
                    You have done this exercise {movement.totalTimesPerformed}{' '}
                    {''}times
                  </p>
                  <ChartComponent data={movement} />
                  <p className="workout-gradient-text my-2 text-center text-base">
                    Your personal record is{' '}
                    <span className="bg-[#DDF988] text-black p-1 rounded-md">
                      {movement.personalRecord} {''}KG
                    </span>
                  </p>
                </div>
              )}
            <img src={selectedImage} alt="Movement" />
          </div>
          <button
            onClick={closeModal}
            className="metallic-gradient mt-10 h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)]"
          >
            CLOSE
          </button>
        </Modal>
      )}
    </>
  );
};

export default Movement;
