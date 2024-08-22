import styled, { keyframes } from 'styled-components';
import { RiRunFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { FaArrowRight, FaBedPulse } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { TbSwimming } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from '../../components';

const SlideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100px; /* Adjust as needed */
    opacity: 1;
  }
`;

const InputContainer = styled.div`
  overflow: hidden;
  animation: ${SlideDown} 0.5s ease-out forwards;
  max-height: 100px; /* Adjust as needed */
`;

const AdditionalActivity = ({ setShowActivity }) => {
  const items = Array.from({ length: 42 }, (_, i) => {
    if (i === 0 || i === 1 || i === 2 || i === 41 || i === 40 || i === 39) {
      return '';
    } else {
      const number = i - 2;
      return number * 5;
    }
  });

  const containerRef = useRef(null);
  const itemHeightRef = useRef(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activityList, setActivityList] = useState([]);
  const [activityType, setActivityType] = useState([]);
  const [selectedActivityType, setSelectedActivityType] =
    useState('Please enter type');
  const [selectedValue, setSelectedValue] = useState('Please enter');
  const [activityDescription, setActivityDescription] = useState('');
  const [showTimeInput, setShowTimeInput] = useState(true);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [anotherActivity, setAnotherActivity] = useState(false);
  const [activityListLoader, setActivityListLoader] = useState(false);
  const [anotherActivityLoader, setAnotherActivityLoader] = useState(false);
  const memberCode = JSON.parse(localStorage.getItem('user'))['code'];

  useEffect(() => {
    setAnotherActivity(false);
    setShowTimeInput(false);
    if (containerRef.current) {
      const itemHeight = containerRef.current.clientHeight / 7;
      itemHeightRef.current = itemHeight; // Store the item height in ref
      containerRef.current.scrollTop = itemHeight * 3;
    }
  }, []);
  const handleScroll = (e) => {
    const container = e.target;
    const itemHeight = itemHeightRef.current;
    const maxScrollIndex = 36; // Corresponds to i === 40

    const currentIndex = Math.round(container.scrollTop / itemHeight);

    if (currentIndex < 0) {
      container.scrollTop = 0;
      setScrollPosition(0);
      setSelectedValue(items[0]);
    } else if (currentIndex > maxScrollIndex) {
      container.scrollTop = itemHeight * maxScrollIndex;
      setScrollPosition(maxScrollIndex);
      setSelectedValue(items[maxScrollIndex + 3]);
    } else {
      setScrollPosition(currentIndex);
      const selectedIndex = currentIndex + 3;
      setSelectedValue(items[selectedIndex]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedActivityType && selectedValue) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activity-tracker`,
          {
            memberCode: memberCode,
            activity: selectedActivityType,
            date: new Date(),
            activityDuration: selectedValue.toString(),
            description: activityDescription,
          },
        );
        toast.success('Activity Submitted sucessfully');
        console.log('Submission successful');
      } catch (error) {
        toast.error('Something went wrong');
        console.error('An error occurred:', error);
      } finally {
        setShowActivity(false);
      }
    } else {
      console.warn('Please enter a step count before submitting');
    }
  };

  useEffect(() => {
    setActivityListLoader(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activity-tracker/list`,
        );
        if (res.data) {
          console.log('ress', res.data);
          setActivityType(res.data.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setActivityListLoader(false);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    setAnotherActivityLoader(true);
    async function getUserData() {
      try {
        const today = new Date();
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activity-tracker?memberCode=${memberCode}&date=${today}`,
        );
        if (res.data && res.data.data.activityList.length > 0) {
          setActivityList(res.data.data.activityList);
          setAnotherActivity(true);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setAnotherActivityLoader(false);
      }
    }
    getUserData();
  }, []);

  const handleActivityType = (e) => {
    setSelectedActivityType(e.target.value);
    setShowTypeInput(false);
  };

  return (
    <div className="mb-[78px] h-[calc(100vh-78px)] w-full ">
      <div className="fixed top-0 ">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      {}
      <img
        src="assets/movement-frame.svg"
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      {activityListLoader || anotherActivityLoader ? (
        <Loader />
      ) : (
        <div className=" h-full w-full overflow-y-scroll bg-[rgba(0,0,0,0.71)] px-4 pt-[28px]">
          <div className="mx-[9px] mb-[66px] flex justify-between">
            <h3 className="text-xl font-sfpro text-offwhite">
              Log Activity Details
            </h3>
            <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-mediumGray ">
              <RxCross1 onClick={() => setShowActivity(false)} className="" />
            </div>
          </div>
          {anotherActivity === true && (
            <div>
              {activityList.length > 0 &&
                activityList.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white-opacity-08 mt-3 flex flex-col gap-4 rounded-xl px-[21px] py-[11px]"
                  >
                    <div>
                      <h4 className="font-sfpro text-[14px] text-offwhite ">
                        Type
                      </h4>
                      <p className="font-sfpro text-[14px] text-white-opacity-50">
                        {item.activity ? item.activity : '-'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-sfpro text-[14px] text-offwhite ">
                        Time
                      </h4>
                      <p className="font-sfpro text-[14px] text-white-opacity-50">
                        {item.activityDuration
                          ? `${item.activityDuration} mins`
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-sfpro text-[14px] text-offwhite ">
                        Description
                      </h4>
                      <p className="pb-4 font-sfpro text-[14px] text-white-opacity-50">
                        {item.description ? item.description : '-'}
                      </p>
                    </div>
                  </div>
                ))}

              <div
                onClick={() => setAnotherActivity(false)}
                className="to-blue-500 relative mt-4 flex items-center justify-between rounded-full bg-gradient-to-r from-[#9299de] to-[#404fe3] px-4 py-2"
              >
                <div className="flex gap-2">
                  <TbSwimming className="text-xl" />
                  Log an additional activity
                </div>
                <FaArrowRight />
              </div>
            </div>
          )}
          {anotherActivity === false && (
            <form
              className="relative z-20 flex h-[calc(100%-102px)] w-full flex-col justify-between "
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col ">
                <div className="font-sfpro text-[20px] text-offwhite">Type</div>
                <div className="relative mt-1 max-h-[224px] w-full  rounded-lg py-3 pt-0">
                  <div className="absolute z-20 right-6 top-4 ">
                    {showTypeInput === true ? (
                      <img
                        src="./assets/up-arrow-white.svg"
                        onClick={() => setShowTypeInput(false)}
                      />
                    ) : (
                      <img src="./assets/down-arrow-white.svg" />
                    )}
                  </div>
                  {showTypeInput === true ? (
                    <div className=" bg-white-opacity-08 max-h-[224px] w-full overflow-y-scroll  rounded-xl px-[6px] pl-4">
                      {activityType.length > 0 &&
                        activityType.map((item, index) => {
                          return (
                            <div
                              onClick={(e) => handleActivityType(e)}
                              className="mr-9  flex h-[45px] items-center border-b border-b-darkGray text-[#929292] underline-offset-1"
                              key={index}
                            >
                              {item}
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowTypeInput(true)}
                      className="bg-white-opacity-08 flex h-[48px] w-full items-center rounded-xl px-6 text-white-opacity-50"
                    >
                      {selectedActivityType}
                    </div>
                  )}
                </div>
                <div className="mt-[30px] font-sfpro text-[20px] text-offwhite">
                  Time
                </div>
                <div className="relative w-full py-3 pt-0 mt-1 rounded-lg">
                  <div className="absolute z-20 right-6 top-4 ">
                    {showTimeInput === true ? (
                      <img
                        src="./assets/up-arrow-white.svg"
                        onClick={() => setShowTimeInput(false)}
                      />
                    ) : (
                      <img src="./assets/down-arrow-white.svg" />
                    )}
                  </div>
                  {showTimeInput === true ? (
                    <div
                      className="picker-container bg-white-opacity-08 w-full rounded-xl px-[6px]"
                      ref={containerRef}
                      onScroll={handleScroll}
                    >
                      {items.map((item, index) => {
                        const position =
                          (index % items.length) - scrollPosition - 3;

                        // console.log(index, items.length, scrollPosition, position);

                        let className = 'picker-item';
                        if (position === 0) {
                          className += ' selected pl-[39px] ';
                        } else if (position === 1 || position === -1) {
                          className += ' adjacent';
                        } else if (position === 2 || position === -2) {
                          className += ' far';
                        } else if (position === 3 || position === -3) {
                          className += ' veryfar';
                        }

                        return (
                          <option
                            onClick={
                              position === 0
                                ? () => setShowTimeInput(false)
                                : undefined
                            }
                            key={index}
                            className={className}
                          >
                            {item}
                            {'    '}
                            {position === 0 && (
                              <div className="pl-10">mins</div>
                            )}
                          </option>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      onClick={() => setShowTimeInput(true)}
                      className="bg-white-opacity-08 flex h-[48px] w-full items-center rounded-xl px-6 text-white-opacity-50 "
                    >
                      {selectedValue} mins
                    </div>
                  )}

                  {/* Add more options as needed */}
                </div>

                <div className="mt-[31px] font-sfpro text-[20px] text-offwhite">
                  Description
                </div>

                <div className="overflow-hidden rounded-xl">
                  <textarea
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      minHeight: '87px',
                      borderRadius: '8px',
                      padding: '12px',
                      boxSizing: 'border-box',
                      lineHeight: '1.5',
                      width: '100%', // Ensures the textarea takes full width of its container
                      resize: 'vertical', // Allows vertical resizing
                      overflow: 'scroll', // Adds scrollbar when content overflows
                      border: 'none', // Removes the border
                      outline: 'none', // Removes the default focus outline
                    }}
                    className="mt-1 text-white-opacity-50"
                    placeholder="Anything you would like to note..."
                    value={activityDescription}
                    onChange={(e) => setActivityDescription(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={
                  selectedActivityType === 'Please enter type' ||
                  selectedValue === 'Please enter'
                }
                style={{
                  backgroundColor:
                    selectedActivityType !== 'Please enter type' &&
                    selectedValue !== 'Please enter'
                      ? '#F8F8F8'
                      : 'rgba(221,221,221,0.08)',
                  color:
                    selectedActivityType !== 'Please enter type' &&
                    selectedValue !== 'Please enter'
                      ? 'rgba(0,0,0)'
                      : 'rgba(248,248,248,0.8)',
                }}
                className="relative  mt-10  flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg leading-8  text-black backdrop-blur-md"
              >
                Submit
              </button>
              {/* <button
            type="submit"
            disabled={!stepCount}
            style={{
              backgroundColor: stepCount ? '#5ECC7B' : 'rgba(61, 61, 61, 0.3)',
              color: stepCount ? 'black' : '#b1b1b1',
            }}
            className="h-[30px] rounded px-2 font-medium"
          >
            Done
          </button> */}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AdditionalActivity;
