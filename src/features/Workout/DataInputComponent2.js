import React, { useEffect, useRef, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const DataInputComponent = ({
    inputId,
    inputType,
    inputOptions,
    placeholder,
    label,
    // value,
    twClasses,
}) => {
    const selectInputRef = useRef('');
    const textInputRef = useRef('');
    const [storedValue, setValue, getItem] = useLocalStorage(inputId, '');
    const [storedInputValues, setStoredInputValues, getStoredInputValues] = useLocalStorage('inputIds', []);
    const [isKg, setIsKg] = useState(true);
    /**
     * Converts weight to kilograms or pounds.
     *
     * @param {number} weight - The weight to be converted. Should be a positive number.
     * @param {boolean} isKg - A flag indicating whether the input weight is in kilograms. If false, the weight is in pounds.
     * @returns {number} - The weight in kilograms if isKg is true, or the weight in pounds rounded to two decimal places if isKg is false.
     * @throws {Error} - Throws an error if the weight is not a positive number.
    */
    const toKg = (weight, isKg) => {
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
    const handleInputChange = (value) => {
        setValue(value);

        // add the inputId to the storedInputValues array if it's not already there
        const inputIds = getStoredInputValues();
        if (inputIds !== null && !inputIds.includes(inputId)) {
            setStoredInputValues([...inputIds, inputId]);
        }
        else if (inputIds === null) {
            setStoredInputValues([inputId]);
        }
    };

    /**
     * Validates the input to accept only positive numbers and decimal values up to 2 decimal places.
     * Removes any non-numeric characters except for one decimal point, and limits the number of decimal places to 2.
     *
     * @param {string} input - The input string to be validated and cleaned.
     * @returns {string} - The cleaned input string containing only positive numbers and at most one decimal point with up to 2 decimal places.
     */
    const validateInput = (input) => {
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

    const inputDropdownStyle = {
        backgroundColor: '#0F0F0F',
        color: 'white',
        width: '10px',
    };

    twClasses = twClasses
        ? twClasses
        : 'w-full border-b border-gray-400 bg-transparent py-2 text-white outline-none focus:border-blue-500';

    // Set default value to an empty string if not provided
    const value = storedValue !== undefined ? storedValue : '';
    const [weightValue, setWeightValue] = useState(value);

    useEffect(() => {
        try {
            if(weightValue === ""){
                handleInputChange("");
            }
            else{
                const weigthInKg = toKg(Number(weightValue), isKg);
                handleInputChange(weigthInKg.toString());
            }
        }
        catch (e) {
            console.log("error : ", e);
        }
    }, [weightValue, isKg])

    return (
        <div className="py-4">
            {inputType === 'select' ? (
                <>
                    <label
                        className="text-xs tracking-widest text-lightGray"
                        htmlFor={inputId}
                    >
                        {label}
                    </label>

                    <select
                        className={twClasses}
                        id={inputId}
                        name={inputId}
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value)}
                        label={label}
                        ref={selectInputRef}
                    >
                        {inputOptions.map((option) => (
                            <option key={option} value={option} style={inputDropdownStyle}>
                                {option}
                            </option>
                        ))}
                    </select>
                </>
            ) : inputType === 'textarea' ? (
                <textarea
                    className="textbox outline-none"
                    rows={1}
                    id={inputId}
                    name={inputId}
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={placeholder}
                    ref={textInputRef}
                ></textarea>
            ) : (inputType === "number" && label.includes('kg')) ? (
                <div className='w-full'>
                    <label className="text-gray-600 text-sm">
                        {label}
                    </label>
                    <div className="w-full relative mt-2 text-gray-500">
                        <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                            <select className="text-sm outline-none rounded-lg h-full bg-transparent" onChange={(e) => {
                                if (e.target.value === "kg") {
                                    setIsKg(true);
                                    if (weightValue !== "") {
                                        const lbsWeight = Number(weightValue);
                                        const kgValue = (lbsWeight / 2.20462).toFixed(2);
                                        setWeightValue(kgValue);
                                    }
                                }
                                else {
                                    setIsKg(false);
                                    if (weightValue !== "") {
                                        const kgWeight = Number(weightValue);
                                        const lbsValue = (kgWeight * 2.20462).toFixed(2);
                                        setWeightValue(lbsValue)
                                    }
                                }
                            }}>
                                <option>kg</option>
                                <option>lbs</option>
                            </select>
                        </div>
                        <input type="number" placeholder={placeholder} value={weightValue} pattern={"[0-9.+-e]"} className="textbox-kginput w-full pl-[4.5rem] pr-3 py-2 text-[#b1b1b1] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" onChange={(e) => {
                            setWeightValue(validateInput(e.target.value));
                        }} />
                    </div>
                </div>
            ) : (
                <input
                    className="textbox outline-none"
                    type={inputType}
                    id={inputId}
                    name={inputId}
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default DataInputComponent;
