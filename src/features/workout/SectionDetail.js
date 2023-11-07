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

  const { name, format, movements, dataInput } = currentSection;

  const inputValues = useSelector((store) => store.workoutReducer.inputValues);

  return (
    <div>
      <p>{name}</p>
      <p>{format}</p>

      {movements.map((mvmt, idx) => (
        <div key={mvmt.name}>
          <div>
            <img src={mvmt.link[0]} alt="Movement" />
            <p>{mvmt.name} | equipment</p>
            <p>{mvmt.hint}</p>
          </div>
        </div>
      ))}

      {
        <div>
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

      <button disabled={currentIndex == 1} onClick={handlePrevious}>
        Previous
      </button>
      <p>
        {currentIndex} / {sectionList.length - 1}
      </p>
      <button
        // disabled={currentIndex + 1 === sectionList.length}
        onClick={handleNext}
      >
        {currentIndex + 1 === sectionList.length ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default SectionDetail;
