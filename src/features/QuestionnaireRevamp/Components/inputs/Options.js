import React, { useState } from 'react';
import { HOME, FULL, LIA, MOA, NOEQ, SED, SHRED, SIZE, SUA, VEA } from "../svg"

function Options({ questionCode, options, MCQType, response, setResponse }) {
    console.log('Question code : ', questionCode);
    const [isTextFieldActive, setTextFieldActive] = useState(false);
    const RenderSVG = (name, isSelected) => {
        switch(name){
            case 'FULL': return <FULL isSelected={isSelected}/>;
            case 'HOME':  return <HOME isSelected={isSelected}/>;
            case 'LIA':  return <LIA isSelected={isSelected}/>;
            case 'MOA':  return <MOA isSelected={isSelected}/>; 
            case 'NOEQ':  return <NOEQ isSelected={isSelected}/>;
            case 'SED':  return <SED isSelected={isSelected}/>;
            case 'SHRED':  return <SHRED isSelected={isSelected}/>;
            case 'SIZE':  return <SIZE isSelected={isSelected}/>;
            case 'SUA':  return <SUA isSelected={isSelected}/>;
            case 'VEA':  return <VEA isSelected={isSelected}/>;
            default : break;
        }
    }
    const Option = ({
        questionCode,
        optionID,
        optionValue,
        optionDescription,
        MCQType,
        response,
        setResponse,
    }) => {
        console.log('questioncode : ', questionCode);
        return (
            <div
                className={`w-full border-box flex flex-row justify-between items-center rounded-[12px] bg-[#3d3d3d]/30 pl-3 pr-5 ${response[questionCode]?.find((elem) => elem === optionID)
                    ? 'border-1 border border-[#7e87ef]'
                    : ''
                    }`}
                onClick={() => {
                    // If an optionID is present, remove the empty string from the list
                    // If no optionID is present in the list, keep the response as [""]
                    if (MCQType === 'multiChoice') {
                        if (response[questionCode]?.find((elem) => elem === optionID)) {
                            setResponse((prev) => {
                                return {
                                    ...prev,
                                    [questionCode]: response[questionCode]?.filter(
                                        (elem) => elem !== optionID,
                                    ),
                                };
                            });
                            if (response.length === 0) {
                                setResponse((prev) => {
                                    return {
                                        ...prev,
                                        [questionCode]: [''],
                                    };
                                });
                            }
                        }
                        else {
                            if (
                                response[questionCode]?.length === 1 &&
                                response[questionCode][0] === ''
                            ) {
                                setResponse((prev) => {
                                    return {
                                        ...prev,
                                        [questionCode]: [optionID],
                                    };
                                });
                            }
                            else {
                                setResponse((prev) => {
                                    return {
                                        ...prev,
                                        [questionCode]: [...response[questionCode], optionID],
                                    };
                                });
                            }
                        }
                    }
                    else if (MCQType === "singleChoice") {
                        setResponse((prev) => {
                            return {
                                ...prev,
                                [questionCode]: [optionID],
                            };
                        });
                    }
                    else if(MCQType === "singleChoiceAndOther") {
                        if (isTextFieldActive) {
                            setTextFieldActive(false);
                        }
                        setResponse((prev) => {
                            return {
                                ...prev,
                                [questionCode]: [optionID],
                            };
                        });
                    }
                }}
            >
                <div
                    className={`w-full flex flex-col justify-center ${questionCode === 'su1' ? 'py-3 items-center' : 'py-4 items-start'}`}
                >
                    <p className={`text-[19px]  ${response[questionCode]?.find((elem) => elem === optionID)
                        ? 'text-[#7e87ef]'
                        : 'text-[#b1b1b1]'
                        }`}>{optionValue}</p>
                    <p className={`text-[13px]  ${response[questionCode]?.find((elem) => elem === optionID)
                        ? 'text-[#7e87ef]'
                        : 'text-[#929292]'
                        }`}>{optionDescription}</p>
                </div>
                {RenderSVG(optionID, response[questionCode]?.find((elem) => elem === optionID))}
            </div>
        );
    };
    return (
        <div className={`flex h-full w-full items-center justify-center gap-6 ${questionCode === "su1" ? 'flex-row' : 'flex-col'}`}>
            {options &&
                options?.map((option, idx) => {
                    return (
                        <Option
                            MCQType={MCQType}
                            response={response}
                            setResponse={setResponse}
                            optionID={option?.id}
                            optionValue={option?.value}
                            optionDescription={option?.description}
                            questionCode={questionCode}
                            key={option?.id}
                        />
                    );
                })
            }
            {
                MCQType === "singleChoiceAndOther" && 
                <input
                    type={"text"} //text
                    value={questionCode && Object.keys(response)?.length > 0 && isTextFieldActive ? (response[questionCode])[0] : ''}
                    style={{ borderColor: '#7e87ef' }}
                    className="textbox"
                    onChange={(e) => {
                        if(!isTextFieldActive){
                            setTextFieldActive(true);
                        }
                        setResponse(prev => {
                            return (
                                {
                                    ...prev,
                                    [questionCode]: [e.target.value]
                                }
                            )
                        });
                    }}
                    placeholder={"Please Specify"}
                />
            }
        </div>
    );
}

export default Options;
