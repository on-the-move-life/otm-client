import React, { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { updateCurrentWeeklyCheckinQuestion } from '../LifestyleQuiz/utils/utils';
import WeeklyCheckinInitialIntro from './WeeklyCheckinInitialIntro';
import WeeklyCheckinResult from './WeeklyCheckinResult';
import WeeklyCheckinSecondaryIntro from './WeeklyCheckinSecondaryIntro';

import WeeklyCheckinLoadingScreem from './WeeklyCheckinLoadingScreem';

import { useLocation } from 'react-router-dom';
import NutritionScreen from './NutritionScreen';
import QuestionnaireScreenOutput from './QuestionnaireScreenOutput';

const WeeklyCheckIn = () => {
  const [screen, setScreen] = useState('Introduction');
  const [questionnaireScreen, setQuestionnaireScreen] = useState(1);
  const [response, setResponse] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showNutritionScreen, setShowNutritionScreen] = useState(false);
  const [questionnaireLoading, setQuestionnaireLoading] = useState(false);
  const [nutritionLoading, setNutritionLoading] = useState(false);
  const [questionnaireForm, setQuestionnaireForm] = useState(null);
  const [nutritionData, setNutritionData] = useState({});
  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const [week, setWeek] = useState('');
  const [weeklyResponse, setWeeklyResponse] = useState(undefined);
  const [weeklyReport, setWeeklyReport] = useState(undefined);
  const [weeklyReviewLoading, setWeeklyReviewLoading] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsData] = useState(null);

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const formSubmit = queryParams.get('formSubmit');

  const getUserData = useMemo(
    () => async () => {
      setQuestionnaireLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/questionnaire`,
        );
        if (res.data) {
          setQuestionnaireForm(res.data.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setQuestionnaireLoading(false);
      }
    },
    [], // Dependencies for memoization
  );

  useEffect(() => {
    getUserData(); // Invoke the memoized function
  }, []);

  const getWeeklyReviewData = useMemo(
    () => async () => {
      if (week) {
        setWeeklyReviewLoading(true);
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review?memberCode=${code}&week=${week}`,
          );
          if (res) {
            setWeeklyResponse(res.data.data.response);
            setWeeklyReport(res.data.data.report);
          }
        } catch (err) {
          console.error(err.message);
        } finally {
          setWeeklyReviewLoading(false);
        }
      }
    },
    [week], // Dependencies for memoization
  );

  useEffect(() => {
    if (formSubmit) {
      getWeeklyReviewData();
      setScreen('result');
    } else {
      setScreen('Introduction');
    }
  }, [formSubmit, week]);

  useEffect(() => {
    getWeeklyReviewData();
  }, [week]);

  useEffect(() => {
    setLoading(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/stats?memberCode=${code}`,
          {
            memberCode: 'PRAN',
          },
        );
        if (res.data) {
          setStatsData(res.data.data[0]);
          setWeek(res.data.data[0].week);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  // useEffect(() => {
  //   //Func to call get weekly review API
  //   async function getUserData() {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review?memberCode=${code}&week=${week}}`,
  //       );
  //     } catch (err) {
  //       console.error(err.message);
  //     } finally {
  //     }
  //   }
  //   getUserData();
  // }, []);

  useEffect(() => {
    //Func to call get weekly review API
    setNutritionLoading(true);
    async function getUserData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/weekly-review/nutritional-info`,
        );
        if (res.data) {
          setNutritionData(res.data.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setNutritionLoading(false);
      }
    }
    getUserData();
  }, []);

  const questionnaireData = [
    //Data to show heading and Background Color on different pages of questionnaire form
    {
      bg: 'bg-blue',
      text: 'text-blue',
      heading: 'Fitness and nutrition update',
      img: '/assets/weekly-checkin-intro-bg.svg',
    },
    {
      bg: 'bg-yellow',
      text: 'text-yellow',
      heading: 'Mind & body check-in',
      img: '/assets/yellow-background.svg',
    },
    {
      bg: 'bg-teal',
      text: 'text-teal',
      heading: 'Measurements & photos',
      img: '/assets/blue-background.svg',
    },
  ];

  useEffect(() => {
    // it will update the current question as soon as the screen changes
    questionnaireForm &&
      updateCurrentWeeklyCheckinQuestion(
        questionnaireForm,
        questionnaireScreen,
        setCurrentQuestion,
      );
  }, [questionnaireScreen, questionnaireForm]);

  return (
    <div className="bg- relative h-screen">
      {showNutritionScreen === true && (
        <NutritionScreen
          nutritionData={nutritionData}
          setShowNutritionScreen={setShowNutritionScreen}
        />
      )}

      {screen === 'Introduction' && (
        <WeeklyCheckinInitialIntro setScreen={setScreen} />
      )}
      {screen === 'Introduction2' && (
        <WeeklyCheckinSecondaryIntro
          weeklyReviewLoading={weeklyReviewLoading}
          setWeek={setWeek}
          setScreen={setScreen}
          code={code}
          loading={loading}
          statsData={statsData}
        />
      )}
      {screen === 'result' && (
        <WeeklyCheckinResult
          setScreen={setScreen}
          week={week}
          weeklyReport={weeklyReport}
        />
      )}
      {screen === 'resultLoading' && (
        <WeeklyCheckinLoadingScreem setScreen={setScreen} />
      )}
      {screen === 'questionnaire' && (
        <QuestionnaireScreenOutput
          currentQuestion={currentQuestion}
          questionnaireData={questionnaireData}
          response={response}
          screen={screen}
          setResponse={setResponse}
          setScreen={setScreen}
          setShowNutritionScreen={setShowNutritionScreen}
          questionnaireScreen={questionnaireScreen}
          setQuestionnaireScreen={setQuestionnaireScreen}
          week={week}
          weeklyResponse={weeklyResponse}
          getWeeklyReviewData={getWeeklyReviewData}
        />
      )}
    </div>
  );
};

export default WeeklyCheckIn;
