import React from 'react'

function CalendarTile({ date, day, isSelected }) {
  return (
    <div className='min-w-[50px] max-w-[70px] min-h-[54px] max-h-[74px] rounded-[7.5px] bg-[#1C1C1E] flex flex-col justify-center items-center gap-1'>
        <div className='w-full flex flex-col justify-start items-center'>
            {isSelected && <div className='w-[4px] h-[4px] rounded-full bg-gray-400'></div>}
            <h3 className="capitalize" style={{fontSize: '14.87px', lineHeight: '17.75px', color: isSelected ? '#848CE9' : '#929292'}}>{day}</h3>
        </div>
        <h4 style={{fontSize: '17.85px', lineHeight: '21.3px', color: '#f8f8f8'}}>{date}</h4>
    </div>
  )
}

export default CalendarTile