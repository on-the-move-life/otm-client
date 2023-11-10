import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

// import { finishWorkout } from './WorkoutSlice';

import DataInputComponent from './DataInputComponent';

import { finishWorkout } from './WorkoutSlice';

const customStyles = {
  content: {
    border: '1px solid #2A2A2A',
    borderRadius: '12px',
  },
};

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
  };

  const handleNext = () => {
    if (currentIndex + 1 === sectionList.length) {
      navigate('/test-2');
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
    if (newIndex === 0) {
      return;
    }
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
  };

  const handleSubmit = () => {
    dispatch(finishWorkout);
  };

  const { name, format, movements, dataInput, notes } = currentSection;

  const bgStyle = {
    background:
      'linear-gradient(96deg, #999 1.59%, #616161 15%, #323232 19.77%, #818181 31.33%, #E7E7E7 43.14%, #848484 56.78%, #474747 67.1%, #C2C2C2 72.27%, #FFF 80.72%, #B7B7B7 87.42%, #242424 96.75%)',
    mixBlendMode: 'screen',
  };

  const textFillStyle = {
    WebkitTextFillColor:
      'linear-gradient(96deg, #999 1.59%, #616161 15%, #323232 19.77%, #818181 31.33%, #E7E7E7 43.14%, #848484 56.78%, #474747 67.1%, #C2C2C2 72.27%, #FFF 80.72%, #B7B7B7 87.42%, #242424 96.75%)',
    mixBlendMode: 'screen',
  };

  return (
    <div className="p-4">
      <h1
        className="ml-4 mt-8 bg-clip-text text-[32px] font-[SF_Pro_Display] font-medium leading-[40px]"
        style={textFillStyle}
      >
        {name}
      </h1>
      <span className="ml-8 mr-4 text-[12px] font-[590] font-[SF_Pro] capitalize leading-[normal] tracking-[-0.36px]">
        {format}
      </span>
      <span className="pb-4 text-[12px] font-[590] font-[SF_Pro] capitalize leading-[normal] tracking-[-0.36px]">
        6-8 reps
      </span>

      {notes.length > 0 && (
        <div className="my-5 flex-shrink-0 rounded-[12px] bg-[#0E0E0E] object-contain p-5">
          <h3>Notes</h3>
          <ul>
            {notes.map((note, idx) => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {movements.map((mvmt, idx) => (
        <div
          key={mvmt.name}
          className="mb-8 h-[100px] w-[358px] rounded-[12px] border-[0.5px] border-[#383838] border-[solid] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)]"
          onClick={() => openModal(mvmt)}
        >
          <div className="flex">
            <img
              src={mvmt.link[0]}
              className="h-[100px] w-[128.553px] rounded-[12px]"
              alt="Movement"
            />
            <div className="ml-5">
              <p className="relative top-3 mb-5 w-48 text-[18px] font-[SF_Pro_Text] leading-[25px]">
                {`${mvmt.name} ${mvmt.hint}`}
              </p>
              {/* <p>Equipment</p> */}
              {/* <p>{mvmt.hint}</p> */}
            </div>
          </div>
        </div>
      ))}

      <div>
        <h2 className="text-[20px] font-[SF_Pro_Display] font-medium not-italic leading-[32px]">
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
          style={customStyles}
          className="h-[783px] w-[390px] flex-shrink-0 rounded-[12px] bg-[#141414] p-4"
        >
          <span
            onClick={closeModal}
            className="close-button relative left-[90%] top-2 mr-2 mt-2 cursor-pointer rounded-full p-2"
          >
            X
          </span>
          <h3 className="relative left-16 mb-24 text-[20px] font-[SF_Pro_Display] font-medium not-italic leading-[32px]">
            {selectedMvmtName}
          </h3>
          <img
            src={selectedImage}
            alt="Movement"
            className="relative left-16"
          />
          <div
            onClick={closeModal}
            className="relative top-[35%] flex h-[49px] w-[358px] flex-shrink-0 items-center justify-center rounded-[12px] border-[2px] border-[rgba(209,209,209,0.70)] border-[solid] mix-blend-screen"
            style={bgStyle}
          >
            <p className="text-[18px] font-medium not-italic leading-[normal] text-[#000]">
              Done
            </p>
          </div>
        </Modal>
      )}

      <div className="my-5 flex h-[78px] w-[350px] flex-shrink-0 justify-between border-t-[1px_solid_#2B2B2B] bg-[rgba(0,_0,_0,_0.85)]">
        <div className="realtive left-5 top-5 flex">
          <span disabled={currentIndex === 1} onClick={handlePrevious}>
            <img src="./assets/chevron.left.svg" />
          </span>
          <h2 className="text-[20px] font-medium not-italic leading-[32px]">
            {currentIndex} / {sectionList.length - 1}
          </h2>
          <span onClick={handleNext}>
            <img src="./assets/chevron.right.svg" />
          </span>
        </div>
        <div
          className="flex h-[49px] w-[202px] items-center justify-center rounded-[12px] border-[2px] border-[rgba(209,209,209,0.70)] border-[solid] mix-blend-screen"
          style={bgStyle}
          onClick={
            currentIndex + 1 === sectionList.length
              ? handleCloseWorkout
              : handleSubmit
          }
        >
          <span className="text-[18px] font-medium not-italic leading-[normal] text-[#000]">
            {currentIndex === sectionList.length - 1 ? 'Submit' : 'Close'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
