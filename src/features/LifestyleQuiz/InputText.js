import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';

function InputText({ questionCode, response, setResponse, inputType, placeholder, isRequired, validation, setValidation }) {
  useEffect(() => {
    if (inputType === "email") {
      setValidation(prev => {
        return (
          {
            ...prev,
            [questionCode]: validateEmail(response[questionCode][0])
          }
        )
      })
    }

    else if (inputType === "tel") {
      setValidation(prev => {
        return (
          {
            ...prev,
            [questionCode]: validatePhoneNumber(response[questionCode][0])
          }
        )
      })
    }
    else if (inputType === "number") {
      setValidation(prev => {
        return (
          {
            ...prev,
            [questionCode]: validatePositiveInteger(response[questionCode][0])
          }
        )
      })
    }
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
      {(inputType === 'email' || inputType === 'tel' || inputType === 'number') ?
        <input
          type={inputType} //text, number
          value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
          style={{ borderColor: validation[questionCode] ? '#7e87ef' : 'red' }}
          className="textbox"
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
          placeholder={placeholder}
        /> :
        <input
          type={inputType} //text, number
          value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
          style={{ borderColor: '#7e87ef'}}
          className="textbox"
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
          placeholder={placeholder}
        />}
    </div>
  )
}

export default InputText