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

const Community = () => {
  const [fitnessScoreData, setFitnessScoreData] = useState([]);
  const [workoutCountData, setWorkoutCountData] = useState([]);
  const [loadingFitnessScore, setLoadingFitnessScore] = useState(true);
  const [loadingWorkoutCount, setLoadingWorkoutCount] = useState(true);
  const [userData, setUserData] = useState(null);
  const [communityloading, setCommunityLoading] = useState(false);
  const [personalLoading, setPersonalLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];

  const { getUserFromStorage, user } = useAuth();
  const navigate = useNavigate();
  const { value } = useParams();

  useEffect(() => {
    setCommunityLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    TimelineAxiosClient.get(`?type=community&page=${page}&email=${user.email}`)
      .then((res) => {
        setData((prev) => res?.data);
        setCommunityLoading(false);
      })
      .catch((err) => {
        setError(true);
        setCommunityLoading(false);
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    setPersonalLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    TimelineAxiosClient.get(
      `?type=personal&name=${user?.name}&page=${page}&email=${user?.email}`,
    )
      .then((res) => {
        setUserData((prev) => res?.data);
        setPersonalLoading(false);
      })
      .catch((err) => {
        setError(true);
        setPersonalLoading(false);
        console.log(err);
      });
  }, [page]);

  async function getFitnessScoreData() {
    // API call for fitnessScoreData
    try {
      const res = await axiosClient.get('/fitnessScore');
      if (res.data) {
        const data = res.data;
        setFitnessScoreData(data);
      }
    } catch (error) {
      console.error('Error fetching fitnessScoreData:', error);
    } finally {
      setLoadingFitnessScore(false);
    }
  }

  async function getWorkoutCountData() {
    // API call for workoutCountData
    try {
      const res = await axiosClient.get('/consistency');
      if (res.data) {
        const data = res.data;
        setWorkoutCountData(data);
      }
    } catch (error) {
      console.error('Error fetching workoutCountData:', error);
    } finally {
      setLoadingWorkoutCount(false);
    }
  }

  useEffect(() => {
    if (user === null) {
      getUserFromStorage();
    }
  }, []);

  useEffect(() => {
    console.log('user : ', user);
    if (user) {
      console.log('user : ', user);
      setLoadingFitnessScore(true);
      setLoadingWorkoutCount(true);
      getFitnessScoreData();
      getWorkoutCountData();
    }
  }, [user]);

  if (
    !user ||
    loadingFitnessScore ||
    loadingWorkoutCount ||
    communityloading ||
    personalLoading
  ) {
    return <Loader />;
  }

  const matchingWorkoutUser = workoutCountData.rankList?.find(
    (entry) => entry.code === user.code,
  );

  const matchingFitnessUser = fitnessScoreData.rankList?.find(
    (entry) => entry.code === user.code,
  );

  return (
    <div>
      <img className="absolute -z-10  w-full " src="/assets/community-bg.svg" />

      <div className=" w-screen grow overflow-scroll px-4 pb-[78px]">
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
          {data !== null && data.data.length > 0 && (
            <div className="mb-3 mt-7 text-[20px] text-offwhite">Community</div>
          )}
          <div className=" flex w-full flex-col gap-2">
            {data !== null && data.data.length > 0 && (
              <TimelineDisplay data={data.data[0]} timeline={'community'} />
            )}
            {userData !== null && userData.data.length > 0 && (
              <TimelineDisplay data={userData.data[0]} timeline={'personal'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
