import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';

function InputText({ questionCode, response, setResponse, inputType, placeholder, isRequired }) {
  const [isValidated, setValidated] = useState(true);

  useEffect(() => {
    if (inputType === "email")
      setValidated(validateEmail(response[questionCode][0]));
    else if (inputType === "tel")
      setValidated(validatePhoneNumber(response[questionCode][0]));
    else if(inputType === "number")
      setValidated(validatePositiveInteger(response[questionCode][0]));
  }, [questionCode, response])

  // function to validate email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === "" ? true : emailRegex.test(email);
  }

  // function to validate phone number
  function validatePhoneNumber(phoneNumber) {
    // Regular expression for a simple phone number validation
    const phoneRegex = /^\d{10}$/;

    // Check if the phoneNumber matches the regex pattern
    return phoneNumber === "" ? true : phoneRegex.test(phoneNumber);
  }

  // function to validate positive integer age
  function validatePositiveInteger(inputValue) {
    // Regular expression for positive integers without decimal points
    const positiveIntegerRegex = /^[1-9]\d*$/;
  
    // Check if the inputValue matches the regex pattern
    return inputValue === "" ? true : positiveIntegerRegex.test(inputValue);
  }

  return (
    <div className='w-full text-white'>
      {
        (inputType === "email" || inputType === "tel" || inputType === "number") &&
        <TextField
          required={isRequired}
          autoComplete
          type={inputType}
          label={placeholder}
          className='w-full'
          value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: isValidated ? '#b1b1b1' : '#fa493c', // Outline color
              },
              '& input': {
                color: '#b1b1b1', // Text color
              },
              '&.Mui-focused': {
                '& fieldset': {
                  borderColor: isValidated ? '#7e87ef' : '#fa493c', // Focused outline color
                },
              }
            },
            '& .MuiInputLabel-outlined': {
              color: isValidated ? 'gray' : '#fa493c', // Label color
            },
          }}
          onChange={(e) => {
            setResponse(prev => {
              return (
                {
                  ...prev,
                  [questionCode]: [e.target.value]
                }
              )
            });
          }}
        />
      }
      {
        inputType === "text" &&
        <TextField
          required={isRequired}
          autoComplete
          type={inputType}
          label={placeholder}
          multiline
          maxRows={4}
          className='w-full'
          value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#b1b1b1', // Outline color
              },
              '& input, & textarea': {
                color: '#b1b1b1', // Text color
                '&:not(.Mui-focused)': {
                  color: '#b1b1b1', // Text color when not focused
                },
              },
              '&.Mui-focused': {
                '& fieldset': {
                  borderColor: '#7e87ef', // Focused outline color
                },
              }
            },
            '& .MuiInputLabel-outlined': {
              color: 'gray' // Label color
            },
          }}
          onChange={(e) => {
            setResponse(prev => {
              return (
                {
                  ...prev,
                  [questionCode]: [e.target.value]
                }
              )
            });
          }}
        />
      }
    </div>
  )
}

export default InputText