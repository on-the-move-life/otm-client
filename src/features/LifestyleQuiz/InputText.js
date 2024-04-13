import React, { useEffect } from 'react'

function InputText({questionCode, response, setResponse}) {

  useEffect(() => {
    console.log("input text :", response, questionCode)
  }, [questionCode, response])

  return (
    <div className='w-full text-white'>
        <textarea 
            className='w-full bg-[#3d3d3d]/30 rounded-[12px] p-2 text-white/60 custom-textarea'
            rows={8}
            placeholder='Type your answer here...'
            onChange={(e) => {
              setResponse(prev => {
                return(
                  {
                    ...prev,
                    [questionCode]: [e.target.value]
                  }
                )
              });
            }}
            value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
        />
    </div>
  )
}

export default InputText