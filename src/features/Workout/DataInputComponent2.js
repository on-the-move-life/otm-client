/*
    This code solves the following problems:
        1.) Animation re-rendering on input change
        2.) The input values not being persisted on reload
    
    The solution is to use the useLocalStorage hook to store the input values in local storage.
*/
import React, { useRef } from 'react';
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
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);

        // add the inputId to the storedInputValues array if it's not already there
        const inputIds = getStoredInputValues();
        if (inputIds !== null && !inputIds.includes(inputId)) {
            setStoredInputValues([...inputIds, inputId]);
        }
        else if (inputIds === null) {
            setStoredInputValues([inputId]);
        }
    };

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
                        onChange={handleInputChange}
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
                    id={inputId}
                    name={inputId}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    ref={textInputRef}
                ></textarea>
            ) : (
                <input
                    className="textbox outline-none"
                    type={inputType}
                    id={inputId}
                    name={inputId}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default DataInputComponent;
