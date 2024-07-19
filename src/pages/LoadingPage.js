import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import LoadingScreenDown from '../components/loadingScreenDown';
import LoadingScreenUp from '../components/loadingScreenUp';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [showLower, setShowLower] = useState(false);
  // const [showLower, setShowLower] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate progress update every 1500 milliseconds

    const interval = setInterval(() => {
      if (progress < 68) {
        setProgress(progress + 4);

        // Check if progress reaches 50%, then hide the upper loading screen and show the lower one
        if (progress >= 34) {
          setShowLower(true);
        }
      } else {
        // Clear the interval when progress reaches 100%
        clearInterval(interval);
        navigate('/fitness');
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress, navigate]);

  const loadingBarDiv = {
    position: 'absolute',
    top: '40px',
    left: '60px',
    // width: '250px',
    backgroundColor: 'white',
  };

  return (
    <div>
      <LoadingBar
        color="white"
        height={6}
        waitingTime={5000}
        shadow={false}
        style={loadingBarDiv}
        progress={progress}
      />

      {!showLower ? <LoadingScreenUp /> : <LoadingScreenDown />}
    </div>
  );
};

export default LoadingPage;
