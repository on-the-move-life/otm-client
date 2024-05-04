import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as DragIcon } from './circularKnob.svg';
import { ReactComponent as SliderLabel } from './circularSliderLabel.svg';
import styled from 'styled-components';

const NumericalTime = styled.div`
    color: var(--green, #5ECC7B);
    font-family: Anton;
`
const TextualTime = styled.div`
    color: var(--green, #5ECC7B);
    font-family: Anton;
`
function InputText({ questionCode, response, setResponse, inputType, placeholder }) {
    const [isTyping, setTyping] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className='w-full text-white'>
            {(inputType === 'text' || inputType === 'number') &&
                <div>
                    <input
                        type={inputType} //text
                        value={questionCode && Object.keys(response)?.length > 0 && (response[questionCode])[0]}
                        style={{ borderColor: '#7e87ef' }}
                        className="textbox-questionnaire uppercase"
                        onClickCapture={() => {
                            setTyping(true);
                        }}
                        onBlur={() => {
                            setTyping(false);
                        }}
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
                    <motion.p
                        className='textbox-text-questionnaire uppercase'
                        variants={variants}
                        initial="hidden"
                        animate={isTyping || response[questionCode][0] !== '' ? "visible" : "hidden"}
                    >
                        {placeholder}
                    </motion.p>
                </div>
            }
            {(inputType === "range") &&
                <div className='w-full flex flex-col items-center justify-center gap-9 mt-9'>
                    <CircularSlider
                        width={280}
                        data={[15, 20, 30, 45, 60, 90, 120]}
                        onChange={val => {
                            setSliderValue(val);
                            setResponse(prev => {
                                return (
                                    {
                                        ...prev,
                                        [questionCode]: [val]
                                    }
                                )
                            });
                        }}
                        renderLabelValue={<SliderLabel x="50" y="-50" width="40px" height="44px" className='absolute top-[118px] left-[120px] z-10' />}
                        verticalOffset="3rem"
                        labelBottom={false}
                        trackSize={30}
                        trackColor='#242424'
                        progressSize={30}
                        progressColorFrom={"#D6B6F0"}
                        progressColorTo={"#848CE9"}
                        knobSize={50}
                    >
                        <DragIcon x="0" y="0" width="50px" height="50px" />
                    </CircularSlider>
                    <div className='h-fit flex flex-col justify-center items-center'>
                        <NumericalTime className='text-[52px]'>{sliderValue}</NumericalTime>
                        <TextualTime className='text-[22px] relative' style={{top: '-15px'}}>mins</TextualTime>
                    </div>
                </div>
            }
        </div>
    )
}

export default InputText;
