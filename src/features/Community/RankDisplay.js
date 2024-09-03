import { FaUserCircle } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Arrow from '../Leaderboard/Arrow';
import ProfilePicture from '../Profile/ProfilePicture';
import { CommunityName } from '../Timeline/StyledComponents';

const RankDisplay = ({
  selectedDataType,
  name,
  rank,
  count,
  rankChange,
  isCurrentUser,
  profilePicture,
}) => {
  const defaultClassName = ` h-[75px]  ${
    isCurrentUser
      ? 'mix-blend-screen bg-[#3C3C3C] bg-opacity-10 leaderboard-user-list-item border-opacity-80 rounded-xl'
      : ''
  } w-full flex flex-row justify-between px-auto`;

  return (
    <Link
      className="flex w-full flex-col   gap-[2px] rounded-xl bg-[rgba(0,0,0,0.45)] px-1 pb-1"
      to={`/leaderboard/${
        selectedDataType === 'workout' ? 'workout' : 'fitness_score'
      } `}
    >
      <h1 className=" flex  h-[32px]  items-center pl-5 text-sm text-offwhite ">
        {selectedDataType === 'workout'
          ? 'Workout leaderboard'
          : 'Fitness Score leaderboard'}
      </h1>
      <div className="flex h-[70px] w-full flex-col justify-center rounded-xl  bg-[rgba(0,0,0,0.40)] px-[11px] py-4">
        <div className="flex w-full flex-row items-center justify-start gap-2 pl-[10px] ">
          <div className="flex basis-[13%] flex-row items-center justify-start text-blue">
            {rank}
          </div>
          {profilePicture !== '' ? (
            <div className="flex h-[30px] w-[40px] rounded-full">
              <ProfilePicture
                inputPic={profilePicture}
                altText={name}
                height={'30px'}
                width={'30px'}
              />
            </div>
          ) : (
            <FaUserCircle size={30} color={'#91BDF6'} />
          )}
          <div className="ml-[5px] basis-4/6 text-lg font-normal text-offwhite">
            {name}
          </div>
          <div className="flex flex-row items-center justify-around px-4">
            <span className="mr-4 flex h-5 w-5 flex-row items-center justify-center text-[21.47px] font-bold  text-offwhite">
              {count}
            </span>
            <Arrow value={rankChange} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RankDisplay;
