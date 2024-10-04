import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { axiosClient } from '../Leaderboard/apiClient';
import Arrow from '../Leaderboard/Arrow';
import RankDisplay from './RankDisplay';
import TimelineDisplay from './TimelineDisplay';
import { axiosClient as TimelineAxiosClient } from '../Timeline/apiClient';
import { TimelineHeading } from '../Timeline/StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTimelineCommunityDetails,
  fetchTimelinePersonalDetails,
} from '../../store/actions/timeline.action';
import {
  fetchLeaderboardConsistencyDetails,
  fetchLeaderboardFitnessDetails,
} from '../../store/actions/leaderboard.action';

const Community = () => {
  const [page, setPage] = useState(1);
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];
  const getTimeline = useSelector((state) => state.timeline);
  const getLeaderBoard = useSelector((state) => state.leaderboard);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const otmUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log('user : ', user);
    if (user) {
      console.log('user : ', user);
      if (getTimeline.communityDetail === null) {
        dispatch(
          fetchTimelineCommunityDetails({
            user: otmUser,
            page,
            type: 'community',
          }),
        );
      }

      if (getTimeline.personalDetail === null) {
        dispatch(
          fetchTimelinePersonalDetails({
            user: otmUser,
            page,
            type: 'personal',
          }),
        );
      }

      if (getLeaderBoard.fitnessScoreDetail === null) {
        dispatch(fetchLeaderboardFitnessDetails('fitnessScore'));
      }

      if (getLeaderBoard.consistencyDetail === null) {
        dispatch(fetchLeaderboardConsistencyDetails('consistency'));
      }
    }
  }, [user]);

  if (
    !user ||
    getLeaderBoard.fitnessScoreLoading ||
    getLeaderBoard.consistencyLoading ||
    getTimeline.personalLoading ||
    getTimeline.communityLoading
  ) {
    return <Loader />;
  }

  const matchingWorkoutUser = getLeaderBoard?.consistencyDetail?.rankList?.find(
    (entry) => entry.code === user.code,
  );

  const matchingFitnessUser =
    getLeaderBoard?.fitnessScoreDetail?.rankList?.find(
      (entry) => entry.code === user.code,
    );

  return (
    <div>
      <img className="absolute -z-10  w-full " src="/assets/community-bg.svg" />

      <div className=" h-screen w-screen grow overflow-y-scroll px-4 pb-[95px]">
        <div className="mt-[76px]">
          <h3 className=" font-sfpro text-[14px] text-offwhite">
            Good Morning {firstName}
          </h3>

          <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
            Community
          </h2>

          <div className="font-sfpro text-[14px] text-white-opacity-50">
            Everyday is an opportunity to do some main character shit.
          </div>
        </div>
        <div>
          {matchingWorkoutUser && (
            <div className="mb-3 mt-7 text-[20px] text-offwhite">
              Leaderboard
            </div>
          )}
          <div className=" flex w-full flex-col gap-2">
            {matchingWorkoutUser && (
              <RankDisplay
                selectedDataType="workout"
                name={matchingWorkoutUser?.name}
                count={matchingWorkoutUser?.workout}
                rankChange={matchingWorkoutUser?.rankChange}
                rank={matchingWorkoutUser?.rank}
                profilePicture={matchingWorkoutUser?.profilePicture}
                isCurrentUser
              />
            )}

            {matchingFitnessUser && (
              <RankDisplay
                name={matchingFitnessUser?.name}
                count={matchingFitnessUser?.totalScore}
                rankChange={matchingFitnessUser?.rankChange}
                rank={matchingFitnessUser?.rank}
                profilePicture={matchingFitnessUser?.profilePicture}
                isCurrentUser
              />
            )}
          </div>
          {getTimeline.personalDetail !== null &&
            getTimeline.personalDetail.data.length > 0 && (
              <div className="mb-3 mt-7 text-[20px] text-offwhite">
                Timeline
              </div>
            )}
          <div className=" flex w-full flex-col gap-2">
            {getTimeline.personalDetail !== null &&
              getTimeline.personalDetail.data.length > 0 && (
                <TimelineDisplay
                  data={getTimeline.personalDetail.data[0]}
                  timeline={'personal'}
                />
              )}
            {getTimeline.communityDetail !== null &&
              getTimeline.communityDetail.data.length > 0 && (
                <TimelineDisplay
                  data={getTimeline.communityDetail.data[0]}
                  timeline={'community'}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
