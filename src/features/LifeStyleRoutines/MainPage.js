//MainPage.js
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  const contentAreaRef = useRef(null);
  const [contentAreaHeight, setContentAreaHeight] = useState(0);
  const [isCircleOpen, setIsCircleOpen] = useState(false);
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
  useLayoutEffect(() => {
    const handleResize = () => {
      if (contentAreaRef.current) {
        // Get the height of the navigation elements
        const globalNavHeight = 78; // Height of the global Navbar
        const localNavHeight = 60; // Height of the NavigationTab

        // Calculate the available height for the content area
        const availableHeight = window.innerHeight - globalNavHeight - localNavHeight;

        // Set the content area height
        setContentAreaHeight(availableHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // this will call the API whenever the date is changed
  useEffect(() => {
    if (reloadCounter === false) {
      getData(selectedDate);
    }
  }, [selectedDate, reloadCounter]);

  const renderContent = () => {
    if (pageLoading) {
      return (
        <div className="fixed top-0 left-0 z-50 w-full h-screen bg-black">
          <Loader className="w-full h-full" />
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
      <>
        <div className="flex flex-col items-center justify-start h-full gap-3 px-3 py-5">
          <TimelineHeading className="mt-[70px] w-full text-left">
            Lifestyle
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
              setIsCircleOpen={setIsCircleOpen}
            />
          ) : (
            <Summary circles={circles} date={selectedDate} />
          )}
        </div>
        {!isCircleOpen && (
          <div className="fixed bottom-[78px] left-0 w-full py-4 bg-black/20 backdrop-blur-sm z-50">
            <NavigationTab
              selectedIndex={section}
              setSelectedIndex={setSection}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="absolute right-0 -top-4 -z-20 "
        src="/assets/main-frame.svg"
      />
      <img
        className="absolute right-[55px] top-10 -z-10 "
        src="/assets/lifestyle-logo.svg"
      />
      <div 
        className="h-full overflow-y-auto content-area" 
        ref={contentAreaRef}
        style={{
          height: `${contentAreaHeight}px`,
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default MainPage;
