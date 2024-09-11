import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross1 } from 'react-icons/rx';

const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = window.navigator.standalone === true;
    const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;

    setIsPWA(isStandalone || isInWebAppiOS || isInWebAppChrome);
  }, []);

  return isPWA;
};

const InstallApp = () => {
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [showPlatformSelection, setShowPlatformSelection] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const isPWA = useIsPWA();

  useEffect(() => {
    // Show popup on page load if it's not a PWA
    if (!isPWA) {
      setShowInitialPopup(true);
    }
  }, [isPWA]);

  const handleInstallClick = () => {
    setShowInitialPopup(false);
    setShowPlatformSelection(true);
  };

  const handleClosePopup = () => {
    setShowInitialPopup(false);
    setShowPlatformSelection(false);
    setSelectedPlatform(null);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: '50%' },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 500 
      } 
    },
  };

  const installInstructions = {
    ios: [
      "Open the Platform in Safari. Click on the Share button on the bottom navbar as shown in the Screenshot.",
      "After Clicking on the Share button, Scroll down and Click on 'Add to Home Screen' Button.",
      "You will get a screen like the one shown below, click on 'Add'.",
      "You Will see the OTM icon along with your other apps, open it and Login to use the platform.",
    ],
    android: [
      "Open platform in Chrome browser for installation and click on the 3 dots on the upper right corner as shown in the Screenshot.",
      "Click on the 'Add to Home Screen' Option from the dropdown list that appears from clicking the dots.",
      "After clicking you will get 2 options, click on 'Install'.",
      "Again Click on Install",
      "You will see the OTM app with your existing apps, login if you haven't already, to use the platform.",
    ]
  };
  const topPopupVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 500 
      } 
    },
  };

  if (isPWA) {
    return null; // Don't render anything if it's a PWA
  }

  return (
    <>
     {showInitialPopup && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={topPopupVariants}
          className="fixed top-0 left-0 right-0 z-50 bg-black-opacity-45 p-4 shadow-lg rounded-b-xl "
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/assets/updated-logo.svg" alt="App Icon" className="w-10 h-10"/>
              <div>
                <h2 className="sm:text-lg font-[600] text-white text-[16px]">Install Our App</h2>
                <p className="text-white sm:text-sm text-[12px]">Get the best experience on your device</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleInstallClick}
                className="rounded-lg bg-blue px-3 py-2 text-black font-semibold sm:text-sm text-[16px]"
              >
                Install
              </button>
              <button onClick={handleClosePopup}>
                <RxCross1 className="text-white text-xl" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
          
      {showPlatformSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={modalVariants}
            className={`bg-black p-6 rounded-lg ${selectedPlatform ? 'w-full h-full overflow-y-auto' : 'w-80'}`}
          >
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-[600] text-white">Install Our App</h2>
              <button onClick={handleClosePopup}>
                <RxCross1 className="text-white" />
              </button>
            </div>

            {!selectedPlatform ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setSelectedPlatform('android')}
                  className="rounded-lg bg-blue p-3 text-black"
                >
                  Android
                </button>
                <button
                  onClick={() => setSelectedPlatform('ios')}
                  className="rounded-lg bg-blue p-3 text-black"
                >
                  iOS
                </button>
              </div>
            ) : (
              <div className='pb-20'>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {selectedPlatform === 'android' ? 'Android' : 'iOS'} Installation Steps:
                </h3>
                {selectedPlatform === 'ios' && (
                  <p className="mt-4 text-yellow-400">
                    Note: Please Use Safari for installation, Apple doesn't allow third party browsers like Chrome to install apps
                  </p>
                )}
                <ol className="list-decimal space-y-6 pl-5 text-white mt-4">
                  {installInstructions[selectedPlatform].map((step, index) => (
                    <li key={index} className="mb-2">
                      <p className="mb-4">{step}</p>
                      <img
                        src={`/${selectedPlatform}${index + 1}.jpg`}
                        alt={`${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Step ${index + 1}`}
                        className="rounded-lg w-40 sm:w-48 mx-auto"
                      />
                    </li>
                  ))}
                </ol>

                <button
                  onClick={() => setSelectedPlatform(null)}
                  className="mt-6 rounded-lg bg-blue p-2 text-black w-full"
                >
                  Back to Platform Selection
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InstallApp;