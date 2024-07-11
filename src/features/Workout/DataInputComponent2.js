import React, { useRef } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const DataInputComponent2 = ({
  inputId,
  inputType,
  inputOptions,
  placeholder,
  label,
  index,
  twClasses,
}) => {
  const selectInputRef = useRef('');
  const textInputRef = useRef('');
  const [storedValue, setValue, getItem] = useLocalStorage(inputId, '');
  const [storedInputValues, setStoredInputValues, getStoredInputValues] = useLocalStorage('inputIds', []);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    const inputIds = getStoredInputValues();
    if (inputIds !== null && !inputIds.includes(inputId)) {
      setStoredInputValues([...inputIds, inputId]);
    } else if (inputIds === null) {
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

  const value = storedValue !== undefined ? storedValue : '';

  if (index === 0 || index === 1) {
    return (
      <div className="py-4">
        {inputType === 'select' ? (
          <>
            <label className="text-xs tracking-widest text-lightGray" htmlFor={inputId}>
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
  } else if (index === 2) {
    return (
      <div className="mt-4">
        <p className="mb-2 text-xs tracking-[3px] text-white">INSTRUCTIONS</p>
        <ul className="list-disc pl-3">
          <li className="my-2 text-xs font-light tracking-wider text-lightGray">
            {placeholder}
          </li>
          <li className="my-2 text-xs font-light tracking-wider text-lightGray">
            Do maximum 25 reps
          </li>
        </ul>
      </div>
    );
  }

  return null;
};

export default DataInputComponent2;