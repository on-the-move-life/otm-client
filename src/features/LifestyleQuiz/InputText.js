import React, { useEffect } from 'react'

function InputText({ questionCode, response, setResponse }) {

  useEffect(() => {
    console.log("input text :", response, questionCode)
  }, [questionCode, response])

  return (
    <div className='w-full text-white'>
      <input
        type="text" 
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
        placeholder="Type your response here..."
      />
    </div>
  )
}

export default InputText