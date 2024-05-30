import React, { useState } from 'react';
import CalendarTile from './components/CalendarTile';

function Calendar({ completionHistory }) {
  const [selectedDate, setSelectedDate] = useState(completionHistory[completionHistory.length - 1]?.date);

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
