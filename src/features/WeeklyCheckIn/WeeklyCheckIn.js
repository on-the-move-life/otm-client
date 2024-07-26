import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader, Error } from '../../components';
import axios from 'axios';
import { motion } from 'framer-motion';
import Calendar from './Calender';
import { getFormattedDate } from '../LifeStyleRoutines/utils';
import WeeklyWorkoutReport from '../Fitness/WeeklyWorkoutReport';
import { HiChevronDown } from 'react-icons/hi';
import WeeklyCheckInSuccessPopup from '../../components/WeeklyCheckInSuccessPopup';

const WeeklyCheckIn = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const { getUserFromStorage, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [completionHistory, setCompletionHistory] = useState([]);

  const [weekRating, setWeekRating] = useState('');
  const [achievement, setAchievement] = useState('');
  const [learnings, setLearnings] = useState('');

  const weeklyWorkoutReportRef = useRef(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    getUserFromStorage();
  }, [getUserFromStorage]);

  useEffect(() => {
    if (user && user.email) {
      getWeeklyData();
      getCalendarData();
      loadFormData();
    } else {
      setError('Please login first');
    }
  }, [user, selectedDate]);

  const loadFormData = async () => {
    const storedFormData = localStorage.getItem('weeklyCheckInFormData');
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      setWeekRating(parsedData.rating);
      setAchievement(parsedData.achievement);
      setLearnings(parsedData.learning);
      setIsSubmitted(parsedData.isSubmitted);
    } else {
      await fetchSubmittedData();
    }
  };

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

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/weekly-checkin`, {
        params: {
          memberCode: user.code,
          currentWeek: true
        }
      });
      if (response.data) {
        setWeekRating(response.data.rating);
        setAchievement(response.data.achievement);
        setLearnings(response.data.learning);
        setIsSubmitted(true);
        
        saveFormDataToLocalStorage(response.data.rating, response.data.achievement, response.data.learning, true);
      }
    } catch (error) {
      console.error('Error fetching submitted weekly check-in data:', error);
    }
  };

  const saveFormDataToLocalStorage = (rating, achievement, learning, submitted) => {
    const formData = {
      rating,
      achievement,
      learning,
      isSubmitted: submitted
    };
    localStorage.setItem('weeklyCheckInFormData', JSON.stringify(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const weeklyCheckInData = {
      rating: parseInt(weekRating),
      achievement,
      learning: learnings,
      memberCode: user.code
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-checkin`,
        weeklyCheckInData
      );

      if (response.data.success) {
        setIsSubmitted(true);
        setShowSuccessPopup(true);
        
        saveFormDataToLocalStorage(
          weeklyCheckInData.rating,
          weeklyCheckInData.achievement,
          weeklyCheckInData.learning,
          true
        );
      } else {
        alert('Failed to submit weekly check-in. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting weekly check-in:', error);
      alert('Failed to submit weekly check-in. Please try again.');
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
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
    <>
      <div className={`flex w-screen grow flex-col gap-2 overflow-y-scroll px-4 pb-[20px] ${showSuccessPopup ? 'blur-sm' : ''}`}>
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
                    value={weekRating}
                    onChange={(e) => setWeekRating(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white p-2 appearance-none"
                    required
                    disabled={isSubmitted}
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
                  value={achievement}
                  onChange={(e) => {
                    setAchievement(e.target.value);
                    handleTextAreaChange(e);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white outline-none p-2"
                  required
                  style={{minHeight: '40px', resize: 'none', overflow: 'hidden'}}
                  readOnly={isSubmitted}
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="learnings" className="block sm:text-lg text-base font-medium text-gray-700">
                  What are your learnings of the week and how can we build the next week better?
                </label>
                <textarea
                  id="learnings"
                  value={learnings}
                  onChange={(e) => {
                    setLearnings(e.target.value);
                    handleTextAreaChange(e);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-800 text-white outline-none p-2"
                  required
                  style={{minHeight: '40px', resize: 'none', overflow: 'hidden'}}
                  readOnly={isSubmitted}
                ></textarea>
              </motion.div>

              {!isSubmitted && (
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue"
                  >
                    Submit Weekly Check-In
                  </button>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        )}
      </div>
      {showSuccessPopup && (
        <WeeklyCheckInSuccessPopup onClose={handleClosePopup} />
      )}
    </>
  );
};

export default WeeklyCheckIn;