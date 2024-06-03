import React, { useEffect, useState } from 'react';
import CalendarTile from './components/CalendarTile';
import { formatDate } from "./utils";

function Calendar({ completionHistory, isSummaryPage, selectedDate, setSelectedDate }) {
  const [reversedCompletionHistory, setReverseCompletionHistory] = useState(null);

  useEffect(() => {
    const tempReversedCompletionHistory = completionHistory.reverse();
    setReverseCompletionHistory(tempReversedCompletionHistory);
  }, [completionHistory])

  useEffect(() => {
    try {
      const todayDate = reversedCompletionHistory[completionHistory?.length - 1]?.date;
      setSelectedDate(todayDate);
    }
    catch (err) {
      console.log("error : ", reversedCompletionHistory)
    }
  }, [completionHistory, reversedCompletionHistory])

  return (
    <div className='w-full flex flex-col justify-center items-start gap-3'>
      {selectedDate && !isSummaryPage && <h3 className='text-[26px]' style={{ lineHeight: '41.6px' }}><span className='text-[#F8F8F8]'>{formatDate(selectedDate)[0]},</span> <span className='text-[#929292]'>{formatDate(selectedDate)[1]}</span></h3>}
      {selectedDate && isSummaryPage &&
        <div className='w-full flex flex-col justify-start items-start'>
          <h3 className='text-[26px] text-[#f8f8f8]' style={{lineHeight: '40px'}}>Summary</h3>
          <h5 className='text-[20px] text-[#929292]'>{formatDate(selectedDate)[0]}, {formatDate(selectedDate)[1]}</h5>
        </div>
      }
      <div className="w-full flex flex-row justify-around items-center">
        {reversedCompletionHistory && selectedDate && reversedCompletionHistory?.map((history, index) => (
          <CalendarTile date={history?.date} percentCompletion={history?.completionPercentage} setSelectedDate={setSelectedDate} isToday={index === completionHistory?.length - 1} isSelected={history?.date === selectedDate} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;