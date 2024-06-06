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

