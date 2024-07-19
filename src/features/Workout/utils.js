/**
     * Converts weight to kilograms or pounds.
     *
     * @param {number} weight - The weight to be converted. Should be a positive number.
     * @param {boolean} isKg - A flag indicating whether the input weight is in kilograms. If false, the weight is in pounds.
     * @returns {number} - The weight in kilograms if isKg is true, or the weight in pounds rounded to two decimal places if isKg is false.
     * @throws {Error} - Throws an error if the weight is not a positive number.
    */
export const toKg = (weight, isKg) => {
    if (typeof weight !== 'number' || weight <= 0) {
        throw new Error('Weight must be a positive number.');
    }

    if (isKg) {
        return weight;
    } else {
        const weightInKg = weight / 2.20462;
        return parseFloat(weightInKg.toFixed(2)); // Round to two decimal places
    }
}

/**
     * Validates the input to accept only positive numbers and decimal values up to 2 decimal places.
     * Removes any non-numeric characters except for one decimal point, and limits the number of decimal places to 2.
     *
     * @param {string} input - The input string to be validated and cleaned.
     * @returns {string} - The cleaned input string containing only positive numbers and at most one decimal point with up to 2 decimal places.
     */
export const validateInput = (input) => {
    // Remove any character that is not a digit or a decimal point
    const cleanedInput = input.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point is allowed in the string
    const singleDecimalInput = cleanedInput.replace(/(\..*?)\..*/g, '$1');
    // Limit to 2 decimal places
    const decimalIndex = singleDecimalInput.indexOf('.');
    if (decimalIndex !== -1) {
        return singleDecimalInput.slice(0, decimalIndex + 3); // Include up to 2 digits after the decimal point
    }
    return singleDecimalInput;
}

/**
 * Extracts the unit value from a string input with a value and unit.
 * Handles empty strings, decimal values, and integer values.
 *
 * @param {string} inputString - The input string with a value and unit (e.g. "34 kg", "45 lbs", "43.54 kg", "3 kg", "4 lbs", "").
 * @returns {string} The string value without the value (e.g. kg, lbs).
 */
export const extractUnit = (inputString) => {
    try {
        if(inputString === ""){
            return inputString;
        }
        else{
            const regex = /(\d+(\.\d+)?)\s*([a-zA-Z]+)/;
            const match = inputString.match(regex);
            if (match) {
                return match[3]; // Return the unit part (e.g. kg, lbs)
            }
        }
    } catch (err) {
        console.error("extractUnit error : ", err);
        return ""; // Default to "" if no unit is found
    }
};

/**
 * Extracts the unit value from a string input with a value and unit.
 * Handles empty strings, decimal values, and integer values.
 *
 * @param {string} inputString - The input string with a value and unit (e.g. "34 kg", "45 lbs", "43.54 kg", "3 kg", "4 lbs", "").
 * @returns {string} The string value without the value (e.g. kg, lbs).
 */
export const extractValue = (inputString) => {
    try {
        if(inputString === ""){
            return inputString;
        }
        else{
            const regex = /(\d+(\.\d+)?)\s*([a-zA-Z]+)/;
            const match = inputString.match(regex);
            if (match) {
                return match[1]; // Return the value part (e.g. "24", "34.43", etc)
            }
        }
    } catch (err) {
        console.error("extractUnit error : ", err);
        return ""; // Default to "" if no value is found
    }
};