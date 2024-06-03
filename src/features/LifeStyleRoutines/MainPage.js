import React, { useState, useEffect } from 'react'
import { NavigationTab } from "./index"
import Calendar from './Calendar'
import YourCircle from './components/YourCircle'
import { axiosClient } from "./apiClient"
import { getFormattedDate } from './utils'
import BackButton from '../../components/BackButton';
import Routines from './Routines'
import Summary from './Summary'
import { useNavigate } from 'react-router-dom'

function MainPage() {
  // Defining states for the fetched data
  const [completionHistory, setCompletionHistory] = useState(null)
  const [circles, setCircles] = useState(null);
  const [percentCompletion, setPercentCompletion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  /**
   * section -> Routine or Summary
   * indices : 0 for Routine & 1 for Summary
   */
  const [section, setSection] = useState(0);

  const navigate = useNavigate();

  function getData() {
    const currentDate = getFormattedDate();
    console.log(currentDate)
    const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
    axiosClient.get(`?user=${memberCode}&date=${currentDate}`)
      .then(res => {
        setCompletionHistory(res.data?.completionHistory);
        setCircles(res.data?.lifeStyle?.circles);
        setPercentCompletion(res.data?.lifeStyle?.completionPercentage);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <BackButton
        size={30}
        className="absolute left-3 top-2 w-fit cursor-pointer"
        action={() => navigate('/')}
      />
      <div className="h-full px-3 py-5 flex flex-col justify-start items-center gap-3 mb-9 mt-7">
        {completionHistory && <Calendar completionHistory={completionHistory} isSummaryPage={section === 1} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>}
        {
          section === 0 && <Routines circles={circles} date={selectedDate}/>
        }
        {
          section === 1 && <Summary circles={circles} date={selectedDate}/>
        }
      </div>
      <div className='w-full fixed bottom-0 left-0 py-2 bg-black/20 backdrop-blur-sm'>
        <NavigationTab selectedIndex={section} setSelectedIndex={setSection} />
      </div>
    </>
  )
}

export default MainPage