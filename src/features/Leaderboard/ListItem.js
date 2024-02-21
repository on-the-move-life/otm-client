import React from 'react';
import Arrow from './Arrow';
import { FaUserCircle } from 'react-icons/fa';
import ProfilePicture from '../Profile/ProfilePicture';

const ListItem = ({ isCurrentUser, user, mode }) => {
  const { rank, name, code, rankChange, profilePicture } = user;
  const count = mode === 'workout' ? user.workout : user.totalScore;

  const defaultClassName = ` h-[75px]  ${isCurrentUser
      ? 'mix-blend-screen bg-[#3C3C3C] bg-opacity-10 leaderboard-user-list-item border-opacity-80 rounded-xl'
      : ''
    } w-full flex flex-row justify-between px-auto`;

  return (
    <div className='w-full border-b-[0.5px] border-gray-600'>
      <div className={defaultClassName}>
        <div className="w-full flex flex-row items-center justify-start px-3 gap-2">
          <div className="basis-1/6 flex flex-row items-center justify-start leaderboard-gradient-text">
            {rank}
          </div>
          {
            profilePicture !== '' ?
            <div className="w-fit h-fit flex flex-row items-center justify-center">
              <ProfilePicture inputPic={profilePicture} altText={name} height={'40px'} width={'40px'}/>
            </div> :
            <FaUserCircle size={40} color={'#91BDF6'} />
          }
          <div className="basis-4/6 text-lg font-normal ml-[5px]">{name}</div>
        </div>

        <div className="flex flex-row items-center justify-around px-4">
          <span className="mr-4 flex w-5 h-5 flex-row items-center justify-center text-[21.47px]">
            {count}
          </span>
          <Arrow value={rankChange} />
        </div>
      </div>
      {!isCurrentUser && <div className="w-7/8 h-[0.5] bg-gray-700"></div>}

    </div>
  );
};

export default ListItem;
