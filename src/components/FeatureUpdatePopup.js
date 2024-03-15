import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

// This component shows a popup whenever a new feature is added
const FeatureUpdatePopup = () => {
    // isOpen state determines whether the popup is visible or not
    const [isOpen, setIsOpen] = useState(false);
    // currentVersion should be updated whenever new features are added
    const currentVersion = 1;

    // useEffect hook runs when the component mounts and whenever currentVersion changes
    useEffect(() => {
        // Get the last seen version from local storage and parse it to integer value
        const lastSeenVersion = parseInt(localStorage.getItem('lastSeenVersion'), 10);

        // If the user hasn't seen the latest version, show the popup and update the last seen version in local storage
        if (isNaN(lastSeenVersion) || lastSeenVersion < currentVersion) {
            setIsOpen(true);
            setTimeout(() => {
                localStorage.setItem('lastSeenVersion', currentVersion.toString());
            }, 4000)
        }
    }, [currentVersion]);

    // Function to close the popup
    const handleClose = () => {
        setIsOpen(false);
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