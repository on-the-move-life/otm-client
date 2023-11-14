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
        className="flex h-16 w-full items-center justify-between rounded-xl border   border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] px-4  text-3xl"
        onClick={() => handleClick(index)}
      >
        <h1 className="metallic-gradient-text text-xl font-bold">
          {sectionList.name || section.name}
        </h1>
        {isReport && (
          <p className=" text-lightGray">{sectionList.displayInfo[0]}</p>
        )}
        <div className="p-2 text-xs">
          {isReport && (
            <p id="mc">{sectionList.round ? sectionList.round : '0 round'}</p>
          )}
          {!isReport && (
            <>
              <p id="mc">{section.movements.length} movements</p>
              <p id="format">{section.format}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
