import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInput } from './WorkoutSlice';

const DataInputComponent = ({
  inputId,
  inputType,
  inputOptions,
  placeholder,
  label,
  // value,
  twClasses,
}) => {
  const dispatch = useDispatch();
  const storedValue = useSelector(
    (state) => state.workoutReducer.inputValues[inputId],
  );

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    dispatch(updateInput(inputId, newValue));
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
