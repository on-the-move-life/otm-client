import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import star_bg from "../../assets/images/star_bg.png";

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
const SubHeading = styled.p`
color: var(--Light-gray, #000);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 1px;
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
      <Heading className='text-center'>Lifestyle Design</Heading>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 23" fill="none" className='my-[3px]'>
        <path d="M18.6625 8.24936L21.0685 8.1029C19.3439 3.55101 14.3924 0.958414 9.56483 2.24743C4.42306 3.62034 1.36895 8.8767 2.74328 13.9878C4.11761 19.099 9.39996 22.1294 14.5417 20.7565C18.3594 19.7371 21.0262 16.5769 21.584 12.9247" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 7.66797V11.5013L13.9167 13.418" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <SubHeading className='text-center'>Track Your Routine</SubHeading>
    </Container>
  )
}

export default LifeStyleRoutine