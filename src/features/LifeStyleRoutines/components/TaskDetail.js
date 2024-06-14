import React, { useState, useEffect, useRef } from 'react'
import TaskCard from './TaskCard';
import EmptyMealCard from './EmptyMealCard';
import { axiosClient } from '../apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { changeMoodIcon, toggleCompletion, handleFeedbackChange } from '../ReduxStore/actions';
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
    const [selectedFeeling, setSelectedFeeling] = useState(-1);
    const [feedback, setFeedback] = useState('');

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
        console.log("clicked");
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


                } catch (err) {
                    console.error('Error submitting the request:', err);
                    setError(err);
                    setResponse(null);
                }
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div className="h-screen overflow-y-scroll w-full fixed top-0 left-0 z-[100]  bg-black p-2" style={{ paddingBottom: isIPhone() ? '150px' : '' }}>
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
                            // <img src={'./assets/task-left.svg'} alt="" />
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
                <div onClick={handleClick}>


                    <EmptyMealCard />

                </div>

                {/* loader */}

                {loading && (


                    <div className="max-w-sm mx-auto  rounded-lg shadow-md p-3 flex items-center space-x-6 bg-mediumGray  mb-2  " >

                        {/* <img src={loadingpic}></img> */}

                        <p className='text-white font-sfpro font-medium text-lg'> Loading...</p>
                    </div>
                )}


                {/* upload meal component */}

                {/* meal doughnut component */}

                <div>{

                    mealInfo &&

                    <div className="flex justify-center items-center h-auto mb-20">

                        <FullMealInfoCard mealdata={mealInfo} ImagePath={imageURL} />

                    </div>

                }
                </div>
                <div>{

                    mealInfo &&

                    <div className="flex justify-center items-center h-auto mb-20">

                        <MealDoughnut mealdata={mealInfo} />

                    </div>

                }
                    <div> <MealInfocard ImagePath={imageURL}></MealInfocard> </div>

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

        </div>
    )
}

export default TaskDetail