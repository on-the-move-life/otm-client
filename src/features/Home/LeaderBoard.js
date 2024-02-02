import React from 'react'
import styled from 'styled-components'

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
const TotalParticipantsHighlighted = styled.span`
background: var(--Green-purple-gradient, linear-gradient(96deg, #9BF2C0 1.49%, #91BDF6 103.49%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.333px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
function LeaderBoard({rank, totalParticipants}) {
  return (
    <Container className='w-6/12 flex flex-col justify-center items-center gap-2'>
        <Heading>LeaderBoard</Heading>
        <Rank># {rank}</Rank>
        <TotalParticipants>Of <TotalParticipantsHighlighted>{totalParticipants}</TotalParticipantsHighlighted> participants</TotalParticipants>
    </Container>
  )
}

export default LeaderBoard