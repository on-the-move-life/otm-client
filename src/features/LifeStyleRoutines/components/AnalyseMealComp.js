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
import { useSearchParams } from 'react-router-dom';

const correctFormatDate = (longDate) => {
  // Create a new Date object
  const date = new Date(longDate);

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
  const year = date.getFullYear();

  // Format the date as "26 Aug 2024"
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};

const AnalyseMealComp = ({
  setParentVisibilityCheck = null,
  task = null,
  date = null,
  SelectedCircle = null,
  setIsTitleVisible = null,
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
  const [mealTaskIds, setmealTaskIds] = useState([
    {
      taskId: `breakfast`,
      taskName: 'Breakfast',
    },
    {
      taskId: `morningSnack`,
      taskName: 'Morning Snack',
    },
    {
      taskId: `lunch`,
      taskName: 'Lunch',
    },

    {
      taskId: `eveningSnack`,
      taskName: 'Evening Snack',
    },

    {
      taskId: `dinner`,
      taskName: 'Dinner',
    },
  ]);
  const [selectedTaskId, setselectedTaskId] = useState(task?.taskId);
  const [selectedTaskName, setselectedTaskName] = useState(task?.name);

  const [TaskCircle, setTaskCircle] = useState(SelectedCircle);

  const [tempMealInfo, setTempMealInfo] = useState(null);
  const [tempMealUrl, setTempMealUrl] = useState(null);
  const [userMealDescription, setUserMealDescription] = useState(
    'no additional context about the uploaded meal provided by the user',
  );
  const formattedDate = getFormattedDate();
  const finalDate = date === null || date === undefined ? formattedDate : date;
  const [searchParams] = useSearchParams();
  const meal = searchParams.get('meal');
  const paramsDate = searchParams.get('date');

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

  useEffect(() => {
    if (storedMealInfoField) {
      setIsVisible(false);
    } else if (!storedMealInfoField) {
      setIsVisible(true);
    }
  }, [storedMealInfoField]);

  console.log('storedMealUrlField', storedMealUrlField);
  console.log('storedMealInfoField', storedMealInfoField);
  // checking if arguments are empty
  useEffect(() => {
    if (meal) {
      const paramsMeal = mealTaskIds.find((item) => item.taskName === meal);

      if (paramsMeal) {
        setselectedTaskId(paramsMeal.taskId);
        setselectedTaskName(meal);
      }

      if (meal === 'Snack') {
        setmealTaskIds([
          {
            taskId: `morningSnack`,
            taskName: 'Morning Snack',
          },

          {
            taskId: `eveningSnack`,
            taskName: 'Evening Snack',
          },
        ]);
      }
    }
  }, [meal]);

  useEffect(() => {
    if (task == null && !meal) {
      setselectedTaskId('');
    } else if (!storedMealInfoField) {
      setIsVisible(true);
    }
  }, [storedMealInfoField]);

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
    console.log(selectedTaskName);
    if (selectedImage && selectedTaskName && file) {
      setLoader(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append(
          'user',
          JSON.parse(localStorage.getItem('user'))['code'],
        );
        formData.append('date', paramsDate ? paramsDate : finalDate);
        console.log('Selected taskId and date is', selectedTaskId, finalDate);
        formData.append('mealType', selectedTaskId);
        formData.append('functionType', meal ? 'mealUpload' : 'mealAnalyse');
        formData.append('optionalDescription', userMealDescription);

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
          if (setIsTitleVisible) {
            setIsTitleVisible(false);
          }
        }
      } catch (err) {
        setLoader(false);
        toast.error(err.response?.data?.message);
        console.error('Error submitting the request:', err);
      }
    }
  };

  const handleSelectChange = (event) => {
    const meal = event.target.value;
    setselectedTaskName(meal);

    const selectedTask = mealTaskIds.find((task) => task.taskName === meal);

    if (selectedTask) {
      setselectedTaskId(selectedTask.taskId);
    }
  };

  const DropdownComp = () => {
    return (
      <div className="flex w-full py-4 ">
        <div className="w-full">
          <label
            className="text-xs tracking-widest text-custompurple"
            htmlFor="taskId"
          >
            Select your meal:
          </label>
          <select
            disabled={
              meal === 'Breakfast' || meal === 'Lunch' || meal === 'Dinner'
            }
            className="block w-full appearance-none gap-[8px] rounded-lg border-[1px] border-[#2A2A2A] border-[solid] bg-transparent px-2 py-2 focus:outline-none"
            id="taskId"
            value={selectedTaskName} // Set initial value for the <select>
            onChange={handleSelectChange}
          >
            <option value="" className="w-[10px] bg-mediumGray text-white ">
              Select one option
            </option>
            {mealTaskIds.map((task, index) => (
              <option
                key={index}
                value={task.taskName}
                className="bg-mediumGray text-white"
              >
                {task.taskName}
              </option>
            ))}
          </select>
        </div>

        {(meal !== 'Breakfast' || meal !== 'Lunch' || meal !== 'Dinner') && (
          <div className="text-gray-700 pointer-events-none relative right-6 top-8 w-0">
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        )}
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
            <div className="mt-2 flex w-full items-center justify-between text-center ">
              {/* empty div to put other two divs in place */}
              <div></div>

              <div className="mx-auto flex flex-row items-center text-center">
                <MealImageicon />

                <div className="ml-3 font-sfpro text-[14px]  font-medium text-lightGray">
                  Upload meal photo
                </div>
              </div>

              <div className="mr-4 flex-shrink-0" onClick={handleClose}>
                <MealCrossIcon />{' '}
              </div>
            </div>
          )}

          <div className="flex w-full items-center justify-center space-x-6 rounded-lg shadow-md ">
            <div className="flex items-center justify-center ">
              <div className="rounded-lg shadow-lg ">
                {!selectedImage ? (
                  <div
                    style={{
                      backgroundImage: `url('/assets/meal-analysis-image-placeholder.jpg')`,
                      backgroundBlendMode: 'color-dodge',
                    }}
                    className=" border-gray-400 mb-6 mt-[58px] flex h-[421px] w-[358px] items-center justify-center rounded-lg bg-mediumGray bg-cover "
                    onClick={() => setshowMealPicPopUp(true)}
                  >
                    <div className="rounded-lg p-4 ">
                      <p className="text-center">
                        Click here to upload an image
                      </p>
                    </div>{' '}
                  </div>
                ) : (
                  <div
                    className="border-gray-400  mb-6 mt-[58px] flex   h-fit w-[358px] items-center justify-center rounded-lg bg-mediumGray bg-cover "
                    onClick={() => setshowMealPicPopUp(true)}
                  >
                    {' '}
                    <img
                      className=" m-auto h-auto max-h-[421px] w-full rounded-lg bg-cover  "
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

                  <div className="flex items-center justify-center rounded-lg ">
                    <DropdownComp />
                  </div>
                  <div className="mb-6 mt-2 ">
                    <div className="rounded-xl ">
                      <p className="mb-2 p-1 text-[14px] text-custompurple">
                        Describe your meal here (optional)
                      </p>

                      <textarea
                        className="h-auto w-full border-b-[1px] border-custompurple bg-black p-2 font-sfpro focus:outline-none "
                        placeholder="Type here..."
                        onChange={(e) => setUserMealDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="fixed bottom-4 left-0 w-full px-3">
                    <button
                      className={`flex w-full flex-row items-center justify-center rounded-xl p-3 text-black ${
                        selectedImage && selectedTaskName
                          ? 'bg-custompurple'
                          : 'bg-mediumGray'
                      }`}
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
          finalDate={paramsDate ? correctFormatDate(paramsDate) : formattedDate}
          mealInfo={storedMealInfoField ? storedMealInfoField : tempMealInfo}
          imageURL={storedMealUrlField ? storedMealUrlField : tempMealUrl}
          setParentVisibilityCheck={
            setParentVisibilityCheck ? setParentVisibilityCheck : setIsVisible
          }
        />
      )}

      {showMealPicPopUp && (
        <motion.div
          className="from-gray-500/30 to-gray-900/60 fixed bottom-0 left-0 z-50 h-[200px] w-full rounded-t-[30px] bg-gradient-to-r p-5 backdrop-blur-lg"
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
                <button className="border-gray-500 cursor-pointer rounded-full border-[0.5px] p-3">
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
                <button className="border-gray-500 cursor-pointer rounded-full border-[0.5px] p-3">
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
        <div className="mx-auto mb-2 flex max-w-sm items-center space-x-6 rounded-lg bg-mediumGray p-3 shadow-md ">
          <div className="bg-gray-800 fixed inset-0 z-50 flex items-center justify-center bg-opacity-75">
            <div className="rounded-lg p-6 shadow-lg ">
              <Loader />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalyseMealComp;
