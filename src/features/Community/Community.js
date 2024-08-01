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
      <img className="absolute right-0 -z-20 " src="/assets/main-frame.svg" />
      <img
        className="absolute right-[35px] top-7 -z-10 "
        src="/assets/community-logo.svg"
      />

      <div className=" w-screen grow overflow-scroll px-4 pb-[78px]">
        <div className="mt-[76px]">
          <TimelineHeading>Community</TimelineHeading>
        </div>
        <div>
          <div className="flex flex-col w-full gap-2 mt-7">
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
          <div className="flex flex-col w-full gap-2 mt-7">
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
