import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


import ImageModal from './ImageModal';

const SectionDetail = () => {
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
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
  };

  const { name, format, movements, dataInput } = currentSection;

  return (
    <div>
      <p>{name}</p>
      <p>{format}</p>

      {movements.map((mvmt, idx) => (
        <div key={mvmt.name} onClick={() => openModal(mvmt.link[0])}>
          <div>
            <img src={mvmt.link[0]} alt="Movement" />
            <p>{mvmt.name} | equipment</p>
            <p>{mvmt.hint}</p>
          </div>
          <div>
            <p>Data Input</p>
            {dataInput.map((input, index) => (
              <div key={index}>
                <label htmlFor={input.id}>{input.label}</label>
                {input.type === 'select' ? (
                  <select id={input.id} name={input.id}>
                    {input.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : input.type === 'textarea' ? (
                  <textarea
                    id={input.id}
                    name={input.id}
                    placeholder={input.placeholder}
                  ></textarea>
                ) : (
                  <input
                    type={input.type}
                    id={input.id}
                    name={input.id}
                    placeholder={input.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}

      <button disabled={currentIndex <= 0} onClick={handlePrevious}>
        Previous
      </button>
      <p>
        {currentIndex + 1} / {sectionList.length}
      </p>
      <button
        disabled={currentIndex + 1 === sectionList.length}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default SectionDetail;