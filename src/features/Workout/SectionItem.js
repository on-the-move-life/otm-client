import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionItem = ({ sectionList, index, isReport }) => {
  const [section, setSection] = useState(sectionList[index]);

  const navigate = useNavigate();

  const handleClick = (index) => {
    if (!isReport) {
      navigate('/section-details', { state: { sectionList, index } });
    }
  };

  return (
    <div className="flex items-center px-4 py-2">
      <div
        className="flex h-16 w-full items-center justify-between rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] px-4  text-3xl"
        onClick={() => handleClick(index)}
      >
        <div className="flex flex-col">
          <h1 className="gradient-text items-center text-xl font-bold">
            {sectionList.name || section.name}
          </h1>
          {isReport && (
            <p className="text-xs text-lightGray">
              {sectionList.displayInfo[0]}
            </p>
          )}
        </div>
        <div className="text-xs tracking-widest text-lightGray">
          {isReport && (
            <p id="mc">{sectionList.round ? sectionList.round : '0 round'}</p>
          )}
          {!isReport && (
            <div className="tags flex flex-col items-start justify-center  text-xs">
              <span className="bg-[#172339]  p-0.5 text-[#C2D3FA]">
                Elite - 104%
              </span>
              <span className="mt-1 ">
                {section.movements.length} Movements
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
