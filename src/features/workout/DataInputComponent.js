import React from 'react';
import { useDispatch } from 'react-redux';
import { updateInput } from './WorkoutSlice';

const DataInputComponent = ({ inputId, inputType, inputOptions, placeholder, label, value }) => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    dispatch(updateInput(inputId, newValue));
  };

  const inputStyle = {
    color: 'black'
  };

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      {inputType === 'select' ? (
        <select
          id={inputId}
          name={inputId}
          value={value}
          onChange={handleInputChange}
          style={inputStyle}
        >
          {inputOptions.map((option, optionIndex) => (
            <option key={optionIndex} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : inputType === 'textarea' ? (
        <textarea
          id={inputId}
          name={inputId}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={inputStyle}
        ></textarea>
      ) : (
        <input
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
