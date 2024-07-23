import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error } from '../../components';
import axios from 'axios';
import { motion } from 'framer-motion';
import WeeklyWorkoutReport from '../Fitness/WeeklyWorkoutReport';

const WeeklyCheckIn = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const [weekRating, setWeekRating] = useState('');
  const [achievement, setAchievement] = useState('');
  const [learnings, setLearnings] = useState('');

  const weeklyWorkoutReportRef = useRef(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');

    getUserFromStorage();

    function getWeeklyData() {
      setLoader(true);
      axios
        .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`, {
          params: {
            email: user.email,
            day: today,
          },
        })
        .then((res) => {
          if (res.data) {
            setWeeklyStats(res.data);
            setLoader(false);
            setError(null);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setWeeklyStats(null);
          setError('Failed to fetch weekly data');
          setLoader(false);
        });
    }

    if (user && user.email) {
      getWeeklyData();
    } else {
      setError('Please login first');
    }
  }, [user]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const answers = [weekRating, achievement, learnings];
    localStorage.setItem('weeklyCheckInAnswers', JSON.stringify(answers));
    alert('Your responses have been saved!');
    
    // Reset form
    setWeekRating('');
    setAchievement('');
    setLearnings('');

    // Reset textarea heights
    const textareas = e.target.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.style.height = 'auto';
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleTextAreaChange = (e, setter) => {
    setter(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const memoizedWeeklyWorkoutReport = useMemo(() => (
    <WeeklyWorkoutReport
      consistencyTrend={weeklyStats?.consistencyTrend}
      suggestedWorkoutPerWeek={weeklyStats?.frequency}
      lastEightWeeksWorkout={weeklyStats?.lastEightWeeksWorkout}
    />
  ), [weeklyStats]);

  return (
    <div className="flex w-screen grow flex-col gap-5 overflow-y-scroll px-4 pb-[78px]">
      <h1 className="text-2xl font-bold text-center mt-6 mb-4">Weekly Check-In</h1>
      {loader && <Loader />}
      {error && <Error>{error}</Error>}
      {weeklyStats && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section variants={itemVariants} ref={weeklyWorkoutReportRef}>
            {memoizedWeeklyWorkoutReport}
          </motion.section>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="weekRating" className="block sm:text-lg text-base font-medium text-gray-700">
                Rate your week out of 10
              </label>
              <select
                id="weekRating"
                value={weekRating}
                onChange={(e) => setWeekRating(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white p-2"
                required
              >
                <option value="">Select a rating</option>
                {[...Array(11)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="achievement" className="block sm:text-lg text-base font-medium text-gray-700">
                Tell us your biggest achievement of the week
              </label>
              <textarea
                id="achievement"
                value={achievement}
                onChange={(e) => handleTextAreaChange(e, setAchievement)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white outline-none p-2"
                required
                style={{minHeight: '40px', resize: 'none', overflow: 'hidden'}}
              ></textarea>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="learnings" className="block sm:text-lg text-base font-medium text-gray-700">
                What are your learnings of the week and how can we build the next week better?
              </label>
              <textarea
                id="learnings"
                value={learnings}
                onChange={(e) => handleTextAreaChange(e, setLearnings)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white outline-none p-2"
                required
                style={{minHeight: '40px', resize: 'none', overflow: 'hidden'}}
              ></textarea>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Submit Weekly Check-In
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      )}
    </div>
  );
};

export default WeeklyCheckIn;