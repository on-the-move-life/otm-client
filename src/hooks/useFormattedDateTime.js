import { useState, useEffect, useCallback } from 'react';

// fuction to get the month name if the month number is passed as an argument
function getMonthName(month) {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month - 1];
}

// function to add the ordinal suffix to the day, e.g 1st, 22nd, 3rd, 4th
function addOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
        return `${day}th`;
    }
    switch (day % 10) {
        case 1:
            return `${day}st`;
        case 2:
            return `${day}nd`;
        case 3:
            return `${day}rd`;
        default:
            return `${day}th`;
    }
}

// function to get the formatted date and time - e.g. [21st Feb, 08:39 PM]
const formatDateTime = (inputDateTime) => {
    const [datePart, timePart, ampm] = inputDateTime.split(' ');
    const [month, day, year] = datePart.split('/');

    const formattedDate = `${addOrdinalSuffix(parseInt(day))} ${getMonthName(parseInt(month))}`;
    const formattedTime = `${timePart} ${ampm}`;

    return [formattedDate, formattedTime]
}

export const useFormattedDateTime = (date) => {
    const [formattedDateTime, setFormattedDateTime] = useState('');

    const getDateTime = useCallback((inputDate) => {
        const [formattedDate, formattedTime] = formatDateTime(inputDate);
        setFormattedDateTime([formattedDate, formattedTime]);
    }, []);

    useEffect(() => {
        getDateTime(date);
    }, [date, getDateTime]);

    return formattedDateTime;
}