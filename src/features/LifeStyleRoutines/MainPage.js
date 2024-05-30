import React, { useState, useEffect } from 'react'
import { NavigationTab } from "./index"
import Calendar from './Calendar'
import YourCircle from './components/YourCircle'
import { axiosClient } from "./apiClient"
import { getFormattedDate } from './utils'
import BackButton from '../../components/BackButton';
import Routines from './Routines'
import Summary from './Summary'

function MainPage() {
  // Defining states for the fetched data
  const [completionHistory, setCompletionHistory] = useState(null)
  const [circles, setCircles] = useState(null);
  const [percentCompletion, setPercentCompletion] = useState(null);
  /**
   * section -> Routine or Summary
   * indices : 0 for Routine & 1 for Summary
   */
  const [section, setSection] = useState(0);

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
    <div className="min-h-screen px-3 py-4 flex flex-col justify-between items-center">
      <BackButton
        size={30}
        className="absolute left-[5%] w-fit cursor-pointer"
      />
      <Calendar completionHistory={completionHistory}/>
      {
        section === 0 && <Routines circles={circles}/>
      }
      {
        section === 1 && <Summary circles={circles}/>
      }
      <NavigationTab selectedIndex={section} setSelectedIndex={setSection}/>
    </div>
  )
}

export default MainPage