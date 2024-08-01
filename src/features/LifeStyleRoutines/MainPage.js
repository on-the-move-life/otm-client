//MainPage.js
import React, { useState, useEffect } from 'react';
import { NavigationTab } from './index';
import Calendar from './Calendar';
import { axiosClient } from './apiClient';
import { getFormattedDate } from './utils';
import BackButton from '../../components/BackButton';
import Routines from './Routines';
import Summary from './Summary';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../LifestyleQuiz';
import { Error } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialStateSuccess } from './ReduxStore/actions';
import { TimelineHeading } from '../Timeline/StyledComponents';

function MainPage() {
  // Defining states for the fetched data
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [section, setSection] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { completionHistory, circles, percentCompletion } = useSelector(
    (state) => ({
      completionHistory: state.completionHistory,
      circles: state.lifeStyleDetails?.circles,
      percentCompletion: state.lifeStyleDetails?.completionHistory,
    }),
  );

  const memberCode = JSON.parse(localStorage.getItem('user'))?.code;

  const getData = async (date) => {
    setPageLoading(true);
    setPageError(false);
    try {
      const response = await axiosClient.get(
        `?user=${memberCode}&date=${date}`,
      );
      dispatch(fetchInitialStateSuccess(response.data));
    } catch (error) {
      console.error(error);
      setPageError(true);
    } finally {
      setPageLoading(false);
    }
  };

  // this will call the API whenever the date is changed
  useEffect(() => {
    if (reloadCounter === false) {
      getData(selectedDate);
    }
  }, [selectedDate, reloadCounter]);

  const renderContent = () => {
    if (pageLoading) {
      return (
        <div className="fixed left-0 top-0 z-50 w-full bg-black">
          <Loader className="h-screen w-full" />
        </div>
      );
    }

    if (pageError) {
      return (
        <div className="fixed left-0 top-0 z-[200] h-screen w-full bg-black">
          <Error>Some Error Occurred</Error>
        </div>
      );
    }

    return (
      <div className="mb-9  flex h-full flex-col items-center justify-start gap-3 px-3 py-5 ">
        <TimelineHeading className="mt-[76px] w-full text-left">
          Habits
        </TimelineHeading>
        {completionHistory && (
          <Calendar
            completionHistory={completionHistory}
            isSummaryPage={section === 1}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        {section === 0 ? (
          <Routines
            circles={circles}
            date={selectedDate}
            setReloadCounter={setReloadCounter}
          />
        ) : (
          
          <Summary circles={circles} date={selectedDate} />
        )}
      </div>
    );
  };

  return (
    <>
      <img className="absolute right-0 -z-20 " src="/assets/main-frame.svg" />
      <img
        className="absolute right-[65px] top-14 -z-10 "
        src="/assets/lifestyle-logo.svg"
      />
      <div className="pb-[78px]">
        {renderContent()}
        <div className=" left-0 w-full bg-black/20 py-4 backdrop-blur-sm">
          <NavigationTab
            selectedIndex={section}
            setSelectedIndex={setSection}
          />
        </div>
      </div>
    </>
  );
}

export default MainPage;
