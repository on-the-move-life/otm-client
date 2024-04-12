import React from 'react'

function InputText({response, setResponse}) {
  return (
    <div className='w-full text-white'>
        <textarea 
            className='w-full bg-[#3d3d3d]/30 rounded-[12px] p-2 text-white/60 custom-textarea'
            rows={8}
            placeholder='Type your answer here...'
            onChange={(e) => {
              setResponse([e.target.value]);
            }}
            value={response[0]}
        />
    </div>
  )
}

export default InputText