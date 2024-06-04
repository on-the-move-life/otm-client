import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styled from 'styled-components';
import { IoMdTrash } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { BsImageFill } from "react-icons/bs";
import axios from 'axios';

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

const UploadMeal = () => {

    const [imageURL, setImageURL] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const profilePicRef = useRef(null);
    const fileInputRef = useRef(null);
    const profilePicCameraRef = useRef(null);
    const [showProfilePicPopup, setShowProfilePicPopup] = useState(false);
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



    const handleClick = () => {
        setShowProfilePicPopup(true);
    };

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };



    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('user', 'PRAN');
                    formData.append('date', 'June 4 2024');
                    formData.append('taskId', '1-6');

                    const res = await axios.post('http://localhost:882/api/v1/lifestyle/meal-info', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    setResponse(res.data);
                    setError(null);
                    setImageURL(res.data.mealUrl);
                    // console.log(res.data.mealUrl);
                } catch (err) {
                    console.error('Error submitting the request:', err);
                    setError(err);
                    setResponse(null);
                    // setImageURL(file)
                }
            };
            reader.readAsDataURL(file);
        }
    };


    // // api handling

    // const handleInputChange = (e) => {
    //     setImageURL(e.target.value);
    // };

    // const handleSubmit = async () => {
    //     try {
    //         const payload = {
    //             user: 'PRAN',
    //             img: imageURL,
    //         };

    //         const res = await axios.post('https://otm-main-production.up.railway.app/api/v1/lifestyle/meal-info', payload);
    //         setResponse(res.data);
    //         setError(null);
    //     } catch (err) {
    //         console.error('Error submitting the request:', err);
    //         setError(err);
    //         setResponse(null);
    //     }
    // };


    // // camera input from userprofile
    // function handlePicChange(e) {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfilePicFile(file);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setChosenPic(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //         e.target.value = null;
    //         setShowProfilePicPopup(false);
    //         const formData = new FormData();
    //         formData.append('profilePicture', file);
    //         formData.append('email', JSON.parse(localStorage.getItem('user')).email);
    //         axios
    //             .post(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client/profile-picture`, formData)
    //             .then(res => {
    //                 console.log('profile picture updated!');
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 setProfilePicError(true);
    //             })
    //     }
    // }



    return (

        // <div><h3>Success</h3></div>
        <div>

            <div className="min-h-screen bg-black flex items-center justify-center flex-col ">

                {/* upload component */}
                <div className="  w-screen bg-mediumGray text-custompurple p-4 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p className="mb-4">
                        Please Upload your meal photo
                    </p>
                    <button onClick={handleClick} className="bg-transparent w-full border border-custompurple text-custompurple py-2 px-4 rounded hover:bg-indigo-500 hover:text-white transition duration-300" >
                        Upload Meal Photo
                    </button>
                </div>

                {/* description component */}
                <div className="bg-mediumGray text-white mt-4 p-4 rounded-lg shadow-lg w-screen max-w-sm mx-auto">
                    <h3 className="text-white font-sfPro font-body-condensed-bold mb-2">Meal Details</h3>
                    {/* meal pic */}
                    {imageURL && (
                        <div>
                            <h2>Selected Image:</h2>
                            <img src={imageURL} alt="Selected" style={{ width: '200px', height: '200px' }} />
                        </div>
                    )}
                    <div className="bg-mediumGray p-4 rounded-lg">
                        <p className="flex items-center mb-2 text-sm">

                            <span className="font-body-condensed-bold">Meal Info</span>
                        </p>
                        <ul className="text-sm">
                            <li>Calorie Information about meal </li>

                        </ul>
                    </div>
                    <div className="bg-mediumGray p-4 rounded-lg">
                        <p className="flex items-center mb-2 text-sm">

                            <span className="font-body-condensed-bold">Meal Feedback </span>
                        </p>
                        <ul className="text-sm">
                            <li>Feedback on meal</li>

                        </ul>
                    </div>
                </div>
            </div>




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
                            <div className='w-fit flex flex-col justify-center items-center gap-1' onClick={handleCameraClick}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="user"
                                    hidden
                                    onChange={handleFileChange}
                                />
                                <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                                    <IoCamera size={30} color='#7E87EF' />
                                </button>
                                <IconLabel>Camera</IconLabel>
                            </div>
                            <div className='w-fit flex flex-col justify-center items-center gap-1' onClick={() => profilePicRef.current.click()}>
                                <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                                    <BsImageFill size={30} color='#7E87EF' />
                                </button>
                                <IconLabel>Gallery</IconLabel>
                            </div>
                            {/* <div className='w-fit flex flex-col justify-center items-center gap-1' >
                                <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                                    <IoMdTrash size={30} color='gray' />
                                </button>
                                <IconLabel>Delete</IconLabel>
                            </div> */}
                        </div>
                    </div>
                </motion.div>}
        </div>
    )
}

export default UploadMeal