import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion';

const Container = styled.div`
height: 104px;
border-radius: 12px;
border: 0.5px solid #383838;
background: linear-gradient(180deg, #171717 0%, #0F0F0F 100%);
`
const Heading = styled.p`
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 3px;
text-transform: uppercase;
`
const Rank = styled.div`
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: 40px;
background: var(--Green-purple-gradient, linear-gradient(96deg, #9BF2C0 1.49%, #91BDF6 103.49%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
const TotalParticipants = styled.div`
color: #545454;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.333px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
function LifeStyleScore({ completionPercentage = 72 }) {
    let gradient;

    if (completionPercentage <= 50) {
        gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 100%)';
    } else if (completionPercentage <= 80) {
        gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 100%)';
    } else {
        gradient = 'linear-gradient(90deg, #FA5757 0%, #F5C563 50%, #7E87EF 80%, #5ECC7B 100%)';
    }
    const ProgressBar = ({ progress }) => {
        return (
            <div className="w-full h-2 bg-[#1C1C1E] rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: gradient, width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                >


                </motion.div>
                <span className="text-white font-bold">{progress}%</span>
                <div className="w-6 h-6 bg-white border-2 border-gray-400 rounded-full ml-2"></div>
            </div>
        )
    }

    return (
        <Container className='w-6/12 flex flex-col justify-center items-center gap-1'>
            <Heading>Perfect Day</Heading>
            <Rank>{completionPercentage}%</Rank>
            <TotalParticipants>Of your perfect day complete</TotalParticipants>
            <div className='w-full px-3'>
                <ProgressBar progress={completionPercentage} />
            </div>
        </Container>
    )
}

export default LifeStyleScore