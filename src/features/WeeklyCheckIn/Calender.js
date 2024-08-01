import React, { useEffect, useState } from 'react';
import CalendarTile from '../LifeStyleRoutines/components/CalendarTile';
import { formatDate } from "../LifeStyleRoutines/utils";
import ProgressBar from '../LifeStyleRoutines/ProgressBar';

function Calendar({ completionHistory, isSummaryPage, selectedDate, setSelectedDate }) {
  const [reversedCompletionHistory, setReversedCompletionHistory] = useState([]);
  const [percentCompletionOfSelectedDate, setPercentCompletionOfSelectedDate] = useState(null);

  useEffect(() => {
    if (completionHistory && completionHistory.length > 0) {
      setReversedCompletionHistory(completionHistory.slice().reverse());
    }
  }, [completionHistory]);

  useEffect(() => {
    try {
      const todayDate = reversedCompletionHistory[reversedCompletionHistory.length - 1]?.date;
      console.log("selected date : ", selectedDate)
      if (!selectedDate) {
        setSelectedDate(todayDate);
      }
    } catch (err) {
      console.error("Error occurred while setting selected date:", err);
    }
  }, [selectedDate]);

  useEffect(() => {
    console.log("percentCompletionHistory : ", selectedDate)
    const percentCompletionHistory = completionHistory?.find(history => history.date === selectedDate);
    setPercentCompletionOfSelectedDate(percentCompletionHistory?.completionPercentage ?? null);
  }, [completionHistory, selectedDate]);

  return (
    <div className="w-full flex flex-col justify-center items-start">
      {selectedDate && (
        <>
          {!isSummaryPage &&
            <h3 className="text-2xl font-bold" style={{ lineHeight: '41.6px' }}>
              <span className="text-white">{formatDate(selectedDate)[0]}, </span>
              <span className="text-gray-500">{formatDate(selectedDate)[1]}</span>
            </h3>}
          {isSummaryPage && (
            <>
              <h3 className='text-[26px] text-[#FFF]' style={{lineHeight: '40px'}}>Summary</h3>
              <h5 className="text-lg text-gray-500">{formatDate(selectedDate).join(', ')}</h5>
            </>
          )}
        </>
      )}
      {(percentCompletionOfSelectedDate !== null && percentCompletionOfSelectedDate !== 0) && (
        <ProgressBar progress={percentCompletionOfSelectedDate} />
      )}
      {(percentCompletionOfSelectedDate === null || percentCompletionOfSelectedDate === 0) && <p className='text-blue font-sfpro text-[14px] font-body-condensed-bold'>You did not complete any tasks on this day.</p>}
      <div className="w-full flex flex-row justify-around items-center mt-4">
        {reversedCompletionHistory.map(history => (
          <CalendarTile
            key={history.date}
            date={history.date}
            percentCompletion={history.completionPercentage}
            setSelectedDate={setSelectedDate}
            isToday={history.date === reversedCompletionHistory[reversedCompletionHistory.length - 1]?.date}
            isSelected={history?.date === selectedDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
