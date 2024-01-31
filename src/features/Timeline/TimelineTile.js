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
const TimelineTile = ({ name, dateTime='1/30/2024 02:23 PM', kcal, workoutName, currScore, prevScore, sectionPerformance, ref }) => {
  const tags = useMemo(() => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'], [])
  const colors = useMemo(() => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'], [])
  const [tag, setTag] = useState(tags[0]);
  const [color, setColor] = useState(colors[0]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  function formatDateTime(inputDateTime) {
    const [datePart, timePart, ampm] = inputDateTime.split(' ');
    const [month, day, year] = datePart.split('/');
    
    const formattedDate = `${addOrdinalSuffix(parseInt(day))} ${getMonthName(parseInt(month))}`;
    const formattedTime = `${timePart} ${ampm}`;
  
    return [formattedDate, formattedTime]
  }
  
  function getMonthName(month) {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[month - 1];
  }

  function addOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
  

  useEffect(() => {
    const formattedDateTime = formatDateTime(dateTime);
    setDate(formattedDateTime[0]);
    setTime(formattedDateTime[1]);
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
  }, [currScore, colors, tags, dateTime])

  return (
    <div className="flex flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4" ref={ref}>
      <div className='w-full flex flex-row items-center justify-between'>
        <Name>{name}</Name>
        <div style={{ backgroundColor: color }} className='h-fit w-fit px-[5px] py-[1px] flex flex-row justify-center items-center rounded-[4px]'>
          <TagText>{tag}</TagText>
        </div>
      </div>

      <Date>{date}</Date>
      <div className="timeline-tags flex flex-row space-x-3 text-xs my-2">
        {/* <InfoTile>Horizontal Pull</InfoTile> */}
        <InfoTile>{time}</InfoTile>
        {/* <InfoTile>700Kcal</InfoTile> */}
      </div>
      {
        sectionPerformance?.map((workout, index) => {
          if(workout?.name === 'Assessment'){
            return(
              <AssesmentTile currScore={currScore} prevScore={prevScore} assessmentFeedback={workout?.displayInfo}/>
            )
          }
        })
      }
      <div className="mt-8 grid grid-cols-1 gap-4">
        {
          sectionPerformance?.map((workout, index) => {
            if(index !== 0){
              return(
                <WorkoutTile workoutName={workout?.name} rounds={workout?.round} feedback={workout?.displayInfo} workoutCompleted={workout?.completed} key={index}/>
              )
            }
          })
        }
      </div>
    </div>
  );
};

export default TimelineTile;
