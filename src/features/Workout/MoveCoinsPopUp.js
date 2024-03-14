import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Heading = styled.div`
color: var(--Light-purple, #D6B6F0);
text-shadow: 0px 3.9px 3.9px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 26px;
font-style: normal;
font-weight: 500;
line-height: 41.6px; /* 160% */
text-transform: capitalize;
`
const Description = styled.p`
color: var(--New-White, rgba(255, 255, 255, 0.56));

/* Body condensed bold */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const Instruction = styled.p`
color: rgba(255, 255, 255, 0.56);
text-align: center;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const RedeemButton = styled.div`
width: 100%;
border-radius: 12px;
background: var(--Gradient-purple, linear-gradient(95deg, #D6B6F0 2.94%, #7E87EF 96.92%));
mix-blend-mode: screen;
`
function MoveCoinsPopUp({ setShowPopUp, coins }) {
    const navigate = useNavigate();
    return (
        <motion.div
            className='w-full h-fit bg-black/50 backdrop-blur-lg rounded-t-lg flex flex-col justify-start items-center p-3 gap-7 fixed left-0 bottom-0 z-[1000]'
            initial={{ y: "100vh" }} // Start from the bottom of the view
            animate={{ y: 0 }} // Animate to its original position
            exit={{ y: "100vh" }} // Slide down on exit
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.7 }} // Optional: Set the type of transition
        >
            <div className='w-full flex flex-col justify-center items-center gap-1'>
                <img src={"/assets/coins_popup_bg.svg"} alt="coins" />
                <Heading>Movecoins Earned!!</Heading>
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-3'>
                <Description className='flex flex-row gap-1'>You earned <span className='flex flex-row gap-1 bg-gradient-to-tr from-[#D6B6F0] to-[#7E87EF] text-black font-extrabold px-2 rounded-sm'><img src={"/assets/otm-logo.svg"} alt="logo" />{coins}</span> Movecoins!</Description>
                <Instruction>Redeem your coins on your next purchase and save</Instruction>
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-1'>
                <RedeemButton className='h-10 flex flex-row justify-center items-center text-black text-[18px]' onClick={() => navigate('/marketplace')}>REDEEM NOW</RedeemButton>
                <Button text={"SKIP"} action={() => setShowPopUp(false)} />
            </div>
        </motion.div>
    )
}

export default MoveCoinsPopUp