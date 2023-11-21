import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

// import { finishWorkout } from './WorkoutSlice';

import DataInputComponent from './DataInputComponent';

import { finishWorkout } from './WorkoutSlice';

Modal.setAppElement('#root');

const SectionDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { sectionList, index } = location.state;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentSection, setCurrentSection] = useState(sectionList[index]);

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

  const handleCloseWorkout = () => {
    console.log('close');
    navigate('/workout');
  };

  const handleNext = () => {
    if (currentIndex === sectionList.length - 1) {
      navigate('/workout-summary');
    } else {
      const newIndex = currentIndex + 1;
      console.log(newIndex);
      setCurrentIndex(newIndex);
      setCurrentSection(sectionList[newIndex]);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex - 1;
    console.log(newIndex);
    if (newIndex === -1) {
      return;
    }
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
  };

  const handleSubmit = () => {
    if (currentIndex === sectionList.length - 1) {
      navigate('/workout-summary');
    }
  };

  const { name, format, movements, dataInput, notes } = currentSection;

  return (
    <div className="my-4 p-4">
      <h1 className="metallic-gradient-text text-3xl">{name}</h1>
      <div className="tags my-2">
        <span className="border border-[#323232] text-xs">{format}</span>
      </div>

      {notes.length > 0 && (
        <div className="rounded-xl bg-[#0E0E0E] p-4">
          <p className="mb-2 text-xs tracking-widest">NOTES</p>
          <ul>
            {notes.map((note, idx) => (
              <li
                className="text-xs font-light tracking-wider text-lightGray"
                key={idx}
              >
                - {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {movements.map((mvmt, idx) => (
        <div
          key={mvmt.name}
          className="my-4 flex h-24 w-full items-start justify-between rounded-xl border  border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] text-xl"
          onClick={() => openModal(mvmt)}
        >
          <div className="flex h-full w-1/3">
            <img
              className="h-full w-full rounded-l-xl"
              src={mvmt.link[0]}
              alt="Movement"
            />
          </div>
          <div className="w-2/3 px-4">
            <span className="text-sm">{mvmt.displayString}</span>
            {/* <p>Equipment</p> */}
            {/* <p>{mvmt.hint}</p> */}
          </div>
        </div>
      ))}

      <div>
        <h2 className="metallic-gradient-text mb-4 mt-8 text-2xl">
          Data Inputs
        </h2>
        {dataInput.map((input, index) => (
          <DataInputComponent
            key={index}
            inputId={input.id}
            inputType={input.type}
            inputOptions={input.options}
            placeholder={input.placeholder}
            label={input.label}
          />
        ))}
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
            <h3 className="metallic-gradient-text my-8 text-center text-2xl">
              {selectedMvmtName}
            </h3>
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

      <footer className="pt-8">
        <div className="flex justify-around">
          <div className="flex w-1/3 items-center space-x-3">
            <button disabled={currentIndex === 0} onClick={handlePrevious}>
              <img src="./assets/chevron.left.svg" alt="left-arrow" />
            </button>
            <p className="text-xl">
              {currentIndex + 1} / {sectionList.length}
            </p>
            <button onClick={handleNext}>
              <img src="./assets/chevron.right.svg" alt="right-arrow" />
            </button>
          </div>
          <div
            className="metallic-gradient flex h-11 w-3/6 items-center justify-center rounded-xl border-[rgba(209,209,209,0.70)] "
            // style={bgStyle}
            onClick={
              currentIndex === sectionList.length - 1
                ? handleSubmit
                : handleCloseWorkout
            }
          >
            <span className="text-lg font-semibold uppercase text-black">
              {currentIndex === sectionList.length - 1 ? 'Submit' : 'Close'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SectionDetail;
