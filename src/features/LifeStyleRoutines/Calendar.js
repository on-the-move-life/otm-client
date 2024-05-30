import React, { useEffect, useState } from 'react';
import CalendarTile from './components/CalendarTile';

function Calendar({ completionHistory }) {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    try{
      const todayDate =  completionHistory[completionHistory?.length - 1]?.date;
      setSelectedDate(todayDate);
    }
    catch(err){
      console.log("error : ", completionHistory)
    }
  }, [completionHistory])
  
  return (
    <div>
      <div className="w-full flex flex-row justify-around items-center">
        {completionHistory?.map((history, index) => (
          <CalendarTile date={history?.date} percentCompletion={history?.completionPercentage} setSelectedDate={setSelectedDate} isToday={index === completionHistory?.length - 1} isSelected={history?.date === selectedDate} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;