import React, { useEffect, useState } from 'react';
import axios from 'axios';

import LeaderboardItem from './ListItem'; // Assuming the file path is correct
import { useAuth } from '../../contexts/AuthContext';

const Leaderboard = () => {
  const [fitnessScoreData, setFitnessScoreData] = useState([]);
  const [workoutCountData, setWorkoutCountData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState('workout'); // Default to 'workout'
  const [loading, setLoading] = useState(true);

  const { getUserFromStorage, user } = useAuth();

  async function getFitnessScoreData() {
    // API call for fitnessScoreData
    try {
      const res = await axios.get(
        `http://localhost:5000/workout/leaderboard/fitnessScore`,
      );
      if (res.data) {
        const data = res.data;
        setFitnessScoreData(data);
      }
    } catch (error) {
      console.error('Error fetching fitnessScoreData:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getWorkoutCountData() {
    // API call for workoutCountData
    try {
      const res = await axios.get(
        `http://localhost:5000/workout/leaderboard/monthlyWorkout`,
      );
      if (res.data) {
        const data = res.data;
        setWorkoutCountData(data);
      }
    } catch (error) {
      console.error('Error fetching workoutCountData:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserFromStorage();
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getFitnessScoreData();
      getWorkoutCountData();
    }
  }, [user]);

  const imgUrl =
    'https://s3-alpha-sig.figma.com/img/2e7c/0b19/b615cd1f932cd1924a9842e4132a9d6b?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gQvc8JF1x29HbTnGuCgaANyI7U~ir15x1Sjg1BupyF226FJDdePjFFCYGlCcW8tIN8lRYSeivLlmxj1CVEFYhacRVmH981d2TVM5wXnF5c57bpqY9VbzC8ADm73fPexawZBLSSeeAQbF-nzq7k61qKZg2qCkbL8cD0~mTPG-eZroJy1jJg7UIrSdeOL5dNDp~DDENprbNDdlKWWEw9vImWRWxr5-DX1Gkvh30E2LX7eacZ-hIStbA3qguSDeAbq419DHEMdt8raO~Vm8T3AMO6tLpzxs-wDapxETIZBHVbSzpN6I3W8hJTjR8wCEF9zvYbUbUhVtTQ4~DdAGGTrYiA__';

  if (!user || loading) {
    return <>Loading...</>;
  }

  // Find the user with the matching code
  const matchingUser = (
    selectedDataType === 'workout'
      ? workoutCountData.rankList
      : fitnessScoreData.rankList
  )?.find((entry) => entry.code === user.code);

  // Create a LeaderboardItem for the matching user
  const matchingUserItem =
    matchingUser && user.code ? (
      <LeaderboardItem
        key={-1} // Assign a unique key for the matching user
        isLoggedInUser={true}
        rank={matchingUser.rank}
        imgUrl={imgUrl}
        name={matchingUser.name}
        code={matchingUser.code}
        count={
          selectedDataType === 'workout'
            ? matchingUser.workout
            : matchingUser.totalScore
        }
        rankChange={matchingUser.rankChange}
      />
    ) : null;

  return (
    <div className="w-screen rounded-3xl px-4 py-8">
      <h2 className="text-[32px] text-purple-300">Top Performers</h2>
      {selectedDataType === 'workout' && workoutCountData && matchingUser && (
        <div>
          <span className="mr-2 text-[44px] text-purple-300">
            #{matchingUser.rank}
          </span>
          <span className="text-sm font-medium text-[#B1B1B1]">
            of {workoutCountData.total} participants
          </span>
        </div>
      )}

      {selectedDataType === 'fitnessScore' &&
        fitnessScoreData &&
        matchingUser && (
          <div>
            <span className="mr-2 text-[44px] text-purple-300">
              #{matchingUser.rank}
            </span>
            <span className="text-sm font-medium text-[#B1B1B1]">
              of {fitnessScoreData.total} participants
            </span>
          </div>
        )}

      <div className="flex flex-row py-2">
        <div
          className={`inline-flex h-[18px] items-center justify-center gap-0.5 rounded border ${
            selectedDataType === 'workout'
              ? 'bg-white text-black'
              : 'text-white'
          } cursor-pointer px-2 py-0.5`}
          onClick={() => setSelectedDataType('workout')}
        >
          <p className="text-xs">Workout</p>
        </div>
        <div
          className={`inline-flex h-[18px] items-center justify-center gap-0.5 rounded border ${
            selectedDataType === 'fitnessScore'
              ? 'bg-white text-black'
              : 'text-white'
          } mx-2 cursor-pointer px-2 py-0.5`}
          onClick={() => setSelectedDataType('fitnessScore')}
        >
          <p className="text-xs">Fitness Score</p>
        </div>
      </div>
      <div className="text-zinc-400 pb-2 text-sm font-medium">
        {selectedDataType === 'workout'
          ? 'Ranked by the number of workouts done this month'
          : 'Ranked by fitness scores this month'}
      </div>

      <div className="flex flex-row justify-between p-2">
        <span className="text-zinc-400 text-[8px] uppercase tracking-[3px] ml-4">
          RANK
        </span>
        <span className="text-zinc-400 text-[8px] uppercase tracking-[3px]">
          {' '}
          {selectedDataType === 'workout' ? 'TOTAL WORKOUTS' : 'FITNESS SCORE'}
        </span>
      </div>
      {matchingUserItem}

      {(selectedDataType === 'workout'
        ? workoutCountData.rankList
        : fitnessScoreData.rankList
      )
        ?.filter((entry) => entry.code !== user.code)
        ?.map((entry, idx) => (
          <LeaderboardItem
            key={idx}
            imgUrl={imgUrl}
            name={entry.name}
            code={entry.code}
            count={
              selectedDataType === 'workout' ? entry.workout : entry.totalScore
            }
            rank={entry.rank}
            isLoggedInUser={false}
            rankChange={entry.rankChange}
          />
        ))}
    </div>
  );
};

export default Leaderboard;
