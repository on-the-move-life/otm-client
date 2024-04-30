import React, { useMemo, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useTagAndColor } from '../../../hooks/useTagAndColor';

const HorizontalBar = styled.div`
    --color: ${props => props.color};
    width: ${props => `${props.width}px`};
    height: 12px;
    border-radius: 6px;
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

// Score Indicator component
const ScoreIndicator = ({score = 23}) => {
    const tags = useMemo(() => ['Underweight', 'Normal Weight', 'Overweight', 'Obese'], []);
    const colors = useMemo(() => ['#DDF988', '#5ECC7B', '#F5C563', '#FA5757'], []);
    const [tagColorPosition, setTagAndColorPosition] = useState([tags[0], colors[0], 0, colors, tags]);

    const setTagAndColorAndPosition = useCallback((score) => {
        let index = 0;
        if(score < 18.5) index = 0;
        else if(score >= 18.5 && score < 25) index = 1;
        else if(score >= 25 && score < 29.9) index = 2;
        else index = 3;
        const position = (score / 10) * 100 + index;

        return [tags[index], colors[index], position];
        
    }, [colors, tags])

    useEffect(() => {
        try {
            const [tag, color, position] = setTagAndColorAndPosition(score);
            setTagAndColorPosition([tag, color, position, colors, tags]);
        }
        catch (e) {
            console.log("error : ", e);
            const position = 0;
            setTagAndColorPosition([tags[0], colors[0], position, colors, tags]);
        }
    }, [score, colors, tags, setTagAndColorAndPosition])

    // Indicator component
    const Indicator = ({ style, bgColor }) => {
        return (
            <div style={{...style, backgroundColor: bgColor}} className={`relative w-[18px] h-[18px] rounded-full flex justify-center items-center`}>
                <div className='w-[12px] h-[12px] rounded-full bg-white'></div>
            </div>
        )
    }

    // function to return the width of the horizontal bar accrding to the range of BMI
    const getWidth = (index) => {
        // consdering 10 units correspons to the width of 84px
        if(index === 0){
            return Math.floor((18.5/10)*84);
        }
        else if(index === 1){
            return Math.floor(((25-18.5)/10)*84);
        }
        else if(index === 2) return Math.floor(((29.9-25)/10)*84);
        else return 84;
    }

    return (
        <div className='relative w-full flex flex-col items-center justify-center gap-4'>
            <div style={{ backgroundColor: "red", position: 'absolute', left: `${tagColorPosition[2]}px`, top: "-20px" }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
                <TagText>{"hello"}</TagText>
            </div>

            <div className='w-fit relative'>
                <Indicator style={{ position: 'absolute', left: `${tagColorPosition[2]}px`, top: "-3px" }} bgColor={'red'}/>
                <div className='w-fit flex flex-row justify-center items-center gap-[1px]'>
                    {
                        [...Array(4)].map((_, index) => {
                            const width = getWidth(index);
                            return (
                                <HorizontalBar color={colors[index]} key={Math.random() * 1000} width={width}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ScoreIndicator