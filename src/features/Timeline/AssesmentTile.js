import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'

const AssesmentText = styled.div`
color: var(--White, #FFF);
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 18.166px;
font-style: normal;
font-weight: 500;
line-height: 29.066px; /* 160% */
text-transform: capitalize;
`
const AssesmentPara = styled.div`
width: 131.703px;
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8.477px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const FitnessScore = styled.div`
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 7.266px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 2.725px;
text-transform: uppercase;
`
const Score = styled.div`
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 29.066px;
font-style: normal;
font-weight: 500;
line-height: 36.332px; /* 125% */
`
const ScorePara = styled.div`
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8.477px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const PercentChangeText = styled.div`
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.817px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: 0.196px;
text-transform: lowercase;
`
function AssesmentTile({ currScore, prevScore }) {
    const colors = useMemo(() => ['#5ECC7B', '#FA5757'], [])
    const [color, setColor] = useState(colors[0])
    const [isPostiveChange, setPositiveChange] = useState(true);
    const [percentChange, setPercentChange] = useState('0%');

    useEffect(() => {
        if (currScore >= prevScore) {
            const diff = currScore - prevScore;
            const percentage = (diff / prevScore) * 100;
            setPercentChange(prev => `+${percentage.toFixed(1)}%`);
            setPositiveChange(true);
            setColor(colors[0]);
        }
        else {
            const diff = prevScore - currScore;
            const percentage = (diff / prevScore) * 100;
            setPercentChange(prev => `-${percentage.toFixed(1)}%`);
            setPositiveChange(false);
            setColor(colors[1]);
        }
    }, [currScore, prevScore, colors])
    return (
        <div className='w-full h-[88px] flex flex-row items-center justify-around rounded-[10.9px] border-[1px] border-[#3F3F3F] backdrop-blur-xl mt-1'>
            <div className='w-6/12 flex flex-col justify-center items-start p-2 gap-1'>
                <AssesmentText>Assesment</AssesmentText>
                <AssesmentPara>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</AssesmentPara>
            </div>
            <div className='w-6/12 flex flex-col justify-center items-center gap-1'>
                <FitnessScore>Fitness Score</FitnessScore>
                <div className='flex flex-row items-center justify-center gap-[3px]'>
                    <Score style={{color: color}}>{currScore}</Score>
                    <div className='flex flex-col items-center justify-center'>
                        {
                            isPostiveChange ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M8.70718 0.0652837L1.69513 8.17854C1.48107 8.57691 1.84328 9.04061 2.2819 8.92862L5.01217 8.23162L6.49193 12.9263C7.16618 15.0646 10.1916 15.064 10.8653 12.9263L12.3456 8.23104L15.1371 8.93329C15.5752 9.04353 15.9362 8.581 15.7221 8.18263L8.70718 0.0652837Z" fill="#5ECC7B" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M8.71079 15.7179L15.7228 7.60466C15.9369 7.20629 15.5747 6.74259 15.1361 6.85458L12.4058 7.55158L10.926 2.85686C10.2518 0.718598 7.22637 0.71918 6.5527 2.85686L5.07237 7.55217L2.28084 6.84991C1.84281 6.73967 1.48177 7.2022 1.69583 7.60058L8.71079 15.7179Z" fill="#FA5757" />
                                </svg>
                        }
                        <PercentChangeText style={{color: color}}>{percentChange}</PercentChangeText>
                    </div>
                </div>
                <ScorePara>since last month</ScorePara>
            </div>
        </div>
   )
}

export default AssesmentTile