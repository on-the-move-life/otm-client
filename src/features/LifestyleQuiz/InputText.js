import React, { useEffect } from 'react'
import { validateEmail, validatePhoneNumber, validatePositiveInteger } from './utils/utils'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function InputText({ questionCode, response, setResponse, inputType, placeholder, isRequired, validation, setValidation, inputAsNumberOrText="text" }) {
  /**
   * @param {string} inputAsNumberOrText -> options ['text', 'number'], default value is 'text'
   * This prop is introduced as an add-on to meet the requirement for inputType === "number"
   * In Signup Questionnaire, requirement is 'text'. So the value will be saved as string.
   * While in the Meal-Planner, requirement is 'number'. So the value will be stored as number.
   */
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

  return (
    <div className='w-full text-white'>
      {(inputType === 'email' || inputType === 'number') &&
        <input
          type={inputType} //email, number
          value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
          style={{ borderColor: validation[questionCode] ? '#7e87ef' : 'red' }}
          className="textbox"
          onChange={(e) => {
            console.log("type of value :", typeof e.target.value, e.target.value)
            if(inputType === 'number' && inputAsNumberOrText === 'number'){
              setResponse(prev => {
                return (
                  {
                    ...prev,
                    [questionCode]: [e.target.value === "" ? "" : parseInt(e.target.value)]
                  }
                )
              })
            }
            else{
              setResponse(prev => {
                return (
                  {
                    ...prev,
                    [questionCode]: [e.target.value]
                  }
                )
              });
            }
          }}
          placeholder={placeholder}
        />}
      {
        (inputType === "tel") &&
        <PhoneInput
          placeholder="Enter phone number"
          className="custom-phone-input"
          autoComplete={false}
          defaultCountry='IN'
          style={{ borderColor: validation[questionCode] ? '#7e87ef' : 'red' }}
          value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
          onChange={(value) => {
            setResponse(prev => {
              return (
                {
                  ...prev,
                  [questionCode]: [value]
                }
              )
            });
          }} />
      }
      {(inputType === "text") &&
        <input
          type={inputType} //text
          value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
          style={{ borderColor: '#7e87ef' }}
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