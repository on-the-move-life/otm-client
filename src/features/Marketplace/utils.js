// this function changes the date-time format received from API to more readable format
export function formatDate(isoDateString, includeTime = true) {
    const date = new Date(isoDateString);
    const options = includeTime 
        ? { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        : { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}