import React from 'react';

const BackButton = ({ handleBack }) => {
  console.log(handleBack, 'handleBack');
  return <button onClick={handleBack}>BackButton</button>;
};

export default BackButton;
