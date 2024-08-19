import styled, { keyframes } from 'styled-components';
import { RiRunFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';

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

const AdditionalActivity = ({ showActivity }) => {
  const items = Array.from({ length: 100 }, (_, i) => i + 1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const [referreeName, setRefereeName] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [referrerCode, setReferrerCode] = useState(null);
  const [referrerName, setReferrerName] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      const itemHeight = containerRef.current.clientHeight / 5; // 5 items visible at a time
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight / 2 - itemHeight * 2;
    }
  }, []);

  const handleScroll = (e) => {
    const container = e.target;
    const itemHeight = container.clientHeight / 5;
    const totalItems = items.length;

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      container.scrollTop =
        container.scrollHeight / 2 - container.clientHeight + itemHeight * 2;
    }

    if (container.scrollTop <= 0) {
      container.scrollTop = container.scrollHeight / 2 - itemHeight * 2;
    }

    const currentIndex =
      (Math.round(container.scrollTop / itemHeight) % totalItems) + 2;
    setScrollPosition(currentIndex);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //  if (referreeName && referrerCode) {
    //    try {
    //      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/referral`, {
    //        referralCode: referrerCode,
    //        referee: referreeName,
    //      });
    //      console.log('Submission successful');
    //    } catch (error) {
    //      console.error('An error occurred:', error);
    //    }
    //  } else {
    //    console.warn('Please enter a step count before submitting');
    //  }
  };

  //   useEffect(() => {
  //     setShowStepCount(true);
  //     setLoader(true);
  //     async function getUserData() {
  //       try {
  //         const res = await axios.get(
  //           `${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle/step-count`,
  //           {
  //             params: {
  //               memberCode: JSON.parse(localStorage.getItem('user'))['code'],
  //             },
  //           },
  //         );
  //         if (res.data) {
  //           console.log('ress', res.data);
  //           setStepCount(res.data.data.stepCount);
  //         }
  //         if (res.data.success === true) {
  //           setShowStepCount(false);
  //         }
  //       } catch (err) {
  //         console.error(err.message);
  //       } finally {
  //         setLoader(false);
  //       }
  //     }
  //     getUserData();
  //   }, []);

  return (
    <div className="w-full h-full bg-movement-frame ">
      {}

      <div className="h-full w-full bg-[rgba(0,0,0,0.71)]">
        <div>
          <h3>Log Activity Details</h3>
        </div>

        <div className="w-full">
          <form
            className="relative z-20 flex flex-col w-full "
            onSubmit={handleSubmit}
          >
            <div>Type</div>
            <div className="w-full py-3 pt-0 mt-3 rounded-lg">
              <input
                style={{ borderColor: 'rgb(155, 161, 233)' }}
                className="textbox "
                type="text"
                placeholder="Tell us your name"
                required
                value={referreeName}
                onChange={(e) => setRefereeName(e.target.value)}
              />
            </div>
            <div>Time</div>
            <div className="relative w-full py-3 pt-0 mt-3 rounded-lg">
              <div className="absolute z-20 right-2 top-2 bg-deep-orange-700">
                jddf
              </div>
              <div
                className="w-full picker-container"
                ref={containerRef}
                onScroll={handleScroll}
              >
                {items.concat(items, items).map((item, index) => {
                  const position = (index % items.length) - scrollPosition;

                  // console.log(index, items.length, scrollPosition, position);

                  let className = 'picker-item';
                  if (position === 0) {
                    className += ' selected pl-[56px]';
                  } else if (position === 1 || position === -1) {
                    className += ' adjacent';
                  } else if (position === 2 || position === -2) {
                    className += ' far';
                  }

                  return (
                    <option key={index} className={className}>
                      {item}
                      {'    '}
                      {position === 0 && <div className="pl-10">mins</div>}
                    </option>
                  );
                })}
              </div>
              {/* Add more options as needed */}
            </div>

            <button
              type="submit"
              disabled={referreeName === ''}
              style={{
                backgroundColor:
                  referreeName !== ''
                    ? ' rgb(126,135,239)'
                    : 'rgba(0, 0, 0, 0.4)',
                color: referreeName === '' ? 'rgba(61, 61, 61)' : 'black',
              }}
              onClick={() =>
                window.open(
                  'https://calendly.com/rishisolanki1995/30mincallwithrishi',
                  '_blank',
                )
              }
              className="relative z-30 mt-[30px] flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg  leading-8 text-black"
            >
              Book an intro call
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
        </div>
      </div>
    </div>
  );
};

export default AdditionalActivity;
