import React, { useState, useEffect } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  lastDayOfWeek,
  getDay,
  getDate
} from 'date-fns';
import CalendarTile from './components/CalendarTile';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(getDate(new Date()));
  const [selectedTile, setSelectedTile] = useState(todayDate);
  const [todayDay, setTodayDay] = useState(getDay(new Date()));

  const getWeekDaysWithDates = (currentMonth) => {
    const dateFormatDay = 'EEE'; // Format for day (e.g., Mon, Tue)
    const dateFormatDate = 'd'; // Format for date (e.g., 21)

    // Start and end dates of the week
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    let endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });

    const weekDays = [];
    let day = startDate;

    // Loop through the days of the week
    while (day <= endDate) {
      const formattedDay = format(day, dateFormatDay); // e.g., Mon
      const formattedDate = format(day, dateFormatDate); // e.g., 21

      weekDays.push({
        day: formattedDay,
        date: parseInt(formattedDate, 10)
      });

      day = addDays(day, 1);
    }

    return weekDays;
  };

  const weekDaysWithDates = getWeekDaysWithDates(currentMonth);

  return (
    <div>
      <div className="w-full flex flex-row justify-around items-center">
        {weekDaysWithDates.map((weekDay, index) => (
          <CalendarTile day={weekDay.day} date={weekDay.date} isSelected={weekDay.date === selectedTile ? true : false} percentCompletion={(index * 30 + 10)} setSelectedDate={setSelectedTile} todayDate={todayDate} todayDay={todayDay}/>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
