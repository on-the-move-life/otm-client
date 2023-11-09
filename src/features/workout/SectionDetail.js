import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import DataInputComponent from './DataInputComponent';
import ImageModal from './ImageModal';

import {
  previousWorkoutSection,
  nextWorkoutSection,
  finishWorkout,
} from './WorkoutSlice';

const SectionDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sectionList, index } = location.state;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentSection, setCurrentSection] = useState(sectionList[index]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  const handleNext = () => {
    if (currentIndex + 1 === sectionList.length) {
      dispatch(finishWorkout);
    } else {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentSection(sectionList[newIndex]);
      // dispatch(nextWorkoutSection)
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
    // dispatch(previousWorkoutSection)
  };

  const { name, format, movements, dataInput, notes: notes } = currentSection;

  const inputValues = useSelector((store) => store.workoutReducer.inputValues);

  const bgStyle = {
    background:
      'linear-gradient(96deg, #999 1.59%, #616161 15%, #323232 19.77%, #818181 31.33%, #E7E7E7 43.14%, #848484 56.78%, #474747 67.1%, #C2C2C2 72.27%, #FFF 80.72%, #B7B7B7 87.42%, #242424 96.75%)',
    'mix-blend-mode': 'screen',
  };

  return (
    <div className="p-4">
      <h1 className="ml-4 mt-8 bg-clip-text text-[32px] font-[SF_Pro_Display] font-medium leading-[40px]">
        {name}
      </h1>
      <span className="ml-8 mr-4 text-[12px] font-[590] font-[SF_Pro] capitalize leading-[normal] tracking-[-0.36px]">
        {format}
      </span>
      <span className="text-[12px] font-[590] font-[SF_Pro] capitalize leading-[normal] tracking-[-0.36px]">
        6-8 reps
      </span>

      {notes.length && (
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
        >
          <div className="flex">
            <img
              src={mvmt.link[0]}
              className="h-[100px] w-[128.553px] rounded-[12px]"
              alt="Movement"
            />
            <div className="ml-5">
              <p className="relative top-3 mb-5 text-[18px] font-[SF_Pro_Text] leading-[25px]">
                {mvmt.name}
              </p>
              <p>Equipment</p>
              <p>{mvmt.hint}</p>
            </div>
          </div>
        </div>
      ))}

      {
        <div>
          <h2 className="text-[20px] font-[SF_Pro_Display] font-medium not-italic leading-[32px]">
            Data Input
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
      }

      {isModalOpen && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}

      <div className="my-5 flex h-[78px] w-[350px] flex-shrink-0 justify-between border-t-[1px_solid_#2B2B2B] bg-[rgba(0,_0,_0,_0.85)]">
        <div className="realtive left-5 top-5 flex">
          <span disabled={currentIndex === 2} onClick={handlePrevious}>
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
        >
          <span className="text-[18px] font-medium not-italic leading-[normal] text-[#000]">
            Close
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
