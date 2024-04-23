import React, { useEffect } from 'react'
import { validateEmail, validatePhoneNumber, validatePositiveInteger } from './utils/utils'

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