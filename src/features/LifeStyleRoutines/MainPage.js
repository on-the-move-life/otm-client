import React, { useState, useEffect } from 'react';
import { NavigationTab } from "./index";
import Calendar from './Calendar';
import { axiosClient } from "./apiClient";
import { getFormattedDate } from './utils';
import BackButton from '../../components/BackButton';
import Routines from './Routines';
import Summary from './Summary';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../LifestyleQuiz';
import { Error } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialStateSuccess } from './ReduxStore/actions';

function MainPage() {
  // Defining states for the fetched data
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [section, setSection] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { completionHistory, circles, percentCompletion, streak, streakMessage } = useSelector(state => ({
    completionHistory: state.completionHistory,
    circles: state.lifeStyleDetails?.circles,
    percentCompletion: state.lifeStyleDetails?.completionHistory,
    streak: state.streak,
    streakMessage: state.streakMessage
  }));

  const memberCode = JSON.parse(localStorage.getItem('user'))?.code;

  const getData = async (date) => {
    setPageLoading(true);
    setPageError(false);
    try {
      const response = await axiosClient.get(`?user=${memberCode}&date=${date}`);
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
    if(reloadCounter === false){
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
        <div className="w-full h-screen fixed top-0 left-0 z-[200] bg-black">
          <Error>Some Error Occurred</Error>
        </div>
      );
    }

    return (
      <div className="h-full px-3 py-5 flex flex-col justify-start items-center gap-3 mb-9 mt-7">
        {completionHistory && (
          <Calendar 
            completionHistory={completionHistory} 
            isSummaryPage={section === 1} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
          />
        )}
        {streakMessage && <p className='text-[#b1b1b1] text-sm'>{streakMessage[0]} <span className='text-[#F5C563]'>{streakMessage[1]}</span></p>}
        {section === 0 ? (
          <Routines circles={circles} date={selectedDate} setReloadCounter={setReloadCounter}/>
        ) : (
          <Summary circles={circles} date={selectedDate} />
        )}
      </div>
    );
  };

  return (
    <>
      <BackButton
        size={30}
        className="absolute left-3 top-2 w-fit cursor-pointer"
        action={() => navigate('/')}
      />
      {renderContent()}
      <div className="w-full fixed bottom-0 left-0 py-4 bg-black/20 backdrop-blur-sm">
        <NavigationTab selectedIndex={section} setSelectedIndex={setSection} />
      </div>
    </>
  );
}

export default MainPage;
