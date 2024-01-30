import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import AssesmentTile from './AssesmentTile';
import WorkoutTile from './WorkoutTile'

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
backdrop-filter: blur(17px);
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
const TimelineTile = ({ name, date, time, kcal, workoutName, currScore, prevScore }) => {
  const tags = useMemo(() => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'], [])
  const colors = useMemo(() => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'], [])
  const [tag, setTag] = useState(tags[0]);
  const [color, setColor] = useState(colors[0]);
  useEffect(() => {
    if (currScore >= 0 && currScore < 2) {
      setTag(tags[0]);
      setColor(colors[0]);
    }
    else if (currScore >= 2 && currScore < 4) {
      setTag(tags[1]);
      setColor(colors[1]);
    }
    else if (currScore >= 4 && currScore < 6) {
      setTag(tags[2]);
      setColor(colors[2]);
    }
    else if (currScore >= 6 && currScore < 8) {
      setTag(tags[3]);
      setColor(colors[3]);
    }
    else {
      setTag(tags[4]);
      setColor(colors[4]);
    }
  }, [currScore, colors, tags])
  return (
    <div className="flex flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
      <div className='w-full flex flex-row items-center justify-between'>
        <Name>Rishi Solanki</Name>
        <div style={{ backgroundColor: color }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
          <TagText>{tag}</TagText>
        </div>
      </div>

      <Date>10th Dec</Date>
      <div className="timeline-tags flex flex-row space-x-3 text-xs my-2">
        <InfoTile>Horizontal Pull</InfoTile>
        <InfoTile>11:30 AM</InfoTile>
        <InfoTile>700Kcal</InfoTile>
      </div>
      <AssesmentTile currScore={currScore} prevScore={prevScore}/>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <WorkoutTile/>
        <WorkoutTile/>

      </div>
    </div>
  );
};

export default TimelineTile;
