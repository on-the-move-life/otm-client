import React from 'react'

function Options({ options, isMCQ, response, setResponse }) {

    const Option = ({ optionID, optionValue, isMCQ, response, setResponse }) => {
        return (
            <div className={`w-full py-4 px-3 bg-[#3d3d3d]/30 rounded-[12px] ${response.find(elem => elem === optionID) ? 'border border-1 border-[#7e87ef]' : ''}`} onClick={() => {
                // If an optionID is present, remove the empty string from the list
                // If no optionID is present in the list, keep the response as [""]
                if (isMCQ) {
                    if (response.find(elem => elem === optionID)) {
                        setResponse(prev => prev.filter(elem => elem !== optionID));
                        if(response.length === 0){
                            setResponse([""]);
                        }
                    }
                    else {
                        if(response.length === 1 && response[0] === ""){
                            setResponse(prev => [optionID]);
                        }
                        else{
                            setResponse(prev => [...prev, optionID])
                        }
                    }
                }
                else {
                    setResponse(prev => [optionID])
                }
            }}>
                <p className={`text-[18px] ${response.find(elem => elem === optionID) ? 'text-[#7e87ef]' : 'text-[#b1b1b1]'}`}>{optionValue}</p>
            </div>
        )
    }
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-6'>
            {
                options && options?.map((option, idx) => {
                    return (
                        <Option isMCQ={isMCQ} response={response} setResponse={setResponse} optionID={option?.id} optionValue={option?.value} />
                    )
                })
            }
        </div>
    )
}

export default Options