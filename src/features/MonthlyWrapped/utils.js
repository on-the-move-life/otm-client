export function getCurrentMonthYear() {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
}

export function getCurrentMonth() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentDate = new Date();
    const monthNumber = currentDate.getMonth() + 1; // getMonth() returns 0-based month index
    const monthName = monthNames[monthNumber - 1];

    return [monthNumber, monthName];
}

export function getCurrentAndPreviousMonth() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // getMonth() returns 0-based month index
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12; // to handle wrap-around for January
  
    const currentMonthName = monthNames[currentMonthIndex];
    const previousMonthName = monthNames[previousMonthIndex];
  
    return [
      currentMonthName, previousMonthName
    ];
  }

export function getCurrentYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return currentYear;
}

export function convertDayCounts(data) {
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const counts = [];

    dayOrder.forEach(day => {
        const dayData = data.find(item => item.day === day);
        counts.push(dayData ? dayData.count : 0);
    });

    return counts;
}

export function convertMonthlySkillPoint(data){
    const skillOrder = ["Endurance", "Pull", "Squat", "Core", "Push"];
    const counts = [];

    skillOrder.forEach(score => {
        const skillData = data.find(item => item.category === score);
        counts.push(skillData ? skillData.score : 0);
    });

    return counts;
}