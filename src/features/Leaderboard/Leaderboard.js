import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useAuth } from '../../contexts/AuthContext';
import List from './List';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { axiosClient } from './apiClient';
import AnimatedComponent from '../../components/AnimatedComponent';

const Leaderboard = () => {
  const [fitnessScoreData, setFitnessScoreData] = useState([]);
  const [workoutCountData, setWorkoutCountData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState(null); // Default to 'fitness score'
  const [loadingFitnessScore, setLoadingFitnessScore] = useState(true);
  const [loadingWorkoutCount, setLoadingWorkoutCount] = useState(true);

  const { getUserFromStorage, user } = useAuth();
  const navigate = useNavigate();
  const { value } = useParams();
  useEffect(() => {
    setSelectedDataType(value);
  }, [value]);

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

  if (!user || loadingFitnessScore || loadingWorkoutCount) {
    return <Loader />;
  }

  const matchingUser = (
    selectedDataType && selectedDataType === 'workout'
      ? workoutCountData.rankList
      : fitnessScoreData.rankList
  )?.find((entry) => entry.code === user.code);

  return (
    <div className="w-screen h-full px-4 py-8 overflow-scroll rounded-3xl">
      <AnimatedComponent>
        <div className="mb-4">
          <HiArrowNarrowLeft
            size={20}
            onClick={() => {
              navigate('/community');
            }}
          />
        </div>
        <h2 className="mb-3 text-3xl leaderboard-gradient-text">
          Top Performers
        </h2>

        {selectedDataType === 'workout' && workoutCountData && matchingUser && (
          <div>
            <span className="mr-2 text-4xl leaderboard-gradient-text">
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
              <span className="mr-1 text-4xl leaderboard-gradient-text">
                #{matchingUser.rank}
              </span>
              <span className="text-sm font-medium text-lightGray">
                of {fitnessScoreData.total} participants
              </span>
            </div>
          )}

        {/* <div className="flex py-2 space-x-2 flex-start">
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
        </div> */}
        <div className="pb-2 text-[14px] font-medium text-lightGray">
          {selectedDataType === 'workout'
            ? 'Ranked by the number of workouts done this month'
            : 'Ranked by fitness scores this month'}
        </div>

        <div className="flex flex-row justify-between p-2 text-[8px] uppercase tracking-[3px] text-lightGray">
          <span className="">RANK</span>
          <span>
            {' '}
            {selectedDataType === 'workout'
              ? 'TOTAL WORKOUTS'
              : 'FITNESS SCORE'}
          </span>
        </div>
      </AnimatedComponent>
      {selectedDataType === 'workout' && workoutCountData.rankList ? (
        <List
          code={user.code}
          mode={selectedDataType}
          data={workoutCountData.rankList}
          key={Math.random() * 1000}
        />
      ) : selectedDataType === 'fitness_score' && fitnessScoreData.rankList ? (
        <List
          code={user.code}
          mode={selectedDataType}
          data={fitnessScoreData.rankList}
          key={Math.random() * 1000}
        />
      ) : null}
    </div>
  );
};

export default Leaderboard;
