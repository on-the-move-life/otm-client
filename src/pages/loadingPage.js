import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

import LoadingScreenDown from '../components/loadingScreenDown';
import LoadingScreenUp from '../components/loadingScreenUp';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [showLower, setShowLower] = useState(false);

  useEffect(() => {
    // Simulate progress update every 1500 milliseconds
    const interval = setInterval(() => {
      if (progress < 17) {
        setProgress(progress + 1);

        // Check if progress reaches 50%, then hide the upper loading screen and show the lower one
        if (progress >= 7) {
          setShowLower(true);
        }
      } else {
        // Clear the interval when progress reaches 100%
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  const loadingBarDiv = {
    position: 'absolute',
    top: '50px',
    left: '10px',
    marginTop: '10px',
    marginLeft: '55px',
    backgroundColor: 'white',
  };

  return (
    <div>
      {/* <div
        style={loadingBarDiv}
        // className="top-100 ml-50 absolute left-20 bg-red-500"
      >
        <LoadingBar
          
          color="white"
          height={6}
          waitingTime={5000}
          shadow={false}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      </div> */}

      <LoadingBar
        color="white"
        height={6}
        waitingTime={5000}
        shadow={false}
        style={loadingBarDiv}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {!showLower ? <LoadingScreenUp /> : null}
      {showLower && <LoadingScreenDown />}
    </div>
  );
};

export default LoadingPage;
