import React, { useEffect, useState, useRef } from 'react'
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

const AnalyseMealComp = ({ setParentVisibilityCheck, task = null, date = null, SelectedCircle = null
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
    console.log("task and date are", task, date);


    // redux implementation
    const dispatch = useDispatch();

    const storedMealInfoField = useSelector((state) => {
        console.log("INSIDE REDUX state", state);
        const circle = state?.lifeStyleDetails?.circles.find(
            (circle) => circle?.name === TaskCircle,
        );
        if (circle) {
            console.log("INSIDE REDUX circle", circle);
            const mytask = circle?.tasks.find(
                (mappedTask) => mappedTask.taskId === task?.taskId,
            );
            return mytask ? task?.mealInfo : null;
        }
        return '';
    });

    // mealUrl change
    const storedMealUrlField = useSelector((state) => {
        const circle = state?.lifeStyleDetails?.circles.find(
            (circle) => circle?.name === TaskCircle,
        );
        if (circle) {
            const mytask = circle?.tasks.find(
                (mappedTask) => mappedTask.taskId === task?.taskId,
            );
            return mytask ? task?.mealUrl : null;
        }
        return '';
    });

    console.log("storedMealUrlField", storedMealUrlField);
    console.log("storedMealInfoField", storedMealInfoField);
    // checking if arguments are empty

    useEffect(() => {

        if (storedMealInfoField) {
            setIsVisible(false);
        }

        else if (!storedMealInfoField) {
            setIsVisible(true);
        }

    }, [storedMealInfoField]);



    useEffect(() => {

        if (task == null) {
            getUserData(finalDate)
            setselectedTaskId('');
        }

        else if (!storedMealInfoField) {
            setIsVisible(true);
        }

    }, [storedMealInfoField]);



    const getUserData = async (date) => {
        setLoader(true);
        const memberCode = JSON.parse(localStorage.getItem('user'))?.code;
        try {
            const response = await axiosClient.get(`?user=${memberCode}&date=${date}`);
            dispatch(fetchInitialStateSuccess(response.data));

            setApiResponse(response.data);
            console.log("API RESPONSE", response.data);


            const mealTaskIds = response.data.lifeStyleDetails.circles.flatMap(circle =>
                circle.tasks
                    .filter(task => task.type === 'meal').map(task => ({ taskId: task.taskId, taskName: task.name, circleName: circle.name }))
            );

            console.log("MEAL TASK IDS", mealTaskIds);

            setmealTaskIds(mealTaskIds);
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
        if (file && selectedTaskId && finalDate) {
            setLoader(true);
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append(
                    'user',
                    JSON.parse(localStorage.getItem('user'))['code'],
                );
                formData.append('date', finalDate);
                console.log("Selected taskId and date is", selectedTaskId, finalDate);
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


                    console.log("inside API selected circle and taskId", TaskCircle, selectedTaskId);

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
        setselectedTaskId(taskId);
        const selectedTask = mealTaskIds.find(task => task.taskId === taskId);
        if (selectedTask) {
            setTaskCircle(selectedTask.circleName);
        }
        console.log("selected circle is", selectedTask.circleName);


        // setselectedTaskId(event.target.value);

        // console.log("event is", selectedTaskId);
    };



    const DropdownComp = () => {
        return (


            <div className="flex items-center justify-center bg-medium-gray">
                <div className="bg-medium-gray p-6 rounded shadow-md w-80">
                    <label htmlFor="taskId" className="bg-medium-gray block text-sm font-medium text-gray-700 mb-2">Select your meal:</label>
                    <select
                        id="taskId"
                        value={selectedTaskId}
                        onChange={handleSelectChange}
                        className="text-lightGray mt-1 block w-full py-2 px-3 border border-gray-300 bg-mediumGray rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>Select one option</option>


                        {mealTaskIds != null ? (
                            mealTaskIds.map((task, index) => (
                                <option key={index} value={task.taskId}>{task.taskName}</option>
                            ))) : (
                            <option value={selectedTaskId}>{selectedTaskName}</option>
                        )}



                    </select>

                </div>
            </div>


        );
    }

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
            {isVisible ?
                <>
                    <div className="flex w-full flex-row items-center justify-between text-center align-middle mt-2">
                        {/* empty div to put other two divs in place */}
                        <div></div>

                        <div className=" flex flex-row items-center  text-center">
                            <MealImageicon />

                            <div className="ml-15 pl-2 font-sfpro text-[14px]  font-medium text-lightGray">
                                Upload meal photo
                            </div>
                        </div>

                        <div className='mr-4'
                            onClick={handleClose}
                        >
                            <MealCrossIcon />{' '}
                        </div>
                    </div>

                    <div className="  flex max-w-sm items-center space-x-6 rounded-lg  shadow-md  ">

                        <div className="flex items-center justify-center ">
                            <div className="  rounded-lg shadow-lg">




                                <div className="ml-2 mb-6 mt-[58px] h-[421px] w-[358px]   border-gray-400 rounded-lg flex items-center justify-center bg-mediumGray" onClick={() => setshowMealPicPopUp(true)}>


                                    {!selectedImage ? <div className=" rounded-lg  p-4 ">
                                        <p className='text-center'>
                                            Click here to upload image
                                        </p>
                                    </div> : <img
                                        className="h-auto w-auto object-cover"
                                        src={selectedImage}
                                        alt="Preview"
                                    />
                                    }



                                </div>



                                <div className="w-full px-3">

                                    {!selectedImage ? <div >
                                        <p >

                                        </p>
                                    </div> : <button
                                        onClick={() => setshowMealPicPopUp(true)}
                                        className="mb-4 w-full text-center font-sfpro text-lightGray underline"
                                    >
                                        pick a different image
                                    </button>
                                    }

                                    <div className="flex justify-center items-center border-[1px] border-gray-400 rounded-lg  " >

                                        <DropdownComp

                                        // placeholder="Select an option"
                                        />
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
                                </div>
                            </div>
                        </div>




                    </div>
                </> : <MealPage finalDate={finalDate}
                    mealInfo={storedMealInfoField ? storedMealInfoField : tempMealInfo}
                    imageURL={storedMealUrlField ? storedMealUrlField : tempMealUrl} setParentVisibilityCheck={setParentVisibilityCheck} />


            }

            {
                showMealPicPopUp && (
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
                )
            }


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





    )
}

export default AnalyseMealComp