import styled, { keyframes } from 'styled-components';
import { RiRunFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

const StepTracker = () => {
  const [showInput, setShowInput] = useState(false);
  const [stepCount, setStepCount] = useState('');
  const [showStepCount, setShowStepCount] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setShowStepCount(true);
    setLoader(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle/step-count`,
          {
            params: {
              memberCode: JSON.parse(localStorage.getItem('user'))['code'],
              date: new Date(),
            },
          },
        );
        if (res.data) {
          setStepCount(res.data.data[0].stepCount);
        }
        if (res.data.success === true && res.data.data[0].stepCount > 0) {
          setShowStepCount(false);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoader(false);
      }
    }
    getUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stepCount) {
      const today = new Date();
      setShowStepCount(false);
      setShowInput(false);
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle/step-count`,
          {
            stepCount: Number(stepCount),
            memberCode: JSON.parse(localStorage.getItem('user'))['code'],
            date: today,
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

  const handleShowInput = () => {
    setShowInput(true);
  };

  return (
    <div>
      <div
        className={`relative rounded-xl bg-black-opacity-45 ${
          showInput ? ' rounded-t-2xl' : ''
        }`}
      >
        <InputContainer>
          <div className="to-blue-500 relative h-[40px] rounded-full px-4 py-2">
            {loader === false && (
              <div className="flex items-center justify-between">
                <div className="flex grow items-center gap-2">
                  <RiRunFill className="text-xl" />
                  <div className=" w-full">
                    {showStepCount ? (
                      <div
                        className="text-center text-sm text-offwhite"
                        onClick={handleShowInput}
                      >
                        Log your daily step count
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div
                          className="flex w-fit items-center text-center text-sm text-offwhite"
                          onClick={handleShowInput}
                        >
                          Today's Step Count
                        </div>

                        {showInput ? (
                          <div className="flex  items-center justify-center rounded-lg bg-floYellow ">
                            <img
                              src="/assets/fitness-add.svg"
                              className="h-[30px] w-[30px]"
                            />
                          </div>
                        ) : (
                          <span className="flex items-center font-bold">
                            {stepCount}
                          </span>
                        )}
                      </div>
                    )}{' '}
                  </div>
                </div>

                {showStepCount &&
                  (showInput ? (
                    <AiOutlineClose
                      className="font-semibold"
                      onClick={() => setShowInput(false)}
                    />
                  ) : (
                    <FaArrowRight />
                  ))}
              </div>
            )}
          </div>
        </InputContainer>
      </div>
      {showInput && (
        <InputContainer>
          <form
            className="flex w-full items-end rounded-b-lg bg-black-opacity-45 px-2 pb-2"
            onSubmit={handleSubmit}
          >
            <input
              style={{
                borderColor: '#5ECC7B',
                backgroundColor: 'rgba(0,0,0,0.45)',
                height: '48px',
              }}
              className="textbox mr-6 rounded-lg bg-mediumGray px-1 pt-0"
              type="number"
              placeholder="Step Count (in number)"
              required
              value={stepCount}
              onChange={(e) => setStepCount(e.target.value)}
            />
            <button
              type="submit"
              disabled={!stepCount}
              style={{
                backgroundColor: stepCount
                  ? '#5ECC7B'
                  : 'rgba(61, 61, 61, 0.3)',
                color: stepCount ? 'black' : '#b1b1b1',
              }}
              className="h-[30px] rounded px-2 font-medium"
            >
              Done
            </button>
          </form>
        </InputContainer>
      )}
    </div>
  );
};

export default StepTracker;
