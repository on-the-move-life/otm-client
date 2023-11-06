import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionItem = ({ sectionList, index }) => {
  const [section, setSection] = useState(sectionList[index]);

  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '250px',
    backgroundColor: 'grey',
    margin: '5px',
  };

  const leftStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const handleClick = (index) => {
    navigate('/section-details',{ state: {sectionList, index}});
  };

  return (
    <div style={containerStyle} onClick={()=>handleClick(index)}>
      <p id="name">{section.name}</p>
      <div style={leftStyle}>
        <p id="format">{section.format}</p>
        <p id="mc">{section.movements.length} movements</p>
      </div>
    </div>
  );
};

export default SectionItem;
