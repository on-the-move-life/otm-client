import React, { useEffect, useState } from 'react';
import axios from 'axios';

import LeaderboardItem from './listItem'; // Assuming the file path is correct

// list
// list item

// store rank data
// prev rank
// curr rank
// curr workout count

const Leaderboard = () => {
  const [fitnessScoreData, setFitnessScoreData] = useState([]);
  const [workoutCountData, setWorkoutCountData] = useState([]);

  async function getFitnessScoreData() {
    //api call
    try {
      const res = await axios.get(
        `http://localhost:5000/workout/leaderboard/fitnessScore`,
      );
      if (res.data) {
        const data = res.data;
        setFitnessScoreData(data);
      }
    } catch (error) {}
  }


  async function getWorkoutCountData() {
    //api call
    try {
      const res = await axios.get(
        `http://localhost:5000/workout/leaderboard/wo`,
      );
      if (res.data) {
        const data = res.data;
        console.log('api data', data);
        setWorkoutCountData(data);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getFitnessScoreData();
    getWorkoutCountData()
  }, []);

  const imgUrl =
    'https://s3-alpha-sig.figma.com/img/2e7c/0b19/b615cd1f932cd1924a9842e4132a9d6b?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gQvc8JF1x29HbTnGuCgaANyI7U~ir15x1Sjg1BupyF226FJDdePjFFCYGlCcW8tIN8lRYSeivLlmxj1CVEFYhacRVmH981d2TVM5wXnF5c57bpqY9VbzC8ADm73fPexawZBLSSeeAQbF-nzq7k61qKZg2qCkbL8cD0~mTPG-eZroJy1jJg7UIrSdeOL5dNDp~DDENprbNDdlKWWEw9vImWRWxr5-DX1Gkvh30E2LX7eacZ-hIStbA3qguSDeAbq419DHEMdt8raO~Vm8T3AMO6tLpzxs-wDapxETIZBHVbSzpN6I3W8hJTjR8wCEF9zvYbUbUhVtTQ4~DdAGGTrYiA__';
  return (
    <div className="rounded-3xl px-4 py-8 w-screen">
      <h2 className="text-[32px] text-purple-300 border border-white">Top Performers</h2>
      <div>
        <span className="text-[44px] text-purple-300 border border-white">#13</span>
        <span className="text-sm font-medium text-[#B1B1B1] border border-white">
          of 69 participants
        </span>
      </div>
      <div className='flex flex-row py-2'>
        <div className="inline-flex h-[18px] items-center justify-center gap-0.5 rounded border bg-white px-2 py-0.5">
          <p className="text-xs text-black ">Workout</p>
        </div>
        <div className="inline-flex h-[18px] items-center justify-center gap-0.5 rounded bg-white mx-2  px-2 py-0.5">
          <p className="text-xs text-black ">Fitness Score</p>
        </div>
      </div>

      <div className="text-zinc-400 text-sm font-medium pb-2">
        Ranked by the number of workouts done this month
      </div>

      {!fitnessScoreData ? (
        <>Loading.....</>
      ) : (
        fitnessScoreData.rankList?.map((entry, idx) => (
          <LeaderboardItem
            key={idx}
            rank={idx + 1} // Assuming you want to display the rank based on the array index
            imgUrl={imgUrl} // Add the appropriate imgUrl property to your data
            name={entry.name}
            count={entry.totalScore}
          />
        ))
      )}
    </div>
  );
};

export default Leaderboard;
