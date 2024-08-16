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

const AdditionalActivity = () => {
  const [showInput, setShowInput] = useState(false);
  const [stepCount, setStepCount] = useState('');
  const [showStepCount, setShowStepCount] = useState(false);
  const [loader, setLoader] = useState(true);

  const [selectedTime, setSelectedTime] = useState(25);

  const times = Array.from({ length: 60 }, (_, i) => i * 5); // Generate times in 5 min increments

  const handleTimeChange = (e) => {
    setSelectedTime(parseInt(e.target.value, 10));
  };

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
            },
          },
        );
        if (res.data) {
          console.log('ress', res.data);
          setStepCount(res.data.data.stepCount);
        }
        if (res.data.success === true) {
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
    <div className="to-blue-500 relative h-[40px] rounded-full bg-gradient-to-r from-[#eb7967] to-[#bd1226] px-4 py-2">
      <div className="time-picker">
        <select
          className="time-picker-select"
          value={selectedTime}
          onChange={handleTimeChange}
          size={60} // This will show 5 options at a time, like a wheel
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time} mins
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdditionalActivity;
