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
    <div className="flex h-full items-center px-4 py-2">
      <div
        className="flex h-full w-full items-center justify-between rounded-xl bg-black-opacity-45 p-4 px-4  text-3xl"
        onClick={() => handleClick(index)}
      >
        <div className="flex w-2/3 flex-col">
          <h1 className="items-center text-lg  text-offwhite">
            {sectionList.name || section.name}
          </h1>
          {isReport && (
            <p className="break-words text-xs text-lightGray">
              {sectionList?.displayInfo.join(', ')}
            </p>
          )}
        </div>
        <div className="text-xs  text-lightGray">
          {isReport && (
            <p id="mc">{sectionList.round ? sectionList.round : '0 round'}</p>
          )}
          {!isReport && (
            <div className="tags flex flex-col items-start justify-center">
              {/* {section.meta?.todaysMetconIntensity &&
                section.meta?.todaysMetconIntensity > 75 && (
                  <span className="bg-[#172339]  p-0.5 text-[10px] text-[#C2D3FA]">
                    {section.meta.todaysMetconIntensity > 100
                      ? 'Elite'
                      : 'Advanced'}{' '}
                    {section.meta.todaysMetconIntensity}%
                  </span>
                )} */}
              {section.movements.length > 0 && (
                <span className="mt-1 text-xs text-floYellow">
                  {section.movements.length}{' '}
                  {section.movements.length > 1 ? 'Movements' : 'Movement'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
