import React from 'react';
import ListItem from './ListItem';

const List = ({ data }) => {
  return (
    <div>
      {data.map((d, index) => (
        <ListItem key={index} item={d} />
      ))}
    </div>
  );
};

export default List;
