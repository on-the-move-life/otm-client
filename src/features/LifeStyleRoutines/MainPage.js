import React, { useState, useEffect } from 'react';
import { NavigationTab } from "./index"
import Calendar from './Calendar'
import ProgressBar from './ProgressBar';
import FeelingCheckin from './components/FeelingCheckin';

function MainPage() {

  const [progress, setProgress] = useState(72);



  return (
    <div className="min-h-screen px-3 py-4 flex flex-col justify-between items-center">
      <div >
        <ProgressBar progress={progress} />
      </div>
      <Calendar />

      <NavigationTab />
      <div>

      </div>
    </div>
  )
}

export default MainPage