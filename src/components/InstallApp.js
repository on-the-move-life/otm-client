import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross1 } from 'react-icons/rx';

const InstallApp = () => {
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

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

  const handleOpenPopup = () => {
    setShowInstallPopup(true);
    setSelectedPlatform(null);
  };

  const handleClosePopup = () => {
    setShowInstallPopup(false);
    setSelectedPlatform(null);
  };

  return (
    <>
      <div
        onClick={handleOpenPopup}
        className="flex h-[62px] w-full items-center overflow-hidden rounded-xl bg-mediumGray text-sm gap-6"
      >
        <img src="/maskable.png" alt="App Icon" className='w-12 ml-2'/>
        <div className="pl-2 text-[18px] text-[#F8F8F8]/[0.8]">
          Install our app
        </div>
      </div>

      {showInstallPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={modalVariants}
            className={`bg-black p-6 rounded-lg ${selectedPlatform ? 'w-full h-full overflow-y-auto' : 'w-80'}`}
          >
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold text-white">Install Our App</h2>
              <button onClick={handleClosePopup}>
                <RxCross1 className="text-white" />
              </button>
            </div>

            {!selectedPlatform ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setSelectedPlatform('android')}
                  className="rounded-lg bg-green p-3 text-black"
                >
                  Android
                </button>
                <button
                  onClick={() => setSelectedPlatform('ios')}
                  className="rounded-lg bg-green p-3 text-black"
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
                    Note: Please Use Safari for installation, Apple doesn't allow third party browsers like Chrome to install apps.
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
                  className="mt-6 rounded-lg bg-green p-2 text-black w-full"
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