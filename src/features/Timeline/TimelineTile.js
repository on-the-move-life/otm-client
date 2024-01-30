import React from 'react';
import styled from 'styled-components';

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
const InfoTile = styled.span`
display: flex;
padding: 2px 8px;
justify-content: center;
align-items: center;
gap: 2px;
border-radius: 4px;
border: 1px solid var(--New-Gray, #383838);
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
const TimelineTile = () => {
  return (
    <div className="flex flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
      <Name>Rishi Solanki #1</Name>

      <Date>10th Dec</Date>
      <div className="timeline-tags flex flex-row space-x-3 text-xs my-2">
        <InfoTile>Horizontal Pull</InfoTile>
        <InfoTile>11:30 AM</InfoTile>
        <InfoTile>700Kcal</InfoTile>
      </div>
    </div>
  );
};

export default TimelineTile;
