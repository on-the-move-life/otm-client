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
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

