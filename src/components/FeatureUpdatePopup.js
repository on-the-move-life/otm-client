import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import axios from 'axios';
import styled from 'styled-components';

// uiVersion must be updated whenever a new feature is added
export const uiVersion = '1.1.1';

// function to compare versions "1.0.0" of this format and return true if the first version is greater than the second
function compareVersions(uiVersion, backendVersion) {
  try {
    const uiParts = uiVersion.split('.');
    const backendParts = backendVersion.split('.');
    let isGreater = false;

    for (let i = 0; i < uiParts.length; i++) {
      if (uiParts[i] > backendParts[i]) {
        isGreater = true;
        break;
      }
    }
    return isGreater;
  } catch (err) {
    // if anything goes wrong return false
    console.log(err);
    return false;
  }
}

// This component shows a popup whenever a new feature is added
const FeatureUpdatePopup = ({ backendVersion }) => {
  // isOpen state determines whether the popup is visible or not
  const [isOpen, setIsOpen] = useState(false);

  const heading = 'INTRODUCING YOUR NEW FAVORITE FEATURES';
  const featureBody =
    'Earn Movecoins with every workout and unlock exclusive offers';
  const featureImage = 'assets/movecoins-feature.png';

  useEffect(() => {
    // If the UI version is greater than the backend version, show the popup
    if (compareVersions(uiVersion, backendVersion)) {
      setIsOpen(true);
    } else {
      // for debugging purpose
      console.log('feature pop-up not opened');
    }
  }, [backendVersion, uiVersion]);

  // Function to close the popup
  const handleClose = () => {
    // call the API to update the backendVersion with the current uiVersion
    const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
    const payload = {
      lastSeenUiVersion: uiVersion,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/member/${memberCode}`,
        payload,
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsOpen(false);
      });
  };

  // Animation variants for the backdrop
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  // Animation variants for the modal
  const modal = {
    hidden: { y: '-100vh', opacity: 0 },
    visible: { y: '0', opacity: 1, transition: { delay: 0.5 } },
  };

  return (
    // Only render the popup if isOpen is true
    isOpen && (
      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        className="fixed left-0 top-0 z-[1000] mx-auto flex h-screen w-full flex-col items-center justify-center bg-transparent backdrop-blur-lg"
      >
        <div
          className="flex h-full w-full flex-col items-center justify-center"
          style={{
            backgroundImage: `url("/assets/firework.gif")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        >
          <motion.div
            variants={modal}
            className="h-fit w-10/12 rounded-lg bg-white/20 p-2 backdrop-blur-sm"
          >
            <div className="rounded-[5.5px] bg-[#7E87EF] px-2 py-2">
              <p className="anton">{heading}</p>
            </div>
            {/* Add the image and detail about the feature */}
            {/* <p className="px-4 py-2 text-sm">{featureBody}</p> */}
            <ul class="my-2 list-inside list-disc font-[600]">
              <li className="my-3">
                Easily replace any movement in your workout with another.
                Customize your workouts like never before!
              </li>
              <li className="my-3">
                Tap on any movement card to get a detailed explanation. Perfect
                your form and technique with ease!
              </li>
              <li className="my-3">
                Upload pictures of your meals and let our AI analyze the
                calories and macros.
              </li>
              <li className="my-3">
                Enjoy a fun and intuitive summary of your performance from the
                past month. Check out your monthly wrapped now!
              </li>
            </ul>
            {/* <img
              src={featureImage}
              alt="feature"
              className="mx-auto h-[400px]"
            /> */}
            {/* Button to close the popup */}
            <Button
              action={handleClose}
              text={'close'}
              style={{ background: '#7E87EF', color: 'white' }}
            />
          </motion.div>
        </div>
      </motion.div>
    )
  );
};

export default FeatureUpdatePopup;
