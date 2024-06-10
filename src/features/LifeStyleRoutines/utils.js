import {
    format,
    parse
} from 'date-fns';

/**
 * Returns the current date in the format "Month Day Year" (e.g. "May 23 2024").
 *
 * @returns {string} The current date in the format "Month Day Year".
 */
export function getFormattedDate() {
    /**
     * The current date.
     * @type {Date}
     */
    const date = new Date();

    /**
     * An array of month names.
     * @type {string[]}
     */
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    /**
     * The full month name (e.g. "May").
     * @type {string}
     */
    const month = monthNames[date.getMonth()];

    /**
     * The day of the month (e.g. 23).
     * @type {number}
     */
    const day = date.getDate();

    /**
     * The full year (e.g. 2024).
     * @type {number}
     */
    const year = date.getFullYear();

    /**
     * The formatted date string.
     * @type {string}
     */
    return `${month} ${day} ${year}`;
}

/**
 * Returns an array of formatted strings of the day of the week and the month day.
 * The input should be in the format of "<month> <day> <year>".
 *
 * @param {string} dateString - The input date string in the format of "<month> <day> <year>".
 * @return {string[]} An array of formatted strings of the day of the week and the month day.
 */
export function formatDate(dateString) {
    const dateParts = dateString.split(' ');
    const dateObj = new Date(`${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`);
    const today = new Date();
    console.log(today.toDateString(), dateObj.toDateString())

    if (dateObj.toDateString() === today.toDateString()) {
        return ['Today', `${dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`];
    } else {
        return [dateObj.toLocaleDateString('en-US', { weekday: 'long' }), `${dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`];
    }
}

/**
     * Returns the day of the week as a short string (e.g. "Fri", "Thu", "Mon", etc.)
     * for a given input string in the format "May 30 2024".
     *
     * @param {string} inputString - The input string in the format "May 30 2024".
     * @returns {string} The day of the week as a short string (e.g. "Fri", "Thu", "Mon", etc.).
*/
export const getDayOfWeek = (inputString) => {
    const date = parse(inputString, 'MMMM d yyyy', new Date());
    return format(date, 'EEE');
};

/**
 * Extracts the day from a string input with a date in the format "Month Day Year".
 * Handles various month names and abbreviations.
 *
 * @param {string} dateString - The input string with a date in the format "Month Day Year" (e.g. "May 24 2024", "May 24, 2024", "May-24-2024", "May 24th 2024", "May 24 2,024").
 * @returns {number} The day of the month (e.g. 24).
 */
export const extractDay = (dateString) => {
    /**
     * Regular expression to match the day part of the date string.
     * Matches one or more digits (\d+) surrounded by optional whitespace characters (\s*)
     * and/or punctuation characters ([-,\.])
     */
    const dayRegex = /\s*[-,\.]?\s*(\d+)\s*[-,\.]?\s*/;

    try {
        const match = dateString.match(dayRegex);
        if (match) {
            return parseInt(match[1], 10); // Return the day as an integer
        } else {
            throw new Error(`Invalid date format: ${dateString}`);
        }
    } catch (err) {
        console.error(`extractDay error: ${err}`);
        return NaN; // Return NaN if an error occurs
    }
};

// Determine the color based on the percentage
export const getColor = (colors, percentCompletion) => {
    for (let i = 0; i < colors.length; i++) {
        if (percentCompletion <= colors[i].threshold) {
            return colors[i].color;
        }
    }
    return colors[colors.length - 1].color; // Default to the last color if not matched
};

