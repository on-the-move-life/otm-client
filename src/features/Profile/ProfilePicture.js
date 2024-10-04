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
        ease: 'easeInOut',
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
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      <motion.img
        loading="lazy"
        src={inputPic}
        alt={altText}
        className={` rounded-full object-cover h-[${height}] w-[${width}] `}
        onClick={handleZoom}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      />
      {isZoomed && (
        <div
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.img
            loading="lazy"
            src={inputPic}
            alt={altText}
            className="aspect-auto object-contain sm:h-[300px] sm:w-[300px] md:h-[600px] md:w-[600px]"
            initial="hidden"
            animate={isZoomed ? 'visible' : 'hidden'}
            exit="hidden"
            variants={modalVariants}
          />
        </div>
      )}
    </>
  );
}

export default ProfilePicture;
