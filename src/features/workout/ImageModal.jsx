import React, { useState } from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  const divStyle = {
    size: '1500px',
    position: 'absolute',
    left: '50px',
    top: '50px'
  }

  return (
    <div className="modal" style={divStyle}>
      <div className="modal-content">
        <img src={imageUrl} alt="Image" />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImageModal;
