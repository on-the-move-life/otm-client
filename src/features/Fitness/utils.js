export function getCurrentWeekFullDate() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Day of the week (0-6) with 0 being Sunday

  // Calculate the date of Monday of the current week
  const firstDayOfWeek =
    today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);

  const currentWeek = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      firstDayOfWeek + i,
      today.getHours(),
      today.getMinutes(),
      today.getSeconds(),
      today.getMilliseconds(),
    );
    // Push the full Date object
    currentWeek.push(date);
  }
  return currentWeek;
}

export function getCurrentWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Day of the week (0-6) with 0 being Sunday

  // Calculate the date of Monday of the current week
  const firstDayOfWeek =
    today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
  const currentWeek = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      firstDayOfWeek + i,
    );
    // Get only the day of the month
    const dayOfMonth = date.getDate();
    currentWeek.push(dayOfMonth);
  }

  return currentWeek;
}

export const getDeviceTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getCurrentHourInTimezone = (timezone) => {
  const date = new Date();
  const localTime = date.toLocaleString('en-US', { timeZone: timezone });
  const localDate = new Date(localTime);
  return localDate.getHours();
};

export const getGreeting = (hour) => {
  if (hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};
