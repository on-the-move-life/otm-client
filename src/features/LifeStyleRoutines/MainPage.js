import React from 'react'
import { NavigationTab } from "./index"
import Calendar from './Calendar'
import ProgressBar from './ProgressBar';
import FeelingCheckin from './components/FeelingCheckin';

function MainPage() {
  const value = 50;
  return (
    <div className="min-h-screen px-3 py-4 flex flex-col justify-between items-center">
      <Calendar />
      <NavigationTab />
      <div>
        <ProgressBar>
          <input
            type="range"
            min="1"
            max="100"
            value={value}
          />

        </ProgressBar>

        <FeelingCheckin></FeelingCheckin>

      </div>
    </div>
  )
}

export default MainPage