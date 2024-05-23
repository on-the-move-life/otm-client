import React from 'react'
import { NavigationTab } from "./index"
import Calendar from './Calendar'
function MainPage() {
  return (
    <div className="min-h-screen px-3 py-4 flex flex-col justify-between items-center">
      <Calendar/>
      <NavigationTab />
    </div>
  )
}

export default MainPage