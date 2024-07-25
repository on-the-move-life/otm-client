import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error } from '../../components';
import axios from 'axios';
import { motion } from 'framer-motion';
//import Calendar from '../LifeStyleRoutines/Calendar';
import Calendar from './Calender';
import { getFormattedDate } from '../LifeStyleRoutines/utils';
import WeeklyWorkoutReport from '../Fitness/WeeklyWorkoutReport';
import { HiChevronDown } from 'react-icons/hi';

const WeeklyCheckIn = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [completionHistory, setCompletionHistory] = useState([]);

  const weekRatingRef = useRef(null);
  const achievementRef = useRef(null);
  const learningsRef = useRef(null);

  const weeklyWorkoutReportRef = useRef(null);

  useEffect(() => {
    getUserFromStorage();
  }, [getUserFromStorage]);

  useEffect(() => {
    if (user && user.email) {
      getWeeklyData();
      getCalendarData();
    } else {
      setError('Please login first');
    }
  }, [user, selectedDate]);

  const getWeeklyData = () => {
    setLoader(true);
    const today = new Date().toLocaleDateString('en-GB');
    axios
      .get(`${process.env.REACT_APP_INSIGHT_SERVICE_BASE_URL}/client`, {
        params: {
          email: user.email,
          day: today,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log('Weekly stats received:', res.data);
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
  };

  const getCalendarData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/lifestyle`, {
        params: {
          user: user.code,
          date: selectedDate
        }
      });
      setCompletionHistory(response.data.completionHistory || []);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      setError('Failed to fetch calendar data');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answers = [
      weekRatingRef.current.value,
      achievementRef.current.value,
      learningsRef.current.value
    ];
    localStorage.setItem('weeklyCheckInAnswers', JSON.stringify(answers));
    alert('Your responses have been saved!');

    // Reset form
    weekRatingRef.current.value = '';
    achievementRef.current.value = '';
    learningsRef.current.value = '';

    // Reset textarea heights
    [achievementRef.current, learningsRef.current].forEach(textarea => {
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

  const handleTextAreaChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const memoizedWeeklyWorkoutReport = useMemo(() => (
    <WeeklyWorkoutReport
      consistencyTrend={weeklyStats?.consistencyTrend || ''}
      suggestedWorkoutPerWeek={weeklyStats?.frequency || 0}
      lastEightWeeksWorkout={weeklyStats?.lastEightWeeksWorkout || []}
    />
  ), [weeklyStats]);

  return (
    <div className="flex w-screen grow flex-col gap-2 overflow-y-scroll px-4 pb-[20px]">
      <h1 className="text-2xl font-bold text-center mt-4">Weekly Check-In</h1>
      {loader && <Loader />}
      {error && <Error>{error}</Error>}
      {!loader && !error && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.section variants={itemVariants}>
            <Calendar
              completionHistory={completionHistory}
              isSummaryPage={false}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </motion.section>

          <motion.section 
            variants={itemVariants} 
            ref={weeklyWorkoutReportRef}
            className="mt-8"
          >
            {memoizedWeeklyWorkoutReport}
          </motion.section>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
  <label htmlFor="weekRating" className="block sm:text-lg text-base font-medium text-gray-700">
    Rate your week out of 10
  </label>
  <div className="relative">
    <select
      id="weekRating"
      ref={weekRatingRef}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white p-2 appearance-none"
      required
    >
      <option value="">Select a rating</option>
      {[...Array(11)].map((_, i) => (
        <option key={i} value={i}>{i}</option>
      ))}
    </select>
    <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl pointer-events-none" />
  </div>
</motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="achievement" className="block sm:text-lg text-base font-medium text-gray-700">
                Tell us your biggest achievement of the week
              </label>
              <textarea
                id="achievement"
                ref={achievementRef}
                onChange={handleTextAreaChange}
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
                ref={learningsRef}
                onChange={handleTextAreaChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white outline-none p-2"
                required
                style={{minHeight: '40px', resize: 'none', overflow: 'hidden'}}
              ></textarea>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue"
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