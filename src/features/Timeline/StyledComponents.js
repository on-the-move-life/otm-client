import styled from 'styled-components'

const Container = styled.div`
width: auto;
height: auto;
flex-shrink: 0;
border-radius: 10.9px;
border: 1px solid #3F3F3F;
`
const WorkoutTileHeading = styled.div`
color: var(--White, #FFF);
text-shadow: 0px 2.725px 2.725px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 18.166px;
font-style: normal;
font-weight: 500;
line-height: 29.066px; /* 160% */
text-transform: capitalize;
`
const TimelineHeading = styled.h1`
color: var(--White, #FFF);
text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: 40px; /* 125% */
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
const Feedback = styled.p`
width: auto;
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8.477px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const Name = styled.div`
color: var(--New-purple, #A680DD);
text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 32px; /* 160% */
text-transform: capitalize;
`
const InfoTile = styled.p`
display: flex;
padding: 2px 8px;
justify-content: center;
align-items: center;
gap: 2px;
border-radius: 4px;
border: 1px solid rgba(255, 255, 255, 0.23);
background: rgba(59, 59, 59, 0.06);
`

const Date = styled.div`
color: var(--New-White, var(--White, #FFF));
text-shadow: 0px 2.26px 2.26px rgba(0, 0, 0, 0.15);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 15.068px;
font-style: normal;
font-weight: 500;
line-height: 24.11px; /* 160% */
text-transform: capitalize;
`
const TagText = styled.p`
color: #000;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 12px;
font-style: normal;
font-weight: 590;
line-height: normal;
letter-spacing: -0.36px;
text-transform: capitalize;
`
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

const PercentChangeText = styled.div`
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.817px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: 0.196px;
text-transform: lowercase;
`

export { Container, WorkoutTileHeading, TimelineHeading, Rounds, Feedback, Name, InfoTile, Date, TagText, AssesmentPara, AssesmentText, FitnessScore, Score, PercentChangeText }