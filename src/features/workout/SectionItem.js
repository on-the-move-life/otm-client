import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionItem = ({ sectionList, index, isReport }) => {
  const [section, setSection] = useState(sectionList[index]);

  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate('/section-details', { state: { sectionList, index } });
  };

  if (index == 0) {
    return <p></p>;
  }
  return (
    <>
      {section && (
        <div
          className="mt-5 h-[72px] w-[358px] rounded-[12px] border-[0.5px] border-[#383838] border-[solid] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)]"
          onClick={() => handleClick(index)}
        >
          <p className="relative left-4 top-4 text-[24px] font-[SF_Pro_Display] font-medium not-italic leading-[40px]">
            {section.name}
          </p>
          <div className="relative left-60 top-[-15px] text-[12px] font-[SF_Pro_Display] font-semibold not-italic leading-[normal]">
            {isReport && (
              <>
                <p id="mc">{section.rounds || 0} rounds</p>
                <span>
                  <img src="./assets/greenTick.svg" />
                </span>
                <p>{section.displayInfo}</p>
              </>
            )}
            {!isReport && (
              <>
                <p id="mc">{section.movements.length} movements</p>
                <p id="format">{section.format}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SectionItem;
