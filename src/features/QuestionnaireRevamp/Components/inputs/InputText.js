import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CircularSlider from '@fseehawer/react-circular-slider';
import { ReactComponent as DragIcon } from './circularKnob.svg';
import { ReactComponent as SliderLabel } from './circularSliderLabel.svg';

function InputText({ questionCode, response, setResponse, inputType, placeholder }) {
    const [isTyping, setTyping] = useState(false);

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
                        className="textbox uppercase"
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
                        className='textbox-text uppercase'
                        variants={variants}
                        initial="hidden"
                        animate={isTyping || response[questionCode][0] !== '' ? "visible" : "hidden"}
                    >
                        {placeholder}
                    </motion.p>
                </div>
            }
            {(inputType === "range") &&
                <div className='w-full flex flex-row items-center justify-center'>
                    <CircularSlider
                        width={280}
                        data={[0, 15, 30, 60, 90, 120, 150]}
                        onChange={val => {
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
                </div>
            }
        </div>
    )
}

export default InputText;
