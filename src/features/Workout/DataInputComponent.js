import React, { useState } from 'react';
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
  const [firstValue, setFirstValue] = useState(inputOptions[0]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  console.log('xxx', inputOptions);

  const handleInputChange = (event) => {
    const newValue = event;
    setFirstValue(event);
    setIsOptionOpen(false);
    dispatch(updateInput(inputId, newValue));
  };

  const inputDropdownStyle = {
    backgroundColor: '#0F0F0F',
    color: 'black',
    width: '10px',
  };

  // Set default value to an empty string if not provided
  const value = storedValue !== undefined ? storedValue : '';

  return (
    <div className="py-4">
      {inputType === 'select' ? (
        <>
          <label
            className="text-xs tracking-widest text-lightGray "
            htmlFor={inputId}
          >
            {label}
          </label>

          <div
            className={
              'focus:border-blue-500 justify relative mt-2 flex min-h-[48px] w-full items-center  justify-between rounded-xl bg-white-opacity-08 px-6 py-[2px]  text-[#929292] outline-none'
            }
            id={inputId}
            name={inputId}
            value={value}
            label={label}
          >
            {isOptionOpen === false ? (
              <div className="w-full" onClick={() => setIsOptionOpen(true)}>
                {firstValue}
              </div>
            ) : (
              <div className="w-full">
                {inputOptions.map((option, index) => (
                  <div
                    onClick={() => handleInputChange(option)}
                    className={` mr-[100px] flex  h-[45px] w-full items-center  text-[#929292] ${
                      inputOptions.length - 1 > index &&
                      ' border-b border-b-darkGray'
                    } `}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

            {isOptionOpen === true ? (
              <img
                className="absolute right-6 top-5"
                loading="lazy"
                src="/assets/up-arrow-white.svg"
                onClick={() => setIsOptionOpen(false)}
              />
            ) : (
              <img
                loading="lazy"
                onClick={() => setIsOptionOpen(true)}
                src="/assets/down-arrow-white.svg"
              />
            )}
          </div>
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
