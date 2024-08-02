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
  const [stepTrackerData, setStepTrackerData] = useState(
    JSON.parse(localStorage.getItem('stepTracker')),
  );
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userData?.code !== stepTrackerData?.memberCode) {
      localStorage.removeItem('stepTracker');
      setStepCount('');
      setStepTrackerData(null);
    }
    const today = new Date().toISOString().split('T')[0];
    setShowStepCount(false);
    if (stepTrackerData) {
      setStepCount(stepTrackerData.stepCount);
      const lastStepTrackerUpdate = stepTrackerData.date.split('T')[0];
      if (lastStepTrackerUpdate !== today) {
        localStorage.removeItem('stepTracker');
        setShowStepCount(true);
      }
    }

    if (!stepTrackerData) {
      setShowStepCount(true);
    }
  }, [stepTrackerData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stepCount) {
      const today = new Date();
      setShowStepCount(false);
      setShowInput(false);
      try {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/v1/member/step-count`, {
            stepCount: stepCount,
            memberCode: JSON.parse(localStorage.getItem('user'))['code'],
            date: today,
          })
          .then((res) => {
            console.log('Submission successful', res);
            localStorage.setItem('stepTracker', JSON.stringify(res.data));
          })
          .catch((err) => {
            console.error('An error occurred', err);
          });
      } catch (error) {
        console.error('Error submitting step count:', error);
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
        className={`relative ${showInput ? 'rounded-t-2xl bg-mediumGray' : ''}`}
      >
        <div className="to-blue-500 relative rounded-full bg-gradient-to-r from-[#f45c43] to-[#eb3349] px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 grow">
              <RiRunFill className="text-xl" />
              <div className="w-full error__title">
                {showStepCount ? (
                  <div onClick={handleShowInput}>Log your daily step count</div>
                ) : (
                  <div className="flex justify-between">
                    <div className="w-full" onClick={handleShowInput}>
                      {' '}
                      Today's Step Count
                    </div>
                    <span className="flex items-center font-bold ">
                      {showInput ? (
                        <AiOutlineClose
                          className="font-semibold"
                          onClick={() => setShowInput(false)}
                        />
                      ) : (
                        stepCount
                      )}
                    </span>
                  </div>
                )}
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
        </div>
      </div>
      {showInput && (
        <InputContainer>
          <form
            className="flex items-end w-full px-2 pb-2 rounded-b-lg bg-mediumGray"
            onSubmit={handleSubmit}
          >
            <input
              style={{ borderColor: '#5ECC7B' }}
              className="pt-0 mr-6 textbox"
              type="number"
              placeholder="STEP COUNT (In Number)"
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
