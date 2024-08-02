import styled, { keyframes } from 'styled-components';
import { RiRunFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

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
  const stepTrackerData = JSON.parse(localStorage.getItem('stepTracker'));

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    setShowStepCount(false);
    if (stepTrackerData) {
      const lastStepTrackerUpdate = stepTrackerData.date.split('T')[0];
      if (lastStepTrackerUpdate !== today) {
        localStorage.removeItem('stepTracker');
        setShowStepCount(true);
      }
    }

    if (!stepTrackerData) {
      setShowStepCount(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stepCount) {
      const today = new Date();

      try {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/v1/member/step-count`, {
            stepCount: stepCount,
            memberCode: JSON.parse(localStorage.getItem('user'))['code'],
            date: today,
          })
          .then((res) => {
            console.log('its done', res);
            localStorage.setItem('stepTracker', JSON.stringify(res.data));
            setShowInput(false);
            setShowStepCount(false);
          })
          .catch((err) => {
            console.log('some error occured');
          });
      } catch (error) {
        console.error('Error submitting step count:', error);
      }
    } else {
      console.warn('Please enter a step count before submitting');
    }
  };

  const handleShowInput = () => {
    if (showStepCount === true) {
      setShowInput(true);
    }
  };

  return (
    <div>
      <div
        className={`${
          showInput && 'rounded-t-2xl bg-mediumGray'
        }   relative   `}
      >
        <div
          className={`    to-blue-500 relative  rounded-full bg-gradient-to-r from-[#f45c43] to-[#eb3349] px-4 py-2`}
        >
          <div className="flex items-center justify-between ">
            <div
              className="flex items-center gap-2 grow"
              onClick={() => handleShowInput()}
            >
              <RiRunFill className="text-xl" />
              <div className="w-full error__title">
                {showStepCount ? (
                  'Log your daily step count'
                ) : (
                  <div className="flex justify-between">
                    Today's Step Count{' '}
                    <span className="mr-2 font-bold">
                      {stepTrackerData?.stepCount}
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
      {showStepCount && showInput && (
        <InputContainer>
          <form
            className="flex items-end w-full px-2 pb-2 rounded-b-lg top-3 bg-mediumGray "
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
                backgroundColor:
                  stepCount && stepCount !== ''
                    ? '#5ECC7B'
                    : 'rgba(61, 61, 61, 0.3)',

                color: stepCount && stepCount !== '' ? 'black' : '#b1b1b1', // Green when enabled, gray when disabled
              }}
              className="h-[30px] rounded   px-2 font-medium text-black"
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
