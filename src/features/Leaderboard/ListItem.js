import React from 'react';
import Arrow from './Arrow';

const ListItem = ({ isCurrentUser, user, mode }) => {
  const { rank, name, code, rankChange } = user;
  const count = mode === 'workout' ? user.workout : user.totalScore;

  const defaultClassName = ` h-70  ${
    isCurrentUser
      ? 'mix-blend-screen bg-[#3C3C3C] bg-opacity-10 leaderboard-user-list-item border-opacity-80 rounded-xl'
      : ''
  } flex flex-row justify-between py-3 px-auto`;

  return (
    <>
      <div className={defaultClassName}>
        <div className="flex flex-row items-center justify-between px-3">
          <span className="flex w-5 flex-row items-center justify-center leaderboard-gradient-text">
            {rank}
          </span>
          <div className="flex flex-row items-center justify-center">
            {/* <img
              className="mx-4 h-8 rounded-full bg-blue"
              src="/assets/lb-ph.png"
              alt={name}
            /> */}
          </div>
          <span className="text-lg font-normal pl-6">{name}</span>
        </div>

        <div className="flex flex-row items-center justify-around px-4">
          <span className="mr-4 flex w-5 h-5 flex-row items-center justify-center text-[21.47px]">
            {count}
          </span>
          <Arrow value={rankChange} />
        </div>
      </div>
      {!isCurrentUser && <div className="w-7/8 h-[0.5] bg-gray-700"></div>}
    </>
  );
};

export default ListItem;
