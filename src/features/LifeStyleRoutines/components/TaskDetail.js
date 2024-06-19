import React, { useState, useEffect, useRef } from 'react'
import TaskCard from './TaskCard';
import EmptyMealCard from './EmptyMealCard';
import { axiosClient } from '../apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { changeMoodIcon, toggleCompletion, handleFeedbackChange, handleMealinfoChange } from '../ReduxStore/actions';
import { getFormattedDate, isIPhone } from '../utils';
import { toast } from 'react-toastify';


import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styled from 'styled-components';
import { IoMdTrash } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { BsImageFill } from "react-icons/bs";
import axios from 'axios';
import { MealDoughnut } from './MealDoughnut';
import { MealInfocard } from "./MealInfocard";
import FullMealInfoCard from './FullMealInfoCard';
import MealPage from './MealPage';
import { Loader } from '../../../components';
import { IoSparkles } from 'react-icons/io5';


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

const TaskDetail = ({ SelectedCircle, task, setShowTaskDetail, setTaskCompleted, date, taskCompleted }) => {

    console.log("meal task is" + task.type);

    // const [showMealInfo, setshowMealInfo] = useState(false);
    const [showMealInfo, setshowMealInfo] = useState(false);
    const [isMealTask, setIsMealTask] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedFeeling, setSelectedFeeling] = useState(-1);
    const [feedback, setFeedback] = useState('');
    const [response, setResponse] = useState(null);



    const formattedDate = getFormattedDate();
    const finalDate = (date === null || date === undefined) ? formattedDate : date;

    const dispatch = useDispatch();
    const moodValue = useSelector(state => {
        const circle = state?.lifeStyleDetails?.circles.find(circle => circle?.name === SelectedCircle);
        if (circle) {
            const mytask = circle?.tasks.find(mappedTask => mappedTask?.taskId === task?.taskId);
            if (mytask) {
                return task?.mood;
            }
        }
        return null; // or any default value you prefer
    });
    const isCompleted = useSelector(state => {
        const circle = state?.lifeStyleDetails?.circles.find(circle => circle?.name === SelectedCircle);
        if (circle) {
            const mytask = circle?.tasks.find(mappedTask => mappedTask.taskId === task?.taskId);
            return mytask ? task?.completed : false;
        }
        return false;
    });

    const storedFeedbackValue = useSelector(state => {
        const circle = state?.lifeStyleDetails?.circles.find(circle => circle?.name === SelectedCircle);
        if (circle) {
            const mytask = circle?.tasks.find(mappedTask => mappedTask.taskId === task?.taskId);
            return mytask ? task?.feedback : '';
        }
        return '';
    });



    // mealinfo value

    const storedMealInfoValue = useSelector(state => {
        const circle = state?.lifeStyleDetails?.circles.find(circle => circle?.name === SelectedCircle);
        if (circle) {
            const mytask = circle?.tasks.find(mappedTask => mappedTask.taskId === task?.taskId);

            return mytask ? task?.mealInfo : null;
        }
        return null;
    });

    console.log("stored mealinfo value is", storedMealInfoValue);

    // function to POST emoji reaction
    function handleEmojiReaction() {
        dispatch(changeMoodIcon(SelectedCircle, task?.taskId, selectedFeeling));
        axiosClient.post('/', {
            user: JSON.parse(localStorage.getItem('user'))['code'],
            date: finalDate,
            taskId: task?.taskId,
            events: [
                {
                    type: "mood",
                    input: selectedFeeling
                }
            ]
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                dispatch(changeMoodIcon(SelectedCircle, task?.taskId, -1)); // reset mood icon
                setSelectedFeeling(-1); // reset mood icon in state
                toast.error('Something went wrong');
                console.error(err);
            })
    }

    // function to handle feedback response
    function handleFeedbackResponse() {
        if (feedback !== '') {
            axiosClient.post('/', {
                user: JSON.parse(localStorage.getItem('user'))['code'],
                date: finalDate,
                taskId: task?.taskId,
                events: [
                    {
                        type: "feedback",
                        input: feedback
                    }
                ]
            })
                .then(res => {
                    const action = handleFeedbackChange(SelectedCircle, task?.taskId, feedback);
                    dispatch(action);
                    console.log(res);
                })
                .catch(err => {
                    const resetAction = handleFeedbackChange(SelectedCircle, task?.taskId, null);
                    dispatch(resetAction);
                    toast.error('Something went wrong');
                    console.error(err);
                })
        }
    }

    // function for Mark as Done
    function handleMarkDone() {
        setTaskCompleted(true);
        dispatch(toggleCompletion(SelectedCircle, task?.taskId));
        axiosClient.post('/', {
            user: JSON.parse(localStorage.getItem('user'))['code'],
            date: finalDate,
            taskId: task?.taskId,
            events: [
                {
                    type: "completed",
                    input: task?.completed === undefined ? true : !task?.completed
                }
            ]
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                setTaskCompleted(false);
                dispatch(toggleCompletion(SelectedCircle, task?.taskId));
                toast.error('Something went wrong');
                console.error(err);
            })
    }

    useEffect(() => {
        console.log("tasks : ", task)
        if (selectedFeeling !== -1) {
            handleEmojiReaction();
        }
    }, [selectedFeeling])

    useEffect(() => {
        console.log("toggled ")
    }, [isCompleted])


    // meal info handling

    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [mealInfo, setMealInfo] = useState(null);
    const [loading, setLoader] = useState(false);
    const [loadingpic, setLoadingpic] = useState(false);

    const profilePicRef = useRef(null);
    const fileInputRef = useRef(null);
    const profilePicCameraRef = useRef(null);
    const [showProfilePicPopup, setShowProfilePicPopup] = useState(false);


    useEffect(() => {
        if (task.type === 'meal') {
            setIsMealTask(true);
        } else {
            setIsMealTask(false);
        }
    }, [task.type]);

    useEffect(() => {
        if (task.mealInfo && (storedMealInfoValue == null || storedMealInfoValue == undefined)) {

            // setMealInfo(task.mealInfo);
            setMealInfo(task.mealInfo);
            console.log("GET API RESPONSE is:", task.mealInfo.mealNutritionAnalysis);
            setImageURL(task.mealUrl);
        } else {
            setMealInfo(null);
        }
    }, [task.type]);

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
        console.log("clicked");
    };

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };



    const handleFileChange = (e) => {
        setLoader(true);
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };

            reader.onloadend = () => {
                setFile(selectedFile);
                setLoader(false);
                setLoadingpic(true);
                setshowMealInfo(false);

            };

            reader.readAsDataURL(selectedFile);
        }
    };


    const handleSubmit = async () => {
        if (file) {
            setLoader(true);
            try {

                const formData = new FormData();
                formData.append('file', file);
                formData.append('user', JSON.parse(localStorage.getItem('user'))['code']);
                formData.append('date', finalDate);
                formData.append('taskId', task?.taskId);

                const res = await axios.post('https://otm-main-production.up.railway.app/api/v1/lifestyle/meal-info', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (res.data) {
                    dispatch(handleMealinfoChange(SelectedCircle, task?.taskId, res.data));

                    setLoader(false);
                    setResponse(res.data);
                    console.log("res.data is ", res.data);
                    setError(null);
                    setImageURL(res.data.mealUrl);
                    console.log(res.data.mealNutritionAnalysis.calories);
                    setMealInfo(res.data.mealNutritionAnalysis);
                    console.log("POST API RESPONSE- res.data.mealNutritionAnalysis ", res.data.mealNutritionAnalysis);
                    setshowMealInfo(true);
                    setSelectedImage(null);
                    setShowProfilePicPopup(false);
                }
            } catch (err) {
                console.error('Error submitting the request:', err);
                setError(err);
                setResponse(null);
                setLoader(false);
            }
        }
    };


    const MealTaskComponent = () => {

        if (isMealTask && (!mealInfo && !storedMealInfoValue)) {
            console.log("inside empty meal card ", mealInfo);

            return <div onClick={handleClick}>

                <EmptyMealCard />

            </div>;
        }

        else if (isMealTask && (mealInfo !== undefined && mealInfo !== null)) {
            console.log("inside isMealTask && mealInfo ", mealInfo);
            return <div className="flex justify-center items-center h-auto mb-5">

                <FullMealInfoCard mealdata={mealInfo} ImagePath={imageURL} finalDate={finalDate} />

            </div>;
        }
        else if (isMealTask && storedMealInfoValue) {
            console.log("inside redux card ", storedMealInfoValue);

            return <div className="flex justify-center items-center h-auto mb-5">

                <FullMealInfoCard mealdata={storedMealInfoValue.mealNutritionAnalysis} ImagePath={storedMealInfoValue.mealUrl} finalDate={finalDate} />

            </div>;
        }
    }


    return (
        <div className="h-screen overflow-y-scroll w-full fixed top-0 left-0 z-[100]  bg-black p-2" style={{ paddingBottom: isIPhone() ? '150px' : '' }}>



            {!showMealInfo && <>

                <div className="relative flex items-center p-4 bg-black text-white">
                    {/* BackButton */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none" onClick={() => setShowTaskDetail(false)}>
                        <path d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z" fill="#7E87EF" />
                    </svg>

                    <div className="w-full flex flex-col justify-center items-center text-center">
                        <span className="text-lightGray font-sfpro text-sm font-medium ">    <div className="text-dark-grey font-sfpro text-sm font-medium"> {SelectedCircle}</div> </span>
                        <span className="text-custompurple font-sfpro text-lg block mt-1">{task?.time}</span>
                    </div>

                </div>

                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-[26px] leading-normal text-white font-sfpro font-medium capitalize ml-3">{task?.name}</h1>
                    <button className="flex items-center flex-col " onClick={handleMarkDone}>
                        <div className="" />
                        <div className='pr-3'>
                            {(task?.completed || isCompleted) ? (
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="17" cy="17" r="15.5" fill="#282828" stroke="#7E87EF" stroke-width="2" />
                                    <circle cx="17" cy="17" r="10.5" fill="#5ECC7B" />
                                </svg>


                            ) : (
                                <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle id="Ellipse 1776" cx="16.5" cy="17" r="15.5" stroke="#3D3D3D" stroke-width="2" />
                                </svg>

                            )}
                        </div>


                        {!(task?.completed || isCompleted) &&
                            <div className='pr-2 pb-2'>
                                <span className="text-customGray font-sfpro text-xs font-medium">Mark as done</span>
                            </div>
                        }
                    </button>
                </div>

                <div className="w-auto p-3 ">

                    <div className="mb-6 ">
                        <TaskCard task={task} />
                    </div>



                    {/* meal info components */}

                    <MealTaskComponent />

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

                                        <input ref={profilePicRef} type='file' accept='image/png, image/jpg, image/jpeg' name="profile image" hidden onInput={handleFileChange}></input>
                                        <button className='border-gray-500 border-[0.5px] rounded-full p-3 cursor-pointer'>
                                            <BsImageFill size={30} color='#7E87EF' />
                                        </button>
                                        <IconLabel>Gallery</IconLabel>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    }



                    <div className="mb-6 ">
                        <h3 className="text-[20px] text-white font-sfpro mb-2 leading-8">Reflect</h3>
                        <div className='bg-mediumGray rounded-xl p-2'>
                            <p className="text-custompurple mb-2 p-2 text-[14px]">
                                How did you feel performing this habit today?
                                <br />
                                Any insights you’d like to note?
                            </p>
                            {(task?.feedback === undefined || task?.feedback === null || storedFeedbackValue === undefined || storedFeedbackValue === null) ?
                                <textarea
                                    className="w-full p-2  bg-black rounded-xl text-white font-sfpro focus:outline-none"
                                    placeholder="Type your answer here..."
                                    onChange={(e) => setFeedback(e.target.value)}
                                /> :
                                <p className='px-2 text-md text-lightGray text-[14px]'>{task?.feedback}</p>
                            }
                            {(task?.feedback === undefined || task?.feedback === null || storedFeedbackValue === undefined || storedFeedbackValue === null) && <button className="w-full p-1 leading-8 bg-custompurple text-black rounded-xl text-sm" onClick={handleFeedbackResponse}>Submit</button>}
                        </div>

                    </div>
                    <div className="mb-9">
                        <h3 className="text-[20px] mb-2 pb-4 leading-8 font-sfpro">Feeling Check-In</h3>
                        <div className="flex space-x-4 items-center justify-center w-full">
                            <button
                                onClick={() => setSelectedFeeling(1)}
                                className={`transition-transform duration-200 ${(selectedFeeling === 1 || moodValue === 1) ? 'transform scale-125 bg-white/10 rounded-md' : ''
                                    }`}
                            >
                                <img src={'./assets/Feeling-sad.svg'} alt="Sad" className={`w-15 h-15 ${(selectedFeeling === 1 || moodValue === 1) ? 'text-red-500' : ''}`} />
                            </button>
                            <button
                                onClick={() => setSelectedFeeling(2)}
                                className={`transition-transform duration-200 ${(selectedFeeling === 2 || moodValue === 2) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                    }`}
                            >
                                <img src={'./assets/Feeling-sad2.svg'} alt="Neutral" className={`w-15 h-15 ${(selectedFeeling === 2 || moodValue === 2) ? 'text-yellow-500' : ''}`} />
                            </button>
                            <button
                                onClick={() => setSelectedFeeling(3)}
                                className={`transition-transform duration-200 ${(selectedFeeling === 3 || moodValue === 3) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                    }`}
                            >
                                <img src={'./assets/Feeling-neutral.svg'} alt="Happy" className={`w-15 h-15 ${(selectedFeeling === 3 || moodValue === 3) ? 'text-yellow-400' : ''}`} />
                            </button>
                            <button
                                onClick={() => setSelectedFeeling(4)}
                                className={`transition-transform duration-200 ${(selectedFeeling === 4 || moodValue === 4) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                    }`}
                            >
                                <img src={'./assets/Feeling-happy.svg'} alt="Very Happy" className={`w-15 h-15 ${(selectedFeeling === 4 || moodValue === 4) ? 'text-green-500' : ''}`} />
                            </button>
                            <button
                                onClick={() => setSelectedFeeling(5)}
                                className={`transition-transform duration-200 ${(selectedFeeling === 5 || moodValue === 5) ? 'transform scale-125  bg-white/10 rounded-md' : ''
                                    }`}
                            >
                                <img src={'./assets/Feeling-happy2.svg'} alt="Ecstatic" className={`w-15 h-15 ${(selectedFeeling === 5 || moodValue === 5) ? 'text-green-400' : ''}`} />
                            </button>
                        </div>
                    </div>
                    {!(task?.completed || isCompleted) &&
                        <div className='w-full px-3 fixed bottom-4 left-0'>
                            <button className="w-full bg-custompurple text-black rounded-xl p-2" onClick={handleMarkDone}>Mark as Done</button>
                        </div>
                    }
                </div>
            </>

            }

            {/* meal info conditional components */}

            {showMealInfo && <div className="flex justify-center items-center h-auto mb-20 flex-col">

                <div onClick={() => setshowMealInfo(false)} className='flex flex-row items-center text-center align-middle justify-center mt-10  ' >

                    <svg className='mt-1' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="elements">
                            <circle id="Ellipse 1119" cx="4.07031" cy="4.06152" r="0.8125" stroke="#F8F8F8" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                            <path id="Rectangle 2056" d="M1.35938 6.49935C1.35938 4.07358 1.35938 2.8607 2.11296 2.10711C2.86655 1.35352 4.07944 1.35352 6.50521 1.35352C8.93098 1.35352 10.1439 1.35352 10.8975 2.10711C11.651 2.8607 11.651 4.07358 11.651 6.49935C11.651 8.92512 11.651 10.138 10.8975 10.8916C10.1439 11.6452 8.93098 11.6452 6.50521 11.6452C4.07944 11.6452 2.86655 11.6452 2.11296 10.8916C1.35938 10.138 1.35938 8.92512 1.35938 6.49935Z" stroke="#F8F8F8" stroke-width="1.2" />
                            <path id="Vector" d="M2.71094 11.374C5.07935 8.54379 7.73439 4.81119 11.6471 7.33447" stroke="#F8F8F8" stroke-width="1.2" />
                        </g>
                    </svg>


                    <div className="text-lightGray font-sfpro text-[14px] font-medium pl-2 font-sfpro">Upload meal photo</div>

                    <div className='absolute right-9 mb-1'  >     <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18.4932" cy="18.4932" r="18.4932" fill="#1C1C1E" />
                        <path d="M24.1026 12.8848L12.8828 24.1045M24.1026 24.1045L12.8828 12.8848" stroke="#B1B1B1" stroke-width="1.60274" stroke-linecap="round" />
                    </svg> </div>





                </div>

                <MealPage mealdata={mealInfo} ImagePath={imageURL} />



                <div className='w-full px-3 bottom-4 left-0 mt-10'>
                    <button className="w-full bg-custompurple text-black rounded-xl pt-[10px] pb-[10px]  pr-[14px]  pl-[14px] " onClick={() => setshowMealInfo(false)} >Done</button>
                </div>

            </div>}


            {selectedImage && <div className="max-w-sm mx-auto  rounded-lg shadow-md p-3 flex items-center space-x-6  mb-2  " >




                <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                    <div className=" p-6 rounded-lg shadow-lg">

                        <div className='flex flex-row items-center text-center align-middle justify-center ' >

                            <div className='flex flex-row items-center text-center mb-50 absolute  top-12'>
                                <svg className='mt-1' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="elements">
                                        <circle id="Ellipse 1119" cx="4.07031" cy="4.06152" r="0.8125" stroke="#F8F8F8" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Rectangle 2056" d="M1.35938 6.49935C1.35938 4.07358 1.35938 2.8607 2.11296 2.10711C2.86655 1.35352 4.07944 1.35352 6.50521 1.35352C8.93098 1.35352 10.1439 1.35352 10.8975 2.10711C11.651 2.8607 11.651 4.07358 11.651 6.49935C11.651 8.92512 11.651 10.138 10.8975 10.8916C10.1439 11.6452 8.93098 11.6452 6.50521 11.6452C4.07944 11.6452 2.86655 11.6452 2.11296 10.8916C1.35938 10.138 1.35938 8.92512 1.35938 6.49935Z" stroke="#F8F8F8" stroke-width="1.2" />
                                        <path id="Vector" d="M2.71094 11.374C5.07935 8.54379 7.73439 4.81119 11.6471 7.33447" stroke="#F8F8F8" stroke-width="1.2" />
                                    </g>
                                </svg>


                                <div className="text-lightGray font-sfpro text-[14px] font-medium pl-2  font-sfpro ml-15">Upload meal photo</div>
                            </div>



                            <div onClick={() => setSelectedImage(null)} className='absolute right-10 top-10'>
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18.4932" cy="18.4932" r="18.4932" fill="#1C1C1E" />
                                    <path d="M24.1026 12.8848L12.8828 24.1045M24.1026 24.1045L12.8828 12.8848" stroke="#B1B1B1" stroke-width="1.60274" stroke-linecap="round" />
                                </svg> </div>
                        </div>

                        <img className='rounded-lg mb-4 w-[358px] h-[421px]  ' src={selectedImage} alt="Preview" />

                        <div className='  w-full px-3 bottom-100 left-0 mt-[125px]'>
                            <button className="w-full text-lightGray underline mb-4 text-center   font-sfpro">pick a different image</button>
                            <button className="w-full bg-custompurple text-black rounded-xl p-2 flex flex-row justify-center align-middle font-sfpro" onClick={handleSubmit} > <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Frame 48096138">
                                    <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M24.424 10.296C15.7816 10.854 15.3286 11.3106 14.7706 19.9494C14.2125 11.307 13.756 10.854 5.11719 10.296C13.7596 9.73794 14.2125 9.28135 14.7706 0.642578C15.3286 9.28498 15.7852 9.73794 24.424 10.296Z" fill="black" />
                                    <path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M13.0708 17.1116C7.47862 17.4726 7.18553 17.7681 6.82444 23.3579C6.46336 17.7657 6.16792 17.4726 0.578125 17.1116C6.17027 16.7505 6.46336 16.455 6.82444 10.8652C7.18553 16.4574 7.48096 16.7505 13.0708 17.1116Z" fill="black" />
                                </g>
                            </svg>
                                Analyse  </button>
                        </div>

                    </div>
                </div>


            </div>}


            {loading && (


                <div className="max-w-sm mx-auto  rounded-lg shadow-md p-3 flex items-center space-x-6 bg-mediumGray  mb-2  " >


                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                        <div className=" p-6 rounded-lg shadow-lg">

                            <Loader />

                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}

export default TaskDetail