import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import star_bg from "../../assets/images/star_bg.png";
import { IoTimerOutline } from "react-icons/io5";

const Container = styled.div`
height: 104px;
border-radius: 12px;
border: 0.5px solid #383838;
`
const Heading = styled.p`
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 11px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 3px;
text-transform: uppercase;
`

function LifeStyleRoutine({ completionPercentage = 72 }) {
    const navigate = useNavigate();

    
    return (
        <Container className='w-6/12 flex flex-col justify-center items-center gap-1 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: `url(${star_bg})` }} onClick={() => navigate('/lifestyle-routine')}>
            <IoTimerOutline size={40} color={'#B1B1B1'}/>
            <Heading>Routine Tracking</Heading>
        </Container>
    )
}

export default LifeStyleRoutine