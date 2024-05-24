import React, { useState } from 'react';
import { NavigationTab } from "./index"
import Calendar from './Calendar'
import ProgressBar from './ProgressBar';
import FeelingCheckin from './components/FeelingCheckin';

function MainPage() {
  const [value, setValue] = useState(80);
  return (
    <div className="min-h-screen px-3 py-4 flex flex-col justify-between items-center">
      <ProgressBar value={value} />
      <Calendar />

      <NavigationTab />
      <div>

      </div>
    </div>
  )
}

export default MainPage