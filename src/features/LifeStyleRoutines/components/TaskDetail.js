import React, { useState, useEffect, useRef } from 'react';
import TaskCard from './TaskCard';
import { axiosClient } from '../apiClient';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMoodIcon,
  toggleCompletion,
  handleFeedbackChange,
  handleMealInfoChange,
  handleMealUrlChange,
} from '../ReduxStore/actions';
import { getFormattedDate, isIPhone } from '../utils';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';
import { IoCamera } from 'react-icons/io5';
import { BsImageFill } from 'react-icons/bs';

import FullMealInfoCard from './FullMealInfoCard';
import MealPage from './MealPage';
import { Loader } from '../../../components';
import MealUploadButton from './MealUploadButton';
import MealImageicon from './icons/MealImageicon';
import MealCrossIcon from './icons/MealCrossIcon';
import SparkleIcon from './icons/SparkleIcon';

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

const TaskDetail = ({
  SelectedCircle,
  task,
  setShowTaskDetail,
  setTaskCompleted,
  date,
  taskCompleted,
}) => {
  const [isMealTask, setIsMealTask] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState(-1);
  const [feedback, setFeedback] = useState('');
  const [showMealInfoPage, setshowMealInfoPage] = useState(false);
  const [showImageUploadPage, setshowImageUploadPage] = useState(false);

  // meal info handling

  const [loading, setLoader] = useState(false);

  const profilePicRef = useRef(null);
  const fileInputRef = useRef(null);

  const [showProfilePicPopup, setShowProfilePicPopup] = useState(false);

  const formattedDate = getFormattedDate();
  const finalDate = date === null || date === undefined ? formattedDate : date;

  const dispatch = useDispatch();

  const moodValue = useSelector((state) => {
    const circle = state?.lifeStyleDetails?.circles.find(
      (circle) => circle?.name === SelectedCircle,
    );
    if (circle) {
      const mytask = circle?.tasks.find(
        (mappedTask) => mappedTask?.taskId === task?.taskId,
      );
      if (mytask) {
        return task?.mood;
      }
    }
    return null; // or any default value you prefer
  });

  const isCompleted = useSelector((state) => {
    const circle = state?.lifeStyleDetails?.circles.find(
      (circle) => circle?.name === SelectedCircle,
    );
    if (circle) {
      const mytask = circle?.tasks.find(
        (mappedTask) => mappedTask.taskId === task?.taskId,
      );
      return mytask ? task?.completed : false;
    }
    return false;
  });

  const storedFeedbackValue = useSelector((state) => {
    const circle = state?.lifeStyleDetails?.circles.find(
      (circle) => circle?.name === SelectedCircle,
    );
    if (circle) {
      const mytask = circle?.tasks.find(
        (mappedTask) => mappedTask.taskId === task?.taskId,
      );
      return mytask ? task?.feedback : '';
    }
    return '';
  });

  // mealinfo change
  const storedMealInfoField = useSelector((state) => {
    const circle = state?.lifeStyleDetails?.circles.find(
      (circle) => circle?.name === SelectedCircle,
    );
    if (circle) {
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
      (circle) => circle?.name === SelectedCircle,
    );
    if (circle) {
      const mytask = circle?.tasks.find(
        (mappedTask) => mappedTask.taskId === task?.taskId,
      );
      return mytask ? task?.mealUrl : null;
    }
    return '';
  });

  // function to POST emoji reaction
  function handleEmojiReaction() {
    dispatch(changeMoodIcon(SelectedCircle, task?.taskId, selectedFeeling));
    axiosClient
      .post('/', {
        user: JSON.parse(localStorage.getItem('user'))['code'],
        date: finalDate,
        taskId: task?.taskId,
        events: [
          {
            type: 'mood',
            input: selectedFeeling,
          },
        ],
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        dispatch(changeMoodIcon(SelectedCircle, task?.taskId, -1)); // reset mood icon
        setSelectedFeeling(-1); // reset mood icon in state
        toast.error('Something went wrong');
        console.error(err);
      });
  }

  // function to handle feedback response
  function handleFeedbackResponse() {
    if (feedback !== '') {
      axiosClient
        .post('/', {
          user: JSON.parse(localStorage.getItem('user'))['code'],
          date: finalDate,
          taskId: task?.taskId,
          events: [
            {
              type: 'feedback',
              input: feedback,
            },
          ],
        })
        .then((res) => {
          const action = handleFeedbackChange(
            SelectedCircle,
            task?.taskId,
            feedback,
          );
          dispatch(action);
          console.log(res);
        })
        .catch((err) => {
          const resetAction = handleFeedbackChange(
            SelectedCircle,
            task?.taskId,
            null,
          );
          dispatch(resetAction);
          toast.error('Something went wrong');
          console.error(err);
        });
    }
  }

  // function for Mark as Done
  function handleMarkDone() {
    setTaskCompleted(true);
    dispatch(toggleCompletion(SelectedCircle, task?.taskId));
    axiosClient
      .post('/', {
        user: JSON.parse(localStorage.getItem('user'))['code'],
        date: finalDate,
        taskId: task?.taskId,
        events: [
          {
            type: 'completed',
            input: task?.completed === undefined ? true : !task?.completed,
          },
        ],
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setTaskCompleted(false);
        dispatch(toggleCompletion(SelectedCircle, task?.taskId));
        toast.error('Something went wrong');
        console.error(err);
      });
  }

  useEffect(() => {
    if (selectedFeeling !== -1) {
      handleEmojiReaction();
    }
  }, [selectedFeeling]);

  useEffect(() => {}, [isCompleted]);

  // effect to check if task has a meal
  useEffect(() => {
    if (task.type === 'meal') {
      setIsMealTask(true);
    } else {
      setIsMealTask(false);
    }
  }, [task]);

  // effect to check if lifestyle routine has mealinfo data
  useEffect(() => {
    if (task.mealInfo) {
      dispatch(
        handleMealInfoChange(SelectedCircle, task?.taskId, task.mealInfo),
      );
      dispatch(handleMealUrlChange(SelectedCircle, task?.taskId, task.mealUrl));
      // setMealInfo(task.mealInfo);
      // setImageURL();
      console.log('**storedMealInfoField exists', task.mealInfo);
      // console.log('**task.mealInfo exists', task.mealInfo);
    } else {
      // console.log('task.mealInfo does not exist');
      console.log('**storedMealInfoField does not exist');
    }
  }, []);

  useEffect(() => {
    if (storedMealUrlField) {
      console.log(
        'current state feedbackvalue in redux is: ',
        storedMealUrlField,
      );
    } else {
      console.log('storedMealInfoField is : ', storedMealUrlField);
    }
  }, [storedMealUrlField]);

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
    console.log('clicked');
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
        setshowMealInfoPage(false);
        setshowImageUploadPage(true);
      };

      reader.onloadend = () => {
        setFile(selectedFile);
        setShowProfilePicPopup(false);
        setLoader(false);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleMealUploadSubmit = async () => {
    if (file) {
      setLoader(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append(
          'user',
          JSON.parse(localStorage.getItem('user'))['code'],
        );
        formData.append('date', finalDate);
        formData.append('taskId', task?.taskId);

        const res = await axiosClient.post('/meal-info', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        //if api data is available
        if (res.data) {
          setLoader(false);
          const { mealUrl, mealNutritionAnalysis } = res.data;
          // setImageURL(mealUrl);
          // setMealInfo(mealNutritionAnalysis);
          dispatch(
            handleMealInfoChange(
              SelectedCircle,
              task?.taskId,
              mealNutritionAnalysis,
            ),
          );
          dispatch(handleMealUrlChange(SelectedCircle, task?.taskId, mealUrl));
          setshowImageUploadPage(false);
          setshowMealInfoPage(true);
          setSelectedImage(null);
          setShowProfilePicPopup(false);
        }
      } catch (err) {
        setLoader(false);
        toast.error(err.response?.data?.message);
        console.error('Error submitting the request:', err);
      }
    }
  };

  const MealTaskComponent = () => {
    // if lifestyle routine does not have mealInfo data
    if (isMealTask && !storedMealInfoField) {
      // console.log('inside empty meal card ', mealInfo);
      console.log('inside empty meal card ', storedMealInfoField);

      return (
        <div onClick={handleClick}>
          <MealUploadButton />
        </div>
      );
    }
    //fetching from api
    else if (isMealTask && storedMealInfoField) {
      // console.log('inside isMealTask && mealInfo ', mealInfo, imageURL);
      console.log(
        'inside isMealTask && mealInfo ',
        storedMealInfoField,
        storedMealUrlField,
      );
      return (
        <div className="mb-5 flex h-auto items-center justify-center">
          <FullMealInfoCard
            mealInfo={storedMealInfoField}
            imageURL={storedMealUrlField}
            finalDate={finalDate}
            setshowMealInfoPage={setshowMealInfoPage}
          />
        </div>
      );
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-screen w-full overflow-y-scroll  bg-black p-2"
      style={{ paddingBottom: isIPhone() ? '150px' : '' }}
    >
      {!showMealInfoPage && !showImageUploadPage && (
        <>
          <div className="relative flex items-center bg-black p-4 text-white">
            {/* BackButton */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              onClick={() => setShowTaskDetail(false)}
            >
              <path
                d="M0 8.70206C0 9.03638 0.127827 9.32153 0.393314 9.57719L8.06293 17.0796C8.26942 17.296 8.54474 17.4041 8.85939 17.4041C9.49853 17.4041 10 16.9125 10 16.2635C10 15.9489 9.87217 15.6637 9.65585 15.4474L2.74336 8.70206L9.65585 1.95674C9.87217 1.73058 10 1.44543 10 1.13078C10 0.491642 9.49853 0 8.85939 0C8.54474 0 8.26942 0.108161 8.06293 0.324484L0.393314 7.82694C0.127827 8.0826 0.00983284 8.36775 0 8.70206Z"
                fill="#7E87EF"
              />
            </svg>

            <div className="flex w-full flex-col items-center justify-center text-center">
              <span className="font-sfpro text-sm font-medium text-lightGray ">
                {' '}
                <div className="text-dark-grey font-sfpro text-sm font-medium">
                  {' '}
                  {SelectedCircle}
                </div>{' '}
              </span>
              <span className="mt-1 block font-sfpro text-lg text-custompurple">
                {task?.time}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <h1 className="ml-3 font-sfpro text-[26px] font-medium capitalize leading-normal text-white">
              {task?.name}
            </h1>
            <button
              className="flex flex-col items-center "
              onClick={handleMarkDone}
            >
              <div className="" />
              <div className="pr-3">
                {task?.completed || isCompleted ? (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="17"
                      cy="17"
                      r="15.5"
                      fill="#282828"
                      stroke="#7E87EF"
                      stroke-width="2"
                    />
                    <circle cx="17" cy="17" r="10.5" fill="#5ECC7B" />
                  </svg>
                ) : (
                  <svg
                    width="33"
                    height="34"
                    viewBox="0 0 33 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      id="Ellipse 1776"
                      cx="16.5"
                      cy="17"
                      r="15.5"
                      stroke="#3D3D3D"
                      stroke-width="2"
                    />
                  </svg>
                )}
              </div>

              {!(task?.completed || isCompleted) && (
                <div className="pb-2 pr-2">
                  <span className="font-sfpro text-xs font-medium text-customGray">
                    Mark as done
                  </span>
                </div>
              )}
            </button>
          </div>

          <div className="w-auto p-3 ">
            <div className="mb-6 ">
              <TaskCard task={task} />
            </div>

            {/* meal info components */}

            <MealTaskComponent />

            <div className="mb-6 ">
              <h3 className="mb-2 font-sfpro text-[20px] leading-8 text-white">
                Reflect
              </h3>
              <div className="rounded-xl bg-mediumGray p-2">
                <p className="mb-2 p-2 text-[14px] text-custompurple">
                  How did you feel performing this habit today?
                  <br />
                  Any insights you’d like to note?
                </p>
                {task?.feedback === undefined ||
                task?.feedback === null ||
                storedFeedbackValue === undefined ||
                storedFeedbackValue === null ? (
                  <textarea
                    className="w-full rounded-xl  bg-black p-2 font-sfpro text-white focus:outline-none"
                    placeholder="Type your answer here..."
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                ) : (
                  <p className="text-md px-2 text-[14px] text-lightGray">
                    {task?.feedback}
                  </p>
                )}
                {(task?.feedback === undefined ||
                  task?.feedback === null ||
                  storedFeedbackValue === undefined ||
                  storedFeedbackValue === null) && (
                  <button
                    className="w-full rounded-xl bg-custompurple p-1 text-sm leading-8 text-black"
                    onClick={handleFeedbackResponse}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
            <div className="mb-9">
              <h3 className="mb-2 pb-4 font-sfpro text-[20px] leading-8">
                Feeling Check-In
              </h3>
              <div className="flex w-full items-center justify-center space-x-4">
                <button
                  onClick={() => setSelectedFeeling(1)}
                  className={`transition-transform duration-200 ${
                    selectedFeeling === 1 || moodValue === 1
                      ? 'scale-125 transform rounded-md bg-white/10'
                      : ''
                  }`}
                >
                  <img
                    src={'./assets/Feeling-sad.svg'}
                    alt="Sad"
                    className={`w-15 h-15 ${
                      selectedFeeling === 1 || moodValue === 1
                        ? 'text-red-500'
                        : ''
                    }`}
                  />
                </button>
                <button
                  onClick={() => setSelectedFeeling(2)}
                  className={`transition-transform duration-200 ${
                    selectedFeeling === 2 || moodValue === 2
                      ? 'scale-125 transform  rounded-md bg-white/10'
                      : ''
                  }`}
                >
                  <img
                    src={'./assets/Feeling-sad2.svg'}
                    alt="Neutral"
                    className={`w-15 h-15 ${
                      selectedFeeling === 2 || moodValue === 2
                        ? 'text-yellow-500'
                        : ''
                    }`}
                  />
                </button>
                <button
                  onClick={() => setSelectedFeeling(3)}
                  className={`transition-transform duration-200 ${
                    selectedFeeling === 3 || moodValue === 3
                      ? 'scale-125 transform  rounded-md bg-white/10'
                      : ''
                  }`}
                >
                  <img
                    src={'./assets/Feeling-neutral.svg'}
                    alt="Happy"
                    className={`w-15 h-15 ${
                      selectedFeeling === 3 || moodValue === 3
                        ? 'text-yellow-400'
                        : ''
                    }`}
                  />
                </button>
                <button
                  onClick={() => setSelectedFeeling(4)}
                  className={`transition-transform duration-200 ${
                    selectedFeeling === 4 || moodValue === 4
                      ? 'scale-125 transform  rounded-md bg-white/10'
                      : ''
                  }`}
                >
                  <img
                    src={'./assets/Feeling-happy.svg'}
                    alt="Very Happy"
                    className={`w-15 h-15 ${
                      selectedFeeling === 4 || moodValue === 4
                        ? 'text-green-500'
                        : ''
                    }`}
                  />
                </button>
                <button
                  onClick={() => setSelectedFeeling(5)}
                  className={`transition-transform duration-200 ${
                    selectedFeeling === 5 || moodValue === 5
                      ? 'scale-125 transform  rounded-md bg-white/10'
                      : ''
                  }`}
                >
                  <img
                    src={'./assets/Feeling-happy2.svg'}
                    alt="Ecstatic"
                    className={`w-15 h-15 ${
                      selectedFeeling === 5 || moodValue === 5
                        ? 'text-green-400'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>
            {!(task?.completed || isCompleted) && (
              <div className="fixed bottom-4 left-0 w-full px-3">
                <button
                  className="w-full rounded-xl bg-custompurple p-2 text-black"
                  onClick={handleMarkDone}
                >
                  Mark as Done
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {selectedImage && showImageUploadPage && (
        <div className="mx-auto mb-2  flex max-w-sm items-center space-x-6 rounded-lg p-3  shadow-md  ">
          <div className="flex items-center justify-center bg-black">
            <div className=" rounded-lg shadow-lg">
              <div className="flex w-full flex-row items-center justify-between text-center align-middle">
                {/* empty div to put other two divs in place */}
                <div></div>

                <div className=" flex flex-row items-center  text-center">
                  <MealImageicon />

                  <div className="ml-15 pl-2 font-sfpro text-[14px]  font-medium text-lightGray">
                    Upload meal photo
                  </div>
                </div>

                <div
                  onClick={() => {
                    setSelectedImage(null);
                    setshowImageUploadPage(false);
                  }}
                >
                  <MealCrossIcon />{' '}
                </div>
              </div>

              <img
                className="mb-6 mt-[58px] h-[421px] w-[358px]  rounded-lg"
                src={selectedImage}
                alt="Preview"
              />

              <div className="w-full px-3">
                <button
                  onClick={() => setShowProfilePicPopup(true)}
                  className="mb-4 w-full text-center font-sfpro text-lightGray underline"
                >
                  pick a different image
                </button>
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
      )}

      {showProfilePicPopup && (
        <motion.div
          className="fixed bottom-0 left-0 z-50 h-[200px] w-full rounded-t-[30px] bg-gradient-to-r from-gray-500/30 to-gray-900/60 p-5 backdrop-blur-lg"
          initial="hidden"
          animate={showProfilePicPopup ? 'visible' : 'hidden'}
          variants={modalVariants}
        >
          <button
            className="absolute left-[47%] top-0 cursor-pointer"
            onClick={() => setShowProfilePicPopup(false)}
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

      {showMealInfoPage && (
        <MealPage
          setshowMealInfoPage={setshowMealInfoPage}
          finalDate={finalDate}
          mealInfo={storedMealInfoField}
          imageURL={storedMealUrlField}
        />
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
    </div>
  );
};

export default TaskDetail;
