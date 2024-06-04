import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import star_bg from "../../assets/images/star_bg.png";
import { IoTimerOutline } from "react-icons/io5";

const Heading = styled.p`
color: var(--Light-gray, #000);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 11px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 3px;
text-transform: uppercase;
`
const Container = styled.div`
  height: 104px;
  border-radius: 12px;
  border: 0.5px solid #383838;
  background-image: url(${star_bg}), linear-gradient(#9274AA, #EBD2FF);
  background-position: bottom, left;
  background-repeat: no-repeat, repeat;
  background-size: contain, auto;
`

function LifeStyleRoutine() {
  const navigate = useNavigate();

  return (
    <Container className='w-6/12 flex flex-col justify-center items-center gap-1' onClick={() => navigate('/lifestyle-routine')}>
      <IoTimerOutline size={40} color={'#000'}/>
      <Heading>Track our Routine</Heading>
    </Container>
  )
}

export default LifeStyleRoutine