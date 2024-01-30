import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
width: auto;
height: 106.271px;
flex-shrink: 0;
border-radius: 10.9px;
border: 1px solid #3F3F3F;
backdrop-filter: blur(34.061134338378906px);
`
const Heading = styled.div`
color: var(--White, #FFF);
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 18.166px;
font-style: normal;
font-weight: 500;
line-height: 29.066px; /* 160% */
text-transform: capitalize;
`

const Rounds = styled.div`
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 7.266px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 2.725px;
text-transform: uppercase;
`
const Feedback = styled.div`
width: 128.978px;
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8.477px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
function WorkoutTile() {
    const GreenTick = ({ className }) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none" className={className}>
                <g filter="url(#filter0_d_2413_3554)">
                    <circle cx="12.701" cy="10.4403" r="7.72052" fill="#5ECC7B" />
                    <circle cx="12.7012" cy="10.4404" r="9.08297" stroke="#5ECC7B" stroke-width="0.908297" />
                    <path d="M15.8815 8.16992L11.1398 12.9385L9.52344 11.313" stroke="black" stroke-width="1.3246" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <filter id="filter0_d_2413_3554" x="0.439172" y="0.90332" width="24.524" height="24.524" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2.72489" />
                        <feGaussianBlur stdDeviation="1.36245" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2413_3554" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2413_3554" result="shape" />
                    </filter>
                </defs>
            </svg>
        )
    }
    return (
        <Container className='relative w-full flex flex-col justify-start items-start gap-3 p-2'>
            <div className='flex flex-col justify-center items-center gap-1'>
                <Heading>Mobility</Heading>
                <Rounds>2 Rounds</Rounds>
            </div>
            <Feedback>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Feedback>
            <GreenTick className={'absolute top-[6px] right-[6px]'} />
        </Container>
    )
}

export default WorkoutTile