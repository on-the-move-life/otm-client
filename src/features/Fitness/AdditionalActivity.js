import styled, { keyframes } from 'styled-components';
import { RiRunFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { FaArrowRight, FaBedPulse } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { RxCross1 } from 'react-icons/rx';

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
  const items = Array.from({ length: 66 }, (_, i) => {
    if (i === 0 || i === 1 || i === 2 || i === 65 || i === 64 || i === 63) {
      return '';
    } else {
      return i - 2;
    }
  });

  const containerRef = useRef(null);
  const itemHeightRef = useRef(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [referreeName, setRefereeName] = useState('');
  const [activityList, setActivityList] = useState([1]);
  const [activityType, setActivityType] = useState([]);
  const [selectedActivityType, setSelectedActivityType] =
    useState('Please enter type');
  const [selectedValue, setSelectedValue] = useState('Please enter');
  const [activityDescription, setActivityDescription] = useState('');
  const [showTimeInput, setShowTimeInput] = useState(true);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [anotherActivity, setAnotherActivity] = useState(true);
  const [activityListLoader, setActivityListLoader] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [referrerCode, setReferrerCode] = useState(null);

  console.log('bbbbbbbbbbffffffff', activityDescription);

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
    const totalItems = items.length;

    const currentIndex = Math.round(container.scrollTop / itemHeight);
    console.log(currentIndex, itemHeight, totalItems, container.scrollTop);
    // Stop scrolling at the first or last item
    if (currentIndex < 0) {
      container.scrollTop = 0;
      setScrollPosition(0);
      setSelectedValue(items[0]);
    } else if (currentIndex >= totalItems - 7) {
      container.scrollTop = itemHeight * (totalItems - 7);
      setScrollPosition(totalItems - 7);
      setSelectedValue(items[totalItems - 7]);
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
            memberCode: JSON.parse(localStorage.getItem('user'))['code'],
            activity: selectedActivityType,
            date: '2024-08-16T00:00:00Z',
            activityDuration: selectedValue.toString(),
            description: activityDescription,
          },
        );
        console.log('Submission successful');
      } catch (error) {
        console.error('An error occurred:', error);
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
    // setLoader(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/activity-tracker?memberCode=PRAN&date="2024-08-20T00:00:00Z"`,
        );
        if (res.data && res.data.activityList.length > 0) {
          console.log('ress', res.data);

          setActivityList(res.data.data.activityList);
        }
        if (res.data && res.data.activityList.length === 0) {
          console.log('ress', res.data);

          setAnotherActivity(true);
        }
        if (res.data.success === true) {
          // setShowStepCount(false);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        // setLoader(false);
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
      {}
      <img
        src="assets/movement-frame.svg"
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className=" h-full w-full overflow-y-scroll bg-[rgba(0,0,0,0.71)] px-4 pt-[28px]">
        <div className="mx-[9px] mb-[66px] flex justify-between">
          <h3 className="text-xl font-sfpro text-offwhite">
            Log Activity Details
          </h3>
          <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-mediumGray ">
            <RxCross1 onClick={() => setShowActivity(false)} className="" />
          </div>
        </div>
        {anotherActivity === false && (
          <div>
            {activityList.length > 0 && (
              <div className="mt-3 flex flex-col gap-4 rounded-xl bg-white-opacity-08 px-[21px] py-[11px]">
                <div>
                  <h4 className="font-sfpro text-[14px] text-offwhite ">
                    Type
                  </h4>
                  <p className="font-sfpro text-[14px] text-white-opacity-50">
                    {activityList[0].activity ? activityList[0].activity : '-'}
                  </p>
                </div>
                <div>
                  <h4 className="font-sfpro text-[14px] text-offwhite ">
                    Time
                  </h4>
                  <p className="font-sfpro text-[14px] text-white-opacity-50">
                    {activityList[0].activityDuration
                      ? `${activityList[0].activityDuration} mins`
                      : '-'}
                  </p>
                </div>
                <div>
                  <h4 className="font-sfpro text-[14px] text-offwhite ">
                    Description
                  </h4>
                  <p className="pb-4 font-sfpro text-[14px] text-white-opacity-50">
                    {activityList[0].description
                      ? activityList[0].description
                      : '-'}
                  </p>
                </div>
              </div>
            )}
            <div
              onClick={() => setAnotherActivity(true)}
              className="to-blue-500 relative mt-4 rounded-full bg-gradient-to-r from-[#9299de] to-[#404fe3] px-4 py-2"
            >
              Add Another Activity
            </div>
          </div>
        )}
        {anotherActivity === true && (
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
                  <div className=" max-h-[224px] w-full overflow-y-scroll rounded-xl  bg-white-opacity-08 px-[6px] pl-4">
                    {activityType.length > 0 &&
                      activityType.map((item, index) => {
                        return (
                          <option
                            onClick={(e) => handleActivityType(e)}
                            className="mr-9  flex h-[45px] items-center border-b border-b-darkGray underline-offset-1"
                            key={index}
                          >
                            {item}
                          </option>
                        );
                      })}
                  </div>
                ) : (
                  <div
                    onClick={() => setShowTypeInput(true)}
                    className="flex h-[48px] w-full items-center rounded-xl bg-white-opacity-08 px-6 text-white-opacity-50"
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
                    className="picker-container w-full rounded-xl bg-white-opacity-08 px-[6px]"
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
                          {position === 0 && <div className="pl-10">mins</div>}
                        </option>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    onClick={() => setShowTimeInput(true)}
                    className="flex h-[48px] w-full items-center rounded-xl bg-white-opacity-08 px-6 text-white-opacity-50 "
                  >
                    {selectedValue} mins
                  </div>
                )}

                {/* Add more options as needed */}
              </div>

              <div className="mt-[31px] font-sfpro text-[20px] text-offwhite">
                Description
              </div>

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
                placeholder="Tell your answer here..."
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={
                selectedActivityType === 'Please enter type' ||
                selectedValue === 'Please enter' ||
                activityDescription === ''
              }
              style={{
                backgroundColor:
                  selectedActivityType !== 'Please enter type' &&
                  selectedValue !== 'Please enter' &&
                  activityDescription !== ''
                    ? '#F8F8F8'
                    : 'rgba(0,0,0, 0.8)',
                color:
                  selectedActivityType !== 'Please enter type' &&
                  selectedValue !== 'Please enter' &&
                  activityDescription !== ''
                    ? 'rgba(0,0,0)'
                    : 'black',
              }}
              className="relative z-30 mt-10  flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg leading-8  text-black backdrop-blur-md"
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
    </div>
  );
};

export default AdditionalActivity;
