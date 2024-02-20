import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

const Container = styled.div`
width: auto;
height: 104px;
flex-shrink: 0;
border-radius: 12px;
border: 0.5px solid #383838;
background: linear-gradient(180deg, #171717 0%, #0F0F0F 100%);
padding: 10px 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: start;
gap: 15px;
`
const Heading = styled.div`
color: var(--Light-gray, #B1B1B1);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 8px;
font-style: normal;
font-weight: 510;
line-height: normal;
letter-spacing: 3px;
text-transform: uppercase;
`
const Score = styled.div`
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
const ScoreDetail = styled.div`
color: #545454;
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.333px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const Percentile = styled.span`
background: var(--Green-purple-gradient, linear-gradient(96deg, #9BF2C0 1.49%, #91BDF6 103.49%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
/* Card body */
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
font-size: 9.333px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const HorizontalBar = styled.div`
    --color: ${props => props.color};
    width: 20px;
    height: 3px;
    border-radius: 5px;
    background: var(--color);
`;

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
// function to return the tag, color, and position based on the current score
export const setTagAndColor = (score, tags, colors) => {
    let index;
    let position;
    
    if (score >= 0 && score < 2) {
        index = 0;
    } else if (score >= 2 && score < 4) {
        index = 1;
    } else if (score >= 4 && score < 6) {
        index = 2;
    } else if (score >= 6 && score < 8) {
        index = 3;
    } else {
        index = 4;
    }

    position = (score / 10) * 100 + index;
    console.log("score : ", score, "tags : ", tags[index], "colors : ", colors[index]);

    return [tags[index], colors[index], position];
}

function FitnessScore({ score, percentile }) {
    const Indicator = ({ style }) => {
        return (
            <div style={style} className='relative'>
                <div className='w-[1px] h-[8px] bg-white'></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 2 2" className='absolute bottom-0 left-[-2px]'>
                    <polygon points="0,2 1,0 2,2" fill="white" />
                </svg>
            </div>
        )
    }
    const ScoreIndicator = ({ score }) => {
        const tags = useMemo(() => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'], [])
        const colors = useMemo(() => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'], [])
        const [tag, setTag] = useState(tags[0]);
        const [color, setColor] = useState(colors[0]);
        const [indicatorPosition, setIndicatorPosition] = useState(0)

        useEffect(() => {
            try{
                const [tag, color, position] = setTagAndColor(score, tags, colors);
                console.log("tag : ", tag, "color : ", color, "position : ", position)
                setIndicatorPosition(position);
                setTag(tag);
                setColor(color);
            }
            catch(e){
                console.log("error : ", e);
                const position = 0;
                setIndicatorPosition(position);
                setTag(tags[0]);
                setColor(colors[0]);
            }
        }, [score, colors, tags])

        return (
            <div className='w-full flex flex-col items-center justify-center gap-4'>
                <div style={{ backgroundColor: color }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
                    <TagText>{tag}</TagText>
                </div>

                <div className='w-fit relative'>
                    <Indicator style={{ position: 'absolute', left: `${indicatorPosition}px` }} />
                    <div className='w-fit flex flex-row justify-center items-center gap-[1px]'>
                        {
                            [...Array(5)].map((_, index) => {
                                return (
                                    <HorizontalBar color={colors[index]} key={index} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Container>
            <div className='w-full flex flex-row justify-between items-center'>
                <div className='w-6/12 flex flex-col justify-center items-center gap-2'>
                    <Heading>Fitness Score</Heading>
                    {score ? <Score>{score}</Score> : <Score>-</Score>}
                    <ScoreDetail>Top <Percentile>{percentile}%</Percentile> of the community</ScoreDetail>
                </div>
                <div className='w-6/12 flex flex-col justify-center items-center gap-2'>
                    <ScoreIndicator score={score}></ScoreIndicator>
                </div>
            </div>
        </Container>
    )
}

export default FitnessScore;