import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styled from 'styled-components';
import { IoMdTrash } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { BsImageFill } from "react-icons/bs";
import axios from 'axios';
import NutriInfo from './NutriInfo';
import NewUploadMeal from './NewUploadMeal';
import MealGlance from './MealGlance';

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
    const [mealInfo, setMealInfo] = useState(null);
    const [loading, setLoader] = useState(false);
    const [loadingpic, setLoadingpic] = useState(null);

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
        setLoader(true);
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

                    const res = await axios.post('https://otm-main-production.up.railway.app/api/v1/lifestyle/meal-info', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    if (res.data) {
                        setLoader(false);

                        setResponse(res.data);
                        setError(null);
                        setImageURL(res.data.mealUrl);
                        console.log(res.data.mealNutritionAnalysis.calories);
                        setMealInfo(res.data.mealNutritionAnalysis);
                    }

                    // setResponse(res.data);
                    // setError(null);
                    // setImageURL(res.data.mealUrl);
                    // console.log(response);
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

            {/* new upload meal */}
            <div className="flex items-center bg-black rounded-lg p-5 text-white w-full justify-center self-center align-center">
                <img
                    src="https://via.placeholder.com/100" // Replace this with the actual image URL
                    alt="Shrimps & Rice"
                    className="w-[122px] h-[143px]  rounded-lg mr-5"
                />
                <div className="flex flex-col">
                    <p className="text-lightGray font-sfpro text-14px font-medium">7 June 2024</p>
                    <h2 className="text-xl font-bold my-1">Shrimps & Rice</h2>
                    <p className="text-gray-400">
                        AI generated feedback on how well the plate is prepared according to their goals and restrictions
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center h-auto mb-20">
                <NewUploadMeal mealdata={mealInfo}></NewUploadMeal>
            </div>


            <div className="h-auto flex items-center justify-center flex-col  " onClick={handleClick}>
                <div className="flex items-center bg-mediumGray text-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center mr-4">
                        <div className="w-[10px] h-[10px] bg-gray-700 flex items-center justify-center rounded-full">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 4v16c0 .522.214 1.023.595 1.405.381.381.883.595 1.405.595h12c.522 0 1.023-.214 1.405-.595.381-.382.595-.883.595-1.405V4M4 4h16M4 4l8 8m0-8l8 8M12 12l8 8M12 12l-8 8"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className="text-white font-sfpro text-[14px] font-medium">Upload meal photo</div>
                        <div className="text-lightGray font-sfpro text-[14px] font-medium">Let the power of AI breakdown your meal</div>
                    </div>
                    <div className="ml-auto">
                        <img
                            src="/path/to/your/image.png" // Replace with the correct path to the image
                            alt="Meal"
                            className="w-16 h-16 rounded-lg"
                        />
                    </div>
                </div>


                {/* upload component */}
                <MealGlance></MealGlance>

                {/* <div className="  w-screen bg-mediumGray text-custompurple p-4 rounded-lg shadow-lg max-w-sm mx-auto">
                    <p className="mb-4">
                        Please Upload your meal photo
                    </p>
                    <button onClick={handleClick} className="bg-transparent w-full border border-custompurple text-custompurple py-2 px-4 rounded hover:bg-indigo-500 hover:text-white transition duration-300" >
                        Upload Meal Photo
                    </button>
                </div> */}


                {loading && (


                    <div className="max-w-sm mx-auto  rounded-lg shadow-md p-3 flex items-center space-x-6 bg-mediumGray   " >

                        {/* <img src={loadingpic}></img> */}

                        <p>Loading...</p>
                    </div>
                )}

                {imageURL && (


                    <div className="max-w-sm mx-auto  rounded-lg shadow-md p-3 flex items-center space-x-6 bg-mediumGray justify-center  " >

                        <img className="w-1/2  " src={imageURL} alt="Selected" />

                    </div>
                )}

                {/* description component */}
                <div>{

                    mealInfo &&

                    <NutriInfo mealdata={mealInfo}></NutriInfo>
                }
                </div>

            </div>





            {
                showProfilePicPopup &&
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
                </motion.div>
            }
        </div >
    )
}

export default UploadMeal