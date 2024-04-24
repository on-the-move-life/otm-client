import React from 'react'
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as DragIcon } from './circularKnob.svg';

function InputText({ questionCode, response, setResponse, inputType, placeholder }) {

    return (
        <div className='w-full text-white'>
            {(inputType === 'text') &&
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
                />
            }
            {(inputType === "range") &&
                <CircularSlider
                    width={280}
                    onChange={value => { console.log(value); }}
                    renderLabelValue={<img src='/assets/circularSliderLabel.svg' alt="label" />}
                    verticalOffset="3rem"
                    labelBottom={false}
                    trackSize={30}
                    trackColor='#131313'
                    progressSize={30}
                    progressColorFrom={"#D6B6F0"}
                    progressColorTo={"#848CE9"}
                    knobSize={50}
                >
                    <DragIcon x="0" y="0" width="50px" height="50px" />
                </CircularSlider>
            }
        </div>
    )
}

export default InputText