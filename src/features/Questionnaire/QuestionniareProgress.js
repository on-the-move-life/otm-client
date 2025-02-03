import React, { useEffect, useRef, useState } from 'react';

const QuestionnaireProgress = ({
  currValue,
  totalValue,
  questionnaireData,
}) => {
  const widthRef = useRef(null);
  const [totalLength, setTotalLength] = useState(0);
  const [progressLength, setProgressLength] = useState(0);

  // Update the totalLength only when the component mounts or the width changes
  useEffect(() => {
    const updateTotalLength = () => {
      if (widthRef.current) {
        setTotalLength(widthRef.current.clientWidth);
      }
    };

    updateTotalLength(); // Initialize on mount

    // Update length on window resize
    window.addEventListener('resize', updateTotalLength);
    return () => window.removeEventListener('resize', updateTotalLength);
  }, []);

  // Calculate progressLength only when currValue, totalValue, or totalLength changes
  useEffect(() => {
    if (totalLength > 0) {
      setProgressLength((currValue / totalValue) * totalLength);
    }
  }, [currValue, totalValue, totalLength]);

  return (
    <div className="mb-3 flex flex-col items-center px-3">
      <div
        className={`mx-2 mb-[13px] mt-[30px] w-fit rounded bg-black-opacity-45 px-2 py-[2px] text-[14px] font-medium ${questionnaireData.text}`}
      >
        Step {currValue} of {totalValue}
      </div>
      <div className="flex w-full items-center gap-5">
        <div className="flex  w-[140px] grow items-center gap-1">
          <img src={questionnaireData.icon} alt="Fitness Icon" />
          <div>{questionnaireData.heading}</div>
        </div>
        <div
          ref={widthRef}
          className="h-[6px] w-full rounded-[24px] bg-black-opacity-25"
        >
          <div
            className={`h-[6px] rounded-[30px] ${questionnaireData.bg}`}
            style={{ width: progressLength }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireProgress;
