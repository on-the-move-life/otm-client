import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styled from 'styled-components';
import { IoMdTrash } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { BsImageFill } from "react-icons/bs";


const UploadMeal = () => {

    const profilePicRef = useRef(null);
    const profilePicCameraRef = useRef(null);
    const [showProfilePicPopup, setShowProfilePicPopup] = useState(true);
    const modalVariants = {
        hidden: {
            opacity: 0,
            y: '100%',
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut',
            },
        },
    };


    // styling

    const ProfilePicHeading = styled.div`
color: #D7D7D7;
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 20px;
font-style: normal;
line-height: 29.066px; /* 160% */
text-transform: capitalize;
letter-spacing: 1px;
`
    const IconLabel = styled.div`
color: #D7D7D7;
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 15px;
font-style: normal;
line-height: 29.066px; /* 160% */
text-transform: capitalize;
letter-spacing: 1px;
`


    return (

        // <div><h3>Success</h3></div>
        <div>


            {showProfilePicPopup &&
                <motion.div
                    className='w-full h-[200px] rounded-t-[30px] bg-gradient-to-r from-gray-500/30 to-gray-900/60 backdrop-blur-lg fixed bottom-0 left-0 z-50 p-5'
                    initial="hidden"
                    animate={showProfilePicPopup ? "visible" : "hidden"}
                    variants={modalVariants}
                >
                    <button className='absolute top-0 left-[47%] cursor-pointer' onClick={() => setShowProfilePicPopup(false)}>
                        <MdOutlineKeyboardArrowDown size={30} color='#D7D7D7' />
                    </button>
                    <div className='w-full flex flex-col items-start justify-around h-full mt-3 '>
                        <ProfilePicHeading>Meal photo</ProfilePicHeading>
                        <div className='w-full flex flex-row justify-start gap-[40px] items-center'>
                            <div className='w-fit flex flex-col justify-center items-center gap-1' onClick={() => profilePicCameraRef.current.click()}>
                                <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                                    <IoCamera size={30} color='#5ECC7B' />
                                </button>
                                <IconLabel>Camera</IconLabel>
                            </div>
                            <div className='w-fit flex flex-col justify-center items-center gap-1' onClick={() => profilePicRef.current.click()}>
                                <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                                    <BsImageFill size={30} color='#5ECC7B' />
                                </button>
                                <IconLabel>Gallery</IconLabel>
                            </div>
                            <div className='w-fit flex flex-col justify-center items-center gap-1' >
                                <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                                    <IoMdTrash size={30} color='gray' />
                                </button>
                                <IconLabel>Delete</IconLabel>
                            </div>
                        </div>
                    </div>
                </motion.div>}
        </div>
    )
}

export default UploadMeal