import React, { useEffect, useState, useRef } from 'react';
import SparkleIcon from './icons/SparkleIcon';
import { axiosClient } from '../apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';
import { IoCamera } from 'react-icons/io5';
import { BsImageFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import {
    fetchInitialStateSuccess,
    handleMealInfoChange,
    handleMealUrlChange,
} from '../ReduxStore/actions';
import { getFormattedDate } from '../utils';
import MealPage from './MealPage';
import { Loader } from '../../../components';
import MealImageicon from './icons/MealImageicon';
import MealCrossIcon from './icons/MealCrossIcon';

const AnalyseMealComp = ({
    setParentVisibilityCheck = null,
    task = null,
    date = null,
    SelectedCircle = null,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showMealPicPopUp, setshowMealPicPopUp] = useState(false);
    const profilePicRef = useRef(null);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoader] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [mealTaskIds, setmealTaskIds] = useState(null);
    const [selectedTaskId, setselectedTaskId] = useState(task?.taskId);
    const [selectedTaskName, setselectedTaskName] = useState(task?.name);

    const [TaskCircle, setTaskCircle] = useState(SelectedCircle);

    const [tempMealInfo, setTempMealInfo] = useState(null);
    const [tempMealUrl, setTempMealUrl] = useState(null);

    const formattedDate = getFormattedDate();
    const finalDate = date === null || date === undefined ? formattedDate : date;

    // console.log();
    console.log('task and date are', task, date);

    // redux implementation
    const dispatch = useDispatch();

    const selectCircleAndTask = (state, TaskCircle, task) => {
        console.log('INSIDE REDUX state', state);
        const circle = state?.lifeStyleDetails?.circles.find(
            (circle) => circle?.name === TaskCircle,
        );

        if (!circle) {
            return { circle: null, task: null };
        }

        console.log('INSIDE REDUX circle', circle);
        const myTask = circle?.tasks.find(
            (mappedTask) => mappedTask.taskId === task?.taskId,
        );

        return { circle, task: myTask };
    };

    const storedMealInfoField = useSelector((state) => {
        const { task: myTask } = selectCircleAndTask(state, TaskCircle, task);
        return myTask ? myTask.mealInfo : '';
    });

    const storedMealUrlField = useSelector((state) => {
        const { task: myTask } = selectCircleAndTask(state, TaskCircle, task);
        return myTask ? myTask.mealUrl : '';
    });

    console.log('storedMealUrlField', storedMealUrlField);
    console.log('storedMealInfoField', storedMealInfoField);
    // checking if arguments are empty

    useEffect(() => {
        if (storedMealInfoField) {
            setIsVisible(false);
        } else if (!storedMealInfoField) {
            setIsVisible(true);
        }
    }, [storedMealInfoField]);

    useEffect(() => {
        if (task == null) {
            getUserData();
            setselectedTaskId('');
        } else if (!storedMealInfoField) {
            setIsVisible(true);
        }
    }, [storedMealInfoField]);

    const getUserData = async () => {
        setLoader(true);

        try {
            const mealObject = [
                { taskId: '1', taskName: 'Breakfast' },
                { taskId: '2', taskName: 'Lunch' },
                { taskId: '3', taskName: 'Dinner' },
            ];
            setmealTaskIds(mealObject);
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    //   Meal image handling

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const ProfilePicHeading = styled.div`
    color: #d7d7d7;
    text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 20px;
    font-style: normal;
    line-height: 29.066px; /* 160% */
    text-transform: capitalize;
    letter-spacing: 1px;
  `;
    const IconLabel = styled.div`
    color: #d7d7d7;
    text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 15px;
    font-style: normal;
    line-height: 29.066px; /* 160% */
    text-transform: capitalize;
    letter-spacing: 1px;
  `;

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

    const handleClose = () => {
        setParentVisibilityCheck(true);
    };

    // Meal image post request handling
    const handleMealUploadSubmit = async () => {
        if (file && finalDate) {
            setLoader(true);
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append(
                    'user',
                    JSON.parse(localStorage.getItem('user'))['code'],
                );
                formData.append('date', finalDate);
                console.log('Selected taskId and date is', selectedTaskId, finalDate);
                formData.append('taskId', selectedTaskId);

                const res = await axiosClient.post('/meal-info', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                //if api data is available
                if (res.data) {
                    setLoader(false);
                    const { mealUrl, mealNutritionAnalysis } = res.data;
                    setIsVisible(false);

                    console.log(
                        'inside API selected circle and taskId',
                        TaskCircle,
                        selectedTaskId,
                    );

                    setTempMealInfo(mealNutritionAnalysis);
                    setTempMealUrl(mealUrl);

                    dispatch(
                        handleMealInfoChange(
                            TaskCircle,
                            selectedTaskId,
                            mealNutritionAnalysis,
                        ),
                    );
                    dispatch(handleMealUrlChange(TaskCircle, selectedTaskId, mealUrl));
                    setSelectedImage(null);
                    setshowMealPicPopUp(false);
                }
            } catch (err) {
                setLoader(false);
                toast.error(err.response?.data?.message);
                console.error('Error submitting the request:', err);
            }
        }
    };

    const handleSelectChange = (event) => {
        const taskId = event.target.value;
        console.log('selected task is', taskId);

        setselectedTaskId(taskId);
        const selectedTask = mealTaskIds.find((task) => task.taskId === taskId);
        if (selectedTask) {
            setTaskCircle(selectedTask.circleName);
        }

        if (task == null) {
            setselectedTaskId(undefined);
        }
    };

    const DropdownComp = () => {
        return (
            <div className="py-4 w-full">
                <label
                    className="text-xs tracking-widest text-lightGray"
                    htmlFor="taskId"
                >
                    Select your meal:
                </label>

                <select
                    className="block w-full px-4 py-2 border border-[#2A2A2A] bg-transparent focus:outline-none rounded-lg border-[1px] border-[solid] border-[#2A2A2A] gap-[8px]"
                    id="taskId"
                    value={selectedTaskId}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled className='bg-mediumGray text-white w-[10px] '>
                        Select one option
                    </option>


                    {mealTaskIds != null ? (
                        mealTaskIds.map((task, index) => (
                            <option key={index} value={task.taskId} className='bg-mediumGray text-white' >
                                {task.taskName}
                            </option>
                        ))
                    ) : (
                        <option value={selectedTaskId}>{selectedTaskName}</option>
                    )}


                </select>
            </div>


        );
    };

    // file upload
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
                setshowMealPicPopUp(false);
                setLoader(false);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    // Meal Information Component

    return (
        <>
            {isVisible ? (
                <>
                    {setParentVisibilityCheck && (
                        <div className="mt-2 flex w-full flex-row items-center justify-center text-center align-middle">
                            {/* empty div to put other two divs in place */}
                            <div></div>

                            <div className=" flex flex-row items-center  text-center">
                                <MealImageicon />

                                <div className="ml-15 font-sfpro text-[14px]  font-medium text-lightGray">
                                    Upload meal photo
                                </div>
                            </div>

                            <div className="mr-4" onClick={handleClose}>
                                <MealCrossIcon />{' '}
                            </div>
                        </div>
                    )}

                    <div className="  flex max-w-sm items-center space-x-6 rounded-lg  shadow-md  ">
                        <div className="flex items-center justify-center ">
                            <div className="  rounded-lg shadow-lg">
                                {!selectedImage ? (
                                    <div
                                        style={{
                                            backgroundImage: `url('/assets/meal-analysis-image-placeholder.jpg')`,
                                            backgroundBlendMode: 'color-dodge',
                                        }}
                                        className=" mb-6 mt-[58px] flex h-[421px]   w-[358px] items-center justify-center rounded-lg border-gray-400 bg-mediumGray bg-cover "
                                        onClick={() => setshowMealPicPopUp(true)}
                                    >
                                        <div className=" rounded-lg  p-4 ">
                                            <p className="text-center">Click here to upload image</p>
                                        </div>{' '}
                                    </div>
                                ) : (
                                    <div
                                        className="mb-6 ml-2 mt-[58px] flex h-[421px]   h-fit w-[358px] items-center justify-center rounded-lg border-gray-400 bg-mediumGray bg-cover "
                                        onClick={() => setshowMealPicPopUp(true)}
                                    >
                                        {' '}
                                        <img
                                            className=" m-auto h-fit w-full rounded-lg bg-cover  "
                                            src={selectedImage}
                                            alt="Preview"
                                        />
                                    </div>
                                )}

                                <div className="w-full px-3">
                                    {!selectedImage ? (
                                        <div>
                                            <p></p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setshowMealPicPopUp(true)}
                                            className="mb-4 w-full text-center font-sfpro text-lightGray underline"
                                        >
                                            pick a different image
                                        </button>
                                    )}

                                    <div className="flex items-center justify-center rounded-lg  ">
                                        <DropdownComp />
                                    </div>
                                    <div className="fixed bottom-4 left-0 w-full px-3">
                                        <button
                                            className="flex w-full flex-row items-center justify-center rounded-xl bg-custompurple p-3 text-black "
                                            onClick={handleMealUploadSubmit}
                                        >
                                            <SparkleIcon />
                                            Analyse{' '}
                                        </button>
                                    </div>

                                    <div className="h-[120px] w-[1px]  "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <MealPage
                    finalDate={finalDate}
                    mealInfo={storedMealInfoField ? storedMealInfoField : tempMealInfo}
                    imageURL={storedMealUrlField ? storedMealUrlField : tempMealUrl}
                    setParentVisibilityCheck={
                        setParentVisibilityCheck ? setParentVisibilityCheck : setIsVisible
                    }
                />
            )}

            {showMealPicPopUp && (
                <motion.div
                    className="fixed bottom-0 left-0 z-50 h-[200px] w-full rounded-t-[30px] bg-gradient-to-r from-gray-500/30 to-gray-900/60 p-5 backdrop-blur-lg"
                    initial="hidden"
                    animate={showMealPicPopUp ? 'visible' : 'hidden'}
                    variants={modalVariants}
                >
                    <button
                        className="absolute left-[47%] top-0 cursor-pointer"
                        onClick={() => setshowMealPicPopUp(false)}
                    >
                        <MdOutlineKeyboardArrowDown size={30} color="#D7D7D7" />
                    </button>
                    <div className="mt-3 flex h-full w-full flex-col items-start justify-around ">
                        <ProfilePicHeading>Meal photo</ProfilePicHeading>
                        <div className="flex w-full flex-row items-center justify-start gap-[40px]">
                            <div
                                className="flex w-fit flex-col items-center justify-center gap-1"
                                onClick={handleCameraClick}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    capture="user"
                                    hidden
                                    onChange={handleFileChange}
                                />
                                <button className="cursor-pointer rounded-full border-[0.5px] border-gray-500 p-3">
                                    <IoCamera size={30} color="#7E87EF" />
                                </button>
                                <IconLabel>Camera</IconLabel>
                            </div>
                            <div
                                className="flex w-fit flex-col items-center justify-center gap-1"
                                onClick={() => profilePicRef.current.click()}
                            >
                                <input
                                    ref={profilePicRef}
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    name="profile image"
                                    hidden
                                    onInput={handleFileChange}
                                ></input>
                                <button className="cursor-pointer rounded-full border-[0.5px] border-gray-500 p-3">
                                    <BsImageFill size={30} color="#7E87EF" />
                                </button>
                                <IconLabel>Gallery</IconLabel>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* loading component */}

            {loading && (
                <div className="mx-auto mb-2  flex max-w-sm items-center space-x-6 rounded-lg bg-mediumGray p-3  shadow-md  ">
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className=" rounded-lg p-6 shadow-lg">
                            <Loader />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AnalyseMealComp;
