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

const AdditionalActivity = () => {
  const items = Array.from({ length: 100 }, (_, i) => i + 1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight / 2;
    }
  }, []);

  const handleScroll = (e) => {
    const container = e.target;
    const itemHeight = container.clientHeight / 5; // Adjust to match your total visible items
    const totalItems = items.length;

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      container.scrollTop = container.scrollHeight / 2 - container.clientHeight;
    }

    if (container.scrollTop <= 0) {
      container.scrollTop = container.scrollHeight / 2;
    }

    const currentIndex =
      Math.round(container.scrollTop / itemHeight) % totalItems;
    setScrollPosition(currentIndex);
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
    <div className="to-blue-500 relative h-[40px] rounded-full bg-gradient-to-r from-[#eb7967] to-[#bd1226] px-4 py-2">
      <div
        className="picker-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {items.concat(items, items).map((item, index) => {
          const position = (index % items.length) - scrollPosition;

          let className = 'picker-item ';
          if (position === 0) {
            className += ' bg-red selected';
          } else if (position === 1 || position === -1) {
            className += ' adjacent';
          } else if (position === 2 || position === -2) {
            className += ' far';
          }

          return (
            <div key={index} className={className}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdditionalActivity;
