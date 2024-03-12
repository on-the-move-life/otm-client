import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ProfilePicture({ inputPic, altText, width, height }) {
  const [isZoomed, setIsZoomed] = useState(false);

  function handleZoom() {
    setIsZoomed(true);
  }

  function handleClose() {
    setIsZoomed(false);
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <motion.img
        src={inputPic}
        alt={altText}
        className={`w-[${width}] h-[${height}] rounded-full object-cover`}
        onClick={handleZoom}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      />
      {isZoomed &&
        <div
          className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50'
          onClick={handleClose}

        >
          <motion.img
            src={inputPic}
            alt={altText}
            className='sm:w-[300px] sm:h-[300px] md:w-[600px] md:h-[600px] aspect-auto object-contain'
            initial="hidden"
            animate={isZoomed ? 'visible' : 'hidden'}
            exit="hidden"
            variants={modalVariants}
          />
        </div>}
    </>
  );
}

export default ProfilePicture;
