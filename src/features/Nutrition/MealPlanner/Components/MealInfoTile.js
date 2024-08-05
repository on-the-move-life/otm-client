import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContainerDimensions } from '../../../../hooks/useContainerDimensions';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import NutrientsBubble from './NutrientsBubble';

function MealInfoTile({ meal, name, calories, ingredients, macros }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function percentageToFloat(percentage) {
        // Remove the '%' symbol and convert the string to a float
        const floatValue = percentage?.replace('%', '');
        const floatVal = parseFloat(floatValue);

        // Divide by 100 to convert the percentage to a decimal
        return floatVal/100;
    }

    const Collapsed = () => {
        const barRef = useRef();
        const { width } = useContainerDimensions(barRef);

        return (
            <motion.div
                className='w-full flex flex-row justify-around items-start'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ opacity: { duration: 0.3 }, height: { duration: 0.3 } }}
            >
                <div className='w-full flex flex-col justify-start items-start gap-2'>
                    <div className='w-full flex flex-row justify-start items-center gap-2'>
                        <h3 className='text-[14px] text-[#DDF988] font-semibold' style={{ lineHeight: '16.71px' }}>{meal}</h3>
                        <h3 className='text-[14px] text-[#F8F8F8] font-semibold' style={{ lineHeight: '16.71px' }}>{name}</h3>
                        <h5 className='text-[10px] text-[#F5C563] font-semibold' style={{ lineHeight: '12.76px' }}>{calories}</h5>
                    </div>
                    <div ref={barRef} className='w-full flex flex-row justify-start items-center gap-1'>
                        <div style={{ width: percentageToFloat(macros['carbs']) * width, height: '7px', borderRadius: '7px', backgroundColor: '#FA5757' }}></div>
                        <div style={{ width: percentageToFloat(macros['fats']) * width, height: '7px', borderRadius: '7px', backgroundColor: '#7E87EF' }}></div>
                        <div style={{ width: percentageToFloat(macros['protein']) * width, height: '7px', borderRadius: '7px', backgroundColor: '#5ECC7B' }}></div>
                    </div>
                    <div className='w-full flex flex-row justify-start items-center gap-2' style={{ fontSize: '9.33px', lineHeight: '11.14px' }}>
                        <p style={{ color: '#FA5757' }}>{macros['carbs']} carbs</p>
                        <p style={{ color: '#7E87EF' }}>{macros['fats']} fats</p>
                        <p style={{ color: '#5ECC7B' }}>{macros['protein']} proteins</p>
                    </div>
                </div>
                <div className='w-[30px] h-[30px] bg-black rounded-full flex justify-center items-center' onClick={() => setCollapsed(false)}>
                    <MdKeyboardArrowDown color={'#929292'} size={30} />
                </div>
            </motion.div>
        );
    };

    const Uncollapsed = () => {
        return (
            <motion.div
                className='w-full flex flex-row justify-around items-start'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ opacity: { duration: 0.1 }, height: { duration: 0.3 } }}
            >
                <div className='w-full flex flex-row justify-between'>
                    <div className='w-full flex flex-col justify-around items-start'>
                        <h3 className='text-[14px] text-[#DDF988] font-semibold' style={{ lineHeight: '16.71px' }}>{meal}</h3>
                        <div className='w-full flex flex-col justify-center items-start'>
                            <h3 className='text-[14px] text-[#F8F8F8] font-semibold' style={{ lineHeight: '16.71px' }}>{name}</h3>
                            <h5 className='text-[10px] text-[#F5C563] font-semibold' style={{ lineHeight: '12.76px' }}>{calories}</h5>
                        </div>
                        <div className='w-full flex flex-col justify-center items-start gap-3'>
                            <h5 style={{ fontSize: '9.33px', lineHeight: '11.14px', color: '#929292' }}>Ingredients used</h5>
                            <div className='w-full flex flex-col justify-center items-start gap-1'>
                                {
                                    ingredients && ingredients.map(item => {
                                        return (
                                            <p className='text-white' style={{ fontSize: '9.33px', lineHeight: '11.14px' }}>{item}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center relative right-3'>
                        <NutrientsBubble size='small' carbs={parseInt(percentageToFloat(macros['carbs']) * 100)} proteins={parseInt(percentageToFloat(macros['protein']) * 100)} fats={parseInt(percentageToFloat(macros['fats']) * 100)} />
                    </div>
                </div>
                <div className='w-[30px] h-[30px] bg-black rounded-full flex justify-center items-center' onClick={() => setCollapsed(true)}>
                    <MdKeyboardArrowUp color={'#929292'} size={30} />
                </div>
            </motion.div>
        );
    };

    return (
        <motion.div className='w-full rounded-[12px] bg-[#1C1C1E] px-3 py-2'>
            <AnimatePresence>
                {isCollapsed ? <Collapsed key="collapsed" /> : <Uncollapsed key="uncollapsed" />}
            </AnimatePresence>
        </motion.div>
    );
}

export default MealInfoTile;
