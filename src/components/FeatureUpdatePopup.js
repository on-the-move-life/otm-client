import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import axios from 'axios';

// function to compare versions "1.0.0" of this format and return true if the first version is greater than the second
function compareVersions(uiVersion, backendVersion) {
    try{
        const uiParts = uiVersion.split('.');
        const backendParts = backendVersion.split('.');
        let isGreater = false;
    
        for(let i = 0; i < uiParts.length; i++) {
            if(uiParts[i] > backendParts[i]) {
                isGreater = true;
                break;
            }
        }
        return isGreater;
    }
    catch(err){
        // if anything goes wrong return false
        console.log(err);
        return false;
    }
}

// This component shows a popup whenever a new feature is added
const FeatureUpdatePopup = ({ backendVersion }) => {
    // isOpen state determines whether the popup is visible or not
    const [isOpen, setIsOpen] = useState(false);

    // uiVersion must be updated whenever a new feature is added
    const uiVersion = "0.0.0";

    useEffect(() => {
        // If the UI version is greater than the backend version, show the popup
        if(compareVersions(uiVersion, backendVersion)) {
            setIsOpen(true);
        }    
        else{
            // for debugging purpose
            console.log("feature pop-up not opened")
        }
    }, [backendVersion, uiVersion]);

    // Function to close the popup
    const handleClose = () => {
        // call the API to update the backendVersion with the current uiVersion
        const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
        const payload = {
            lastSeenUiVersion: uiVersion
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/member/${memberCode}`, payload)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
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
        hidden: { y: "-100vh", opacity: 0 },
        visible: { y: "0", opacity: 1, transition: { delay: 0.5 } },
    };

    return (
        // Only render the popup if isOpen is true
        isOpen && (
            <motion.div
                variants={backdrop}
                initial="hidden"
                animate="visible"
                className="w-full h-screen fixed top-0 left-0 mx-auto bg-transparent backdrop-blur-lg z-[1000] flex flex-col items-center justify-center"
            >
                <div className='w-full h-full flex flex-col items-center justify-center' style={{ backgroundImage: `url("/assets/firework.gif")`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}>
                    <motion.div variants={modal} className='w-10/12 h-fit bg-white/20 backdrop-blur-sm p-2 rounded-lg'>
                        <h2 className='text-2xl text-green text-center font-semibold'>New Feature</h2>
                        <p className='text-center text-sm my-1'>Here's what's new:</p>
                        {/* Add the image and detail about the feature */}
                        <ul style={{ listStyleType: 'disc', listStylePosition: 'inside' }}>
                            <li className='text-sm text-md my-1 tracking-wide'>You can now like and add comments on timeline page!!</li>
                        </ul>
                        <img src="/assets/feature.png" alt="feature" className='h-[400px] mx-auto' />
                        {/* Button to close the popup */}
                        <Button action={handleClose} text={'close'} />
                    </motion.div>
                </div>
            </motion.div>
        )
    );
};

export default FeatureUpdatePopup;