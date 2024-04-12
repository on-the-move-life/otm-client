import React, { useState } from 'react'

function Options({options, isMCQ}) {
    const [answer, setAnswer] = useState([]);
    const Option = ({optionID, optionValue, isMCQ, answer, setAnswer}) => {
        return(
            <div className={`w-full py-4 px-3 bg-[#3d3d3d]/30 rounded-[12px] ${answer.find(elem => elem === optionID) ? 'border border-1 border-[#7e87ef]' : ''}`} onClick={() => {
                if(isMCQ){
                    if(answer.find(elem => elem === optionID)){
                        setAnswer(prev => prev.filter(elem => elem !== optionID));
                    }
                    else{
                        setAnswer(prev =>[...prev, optionID])
                    }
                }
                else{
                    setAnswer(prev => [optionID])
                }
            }}>
                <p className={`text-[18px] ${answer.find(elem => elem === optionID) ? 'text-[#7e87ef]' : 'text-[#b1b1b1]'}`}>{optionValue}</p>
            </div>
        )
    }
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
        {
            options && options?.map((option, idx) => {
                return(
                    <Option isMCQ={isMCQ} answer={answer} setAnswer={setAnswer} optionID={option?.id} optionValue={option?.value}/>
                )
            })
        }
    </div>
  )
}

export default Options