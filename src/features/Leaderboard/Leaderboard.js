import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Loader from '../../components/Loader';
import { useAuth } from '../../contexts/AuthContext';
import List from './List';

const imgUrl =
  'https://s3-alpha-sig.figma.com/img/2e7c/0b19/b615cd1f932cd1924a9842e4132a9d6b?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gQvc8JF1x29HbTnGuCgaANyI7U~ir15x1Sjg1BupyF226FJDdePjFFCYGlCcW8tIN8lRYSeivLlmxj1CVEFYhacRVmH981d2TVM5wXnF5c57bpqY9VbzC8ADm73fPexawZBLSSeeAQbF-nzq7k61qKZg2qCkbL8cD0~mTPG-eZroJy1jJg7UIrSdeOL5dNDp~DDENprbNDdlKWWEw9vImWRWxr5-DX1Gkvh30E2LX7eacZ-hIStbA3qguSDeAbq419DHEMdt8raO~Vm8T3AMO6tLpzxs-wDapxETIZBHVbSzpN6I3W8hJTjR8wCEF9zvYbUbUhVtTQ4~DdAGGTrYiA__';

const Leaderboard = () => {
  const [fitnessScoreData, setFitnessScoreData] = useState([]);
  const [workoutCountData, setWorkoutCountData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState('workout'); // Default to 'fitness score'
  const [loadingFitnessScore, setLoadingFitnessScore] = useState(true);
  const [loadingWorkoutCount, setLoadingWorkoutCount] = useState(true);

  const { getUserFromStorage, user } = useAuth();

  async function getFitnessScoreData() {
    // API call for fitnessScoreData
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/leaderboard/fitnessScore`,
      );
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
      const res = await axios.get(
        `${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/leaderboard/consistency`,
      );
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
    getUserFromStorage();
  }, []);

  useEffect(() => {
    if (user) {
      setLoadingFitnessScore(true);
      setLoadingWorkoutCount(true);
      getFitnessScoreData();
      getWorkoutCountData();
    }
  }, [user]);

  if (!user || (loadingFitnessScore && loadingWorkoutCount)) {
    return <Loader />;
  }

  const matchingUser = (
    selectedDataType === 'workout'
      ? workoutCountData.rankList
      : fitnessScoreData.rankList
  )?.find((entry) => entry.code === user.code);

  return (
    <div className="w-screen rounded-3xl px-4 py-8">
      <h2 className="leaderboard-gradient-text mb-3 text-3xl">
        Top Performers
      </h2>

      {selectedDataType === 'workout' && workoutCountData && matchingUser && (
        <div>
          <span className="leaderboard-gradient-text mr-2 text-4xl">
            #{matchingUser.rank}
          </span>
          <span className="text-sm font-medium text-lightGray">
            of {workoutCountData.total} participants
          </span>
        </div>
      )}

      {selectedDataType === 'fitnessScore' &&
        fitnessScoreData &&
        matchingUser && (
          <div>
            <span className="leaderboard-gradient-text mr-1 text-4xl">
              #{matchingUser.rank}
            </span>
            <span className="text-sm font-medium text-lightGray">
              of {fitnessScoreData.total} participants
            </span>
          </div>
        )}

      <div className="flex-start flex space-x-2 py-2">
        <div
          className={`inline-flex h-5 items-center justify-center gap-0.5 rounded border ${
            selectedDataType === 'workout'
              ? 'bg-white font-bold text-black'
              : 'text-white'
          } cursor-pointer px-2 py-0.5`}
          onClick={() => setSelectedDataType('workout')}
        >
          <p className="text-xs">Workout</p>
        </div>
        <div
          className={`inline-flex h-5 items-center justify-center gap-0.5 rounded border ${
            selectedDataType === 'fitnessScore'
              ? 'bg-white font-bold text-black'
              : 'text-white'
          } cursor-pointer px-2 py-0.5`}
          onClick={() => setSelectedDataType('fitnessScore')}
        >
          <p className="text-xs">Fitness Score</p>
        </div>
      </div>
      <div className="pb-2 text-[14px] font-medium text-lightGray">
        {selectedDataType === 'workout'
          ? 'Ranked by the number of workouts done this month'
          : 'Ranked by fitness scores this month'}
      </div>

      <div className="flex flex-row justify-between p-2 text-[8px] uppercase tracking-[3px] text-lightGray">
        <span className="">RANK</span>
        <span>
          {' '}
          {selectedDataType === 'workout' ? 'TOTAL WORKOUTS' : 'FITNESS SCORE'}
        </span>
      </div>

      {selectedDataType === 'workout' && workoutCountData.rankList ? (
        <List
          code={user.code}
          mode={selectedDataType}
          data={workoutCountData.rankList}
        />
      ) : selectedDataType === 'fitnessScore' && fitnessScoreData.rankList ? (
        <List
          code={user.code}
          mode={selectedDataType}
          data={fitnessScoreData.rankList}
        />
      ) : null}
    </div>
  );
};

export default Leaderboard;
