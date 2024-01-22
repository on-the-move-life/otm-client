import React from 'react';
import Arrow from './Arrow';

const LeaderboardItem = ({ imgUrl, isLoggedInUser, user, mode }) => {
  const { rank, name, code, rankChange } = user;
  const count = mode === 'workout' ? user.workout : user.totalScore;

  const defaultClassName = ` h-[70px] mix-blend-screen bg-neutral-700 bg-opacity-10 ${
    isLoggedInUser
      ? 'border border-purple-300 border-opacity-80 rounded-xl'
      : ''
  } flex flex-row justify-between p-4`;

  return (
    <>
      <div className={defaultClassName}>
        <div className="flex flex-row items-center justify-between px-4 ">
          <span>{rank}</span>
          <img
            className="mx-4 h-8 rounded-full bg-blue"
            src={imgUrl}
            alt={name}
          />
          <span>{name}</span>
        </div>

        <div className="flex flex-row items-center justify-around px-4 ">
          <span className="mr-4">{count}</span>
          <Arrow value={rankChange} />
        </div>
      </div>
      {!isLoggedInUser && <div className="w-7/8 h-[0.1px] bg-gray-700"></div>}
    </>
  );
};

export default LeaderboardItem;
