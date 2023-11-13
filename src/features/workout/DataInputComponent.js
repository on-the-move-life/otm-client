import React from 'react';
import { useDispatch } from 'react-redux';
import { updateInput } from './WorkoutSlice';

const DataInputComponent = ({
  inputId,
  inputType,
  inputOptions,
  placeholder,
  label,
  value,
  twClasses,
}) => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    dispatch(updateInput(inputId, newValue));
  };

  const inputStyle = {
    color: 'white',
  };

  const inputDropdownStyle = {
    // backgroundColor: 'grey',
    backgroundColor: '#0F0F0F',
    color: 'white',
    width: '10px'
  };
  

  twClasses = twClasses
    ? twClasses
    : 'w-full border-b border-gray-400 bg-transparent py-2 text-white outline-none focus:border-blue-500';
  return (
    <div className="py-4">
      <label htmlFor={inputId}>{label}</label>
      {inputType === 'select' ? (
        <select
          className={twClasses}
          id={inputId}
          name={inputId}
          value={value}
          onChange={handleInputChange}
          style={inputStyle}
        >
          {inputOptions.map((option, optionIndex) => (
            <option
              key={optionIndex}
              value={option}
              style={inputDropdownStyle}
            >
              {option}
            </option>
          ))}
        </select>
      ) : inputType === 'textarea' ? (
        <textarea
          className="w-full border-b border-gray-400 bg-transparent py-2 text-white outline-none focus:border-blue-500"
          id={inputId}
          name={inputId}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={inputStyle}
        ></textarea>
      ) : (
        <input
          className="w-full border-b border-gray-400 bg-transparent py-2 text-white outline-none focus:border-blue-500"
          type={inputType}
          id={inputId}
          name={inputId}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={inputStyle}
        />
      )}
    </div>
  );
};

export default DataInputComponent;
