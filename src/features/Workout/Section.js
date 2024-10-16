import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setIndex } from './WorkoutSlice';

const Section = ({ sectionList, index, isReport, movementId, date }) => {
  const [section, setSection] = useState(sectionList[index]);

  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (index) => {
    dispatch(setIndex(index));

    navigate(
      `/section-details/${params.value}?movementId=${movementId}&date=${date}`,
    );
  };

  return (
    <div className="flex items-center px-4 py-2">
      <div
        className="flex h-fit w-full items-center justify-between rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 px-4  text-3xl"
        onClick={() => handleClick(index)}
      >
        <div className="flex flex-col w-2/3">
          <h1 className="items-center text-lg font-bold workout-gradient-text">
            {sectionList.name || section.name}
          </h1>
          {isReport && (
            <p className="text-xs break-words text-lightGray">
              {sectionList?.displayInfo.join(', ')}
            </p>
          )}
        </div>
        <div className="text-xs tracking-widest text-lightGray">
          {isReport && (
            <p id="mc">{sectionList.round ? sectionList.round : '0 round'}</p>
          )}
          {!isReport && (
            <div className="flex flex-col items-start justify-center tags">
              {section.meta?.todaysMetconIntensity &&
                section.meta?.todaysMetconIntensity > 75 && (
                  <span className="bg-[#172339]  p-0.5 text-[10px] text-[#C2D3FA]">
                    {section.meta.todaysMetconIntensity > 100
                      ? 'Elite'
                      : 'Advanced'}{' '}
                    {section.meta.todaysMetconIntensity}%
                  </span>
                )}
              <span className="mt-1 text-xs tracking-widest">
                {section.movements.length} Movements
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
