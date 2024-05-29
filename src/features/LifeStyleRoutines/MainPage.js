import React, { useState, useEffect } from 'react';
import { NavigationTab } from "./index"
import Calendar from './Calendar'
import ProgressBar from './ProgressBar';
// import CircleTask from './components/CircleTask';

function MainPage() {

  // const [routinedata, setroutineData] = useState(null);

  // useEffect(() => {

  //   fetch('https://otm-main-production.up.railway.app/api/v1/lifestyle?user=PRAN&date=May%2023%202024')
  //     .then(response => response.json())
  //     .then(data => setroutineData(routinedata));
  // }, []);

  // if (!routinedata) {
  //   console.log("no data");
  // }

  // else if (routinedata) {
  //   console.log(routinedata);
  // }

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