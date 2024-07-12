export function getPreviousMonthYear() {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthIndex = date.getMonth() - 1; // Previous month index
    let year = date.getFullYear();

    // Handle the edge case for January
    if (monthIndex < 0) {
        monthIndex = 11; // December
        year -= 1; // Previous year
    }

    const month = monthNames[monthIndex];
    return `${month} ${year}`;
}

export function getPreviousMonthYearInArray() {
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthIndex = date.getMonth() - 1; // Previous month index
    let year = date.getFullYear();

    // Handle the edge case for January
    if (monthIndex < 0) {
        monthIndex = 11; // December
        year -= 1; // Previous year
    }

    const month = monthNames[monthIndex];
    const shortYear = year.toString().slice(-2); // Get last two digits of the year
    return [month, shortYear];
}


export function getPreviousMonth() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentDate = new Date();
    let monthNumber = currentDate.getMonth() + 1; // getMonth() returns 0-based month index, add 1 to convert to 1-based month index

    // Handle the edge case for January
    if (monthNumber === 1) {
        monthNumber = 12; // December
    } else {
        monthNumber--; // Move to the previous month
    }

    const monthName = monthNames[monthNumber - 1]; // Adjust for 0-based index

    return [monthNumber, monthName];
}


export function getPreviousAndPreviousToPreviousMonth() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // getMonth() returns 0-based month index
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12; // handle wrap-around for January
    const previousToPreviousMonthIndex = (currentMonthIndex - 2 + 12) % 12; // handle wrap-around for December and January
  
    const previousMonthName = monthNames[previousMonthIndex];
    const previousToPreviousMonthName = monthNames[previousToPreviousMonthIndex];
  
    return [
      previousMonthName, previousToPreviousMonthName
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