import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const FeatureUpdatePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentVersion = 1; // Update this whenever new features are added

    useEffect(() => {
        const lastSeenVersion = parseInt(localStorage.getItem('lastSeenVersion'), 10);

        if (isNaN(lastSeenVersion) || lastSeenVersion < currentVersion) {
            setIsOpen(true);
            setTimeout(() => {
                localStorage.setItem('lastSeenVersion', currentVersion.toString());
            }, 4000)
        }
    }, [currentVersion]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const modal = {
        hidden: { y: "-100vh", opacity: 0 },
        visible: { y: "0", opacity: 1, transition: { delay: 0.5 } },
    };

    return (
        isOpen && (
            <motion.div
                variants={backdrop}
                initial="hidden"
                animate="visible"
                className="w-full h-screen fixed top-0 left-0 mx-auto bg-transparent backdrop-blur-lg z-[1000] flex flex-col items-center justify-center"
            >
                <div className='w-full h-full flex flex-col items-center justify-center' style={{backgroundImage: `url("/assets/firework.gif")`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}>
                    <motion.div variants={modal} className='w-10/12 h-fit bg-white/20 backdrop-blur-sm p-2 rounded-lg'>
                        <h2 className='text-2xl text-green text-center font-semibold'>New Feature</h2>
                        <p className='text-center text-sm my-1'>We've added a new feature! Here's what's new:</p>
                        {/* Add the image and detail about the feture */}
                        <img src="/assets/feature.png" alt="feature" className='h-[400px] mx-auto'/>
                        <p className='text-center text-sm my-1'>You can now like and add comments on timeline page!!</p>
                        <Button action={handleClose} text={'close'} />
                    </motion.div>
                </div>
            </motion.div>
        )
    );
};

export default FeatureUpdatePopup;