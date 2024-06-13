import { useEffect, useState } from 'react';
import Conclusion from './Conclusion';
import FitnessProgress from './FitnessProgress';
import FuturePlan from './FuturePlan';
import Objectives from './Objectives';
import Strategies from './Strategies';
import Track from './Track';
import WeeklyWorkoutJourney from './WeeklyWorkoutJourney';
import WorkoutConsitency from './WorkoutConsitency';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JourneyReflectionPage = () => {
   const { reportId } = useParams(); 
   const [apiData, setApiData] = useState([]);

   useEffect(() => {
      const fetchReport = async () => {
         const response = await axios.get('https://otm-main-production.up.railway.app/api/v1/renewal-report', {
            params: {
              reportId: '666ac08a93dc5b3561e23b68',
            },
          });
          setApiData(response.data);
        } 
      fetchReport();
    }, [reportId]);
     const nameParts = apiData?.data?.name?.split(' ');
     const firstName = nameParts?.[0];
    
  return (
    <div className='bg-black w-full h-auto flex flex-col px-2 sm:py-10 py-5'>
       <div className={`sm:px-10 px-4`}>
         <h1 className='purple-gradient sm:text-4xl text-3xl sm:text-center text-left font-sfpro mt-8 sm:mt-14'>Your Journey Reflection</h1>
         <p className='text-[14px] text-white font-[300] sm:text-center text-left mt-6 sm:text-base font-sfpro'>Your dedication to fitness despite long work hours is inspiring. Keep experimenting and staying consistent - you’re on the right path!</p>
       </div>
      <div className="sm:px-10 px-4 mt-10">
         <h1 className="sm:text-center text-left sm:text-2xl text-lg font-sfpro">Let's glance at your journey, <span className="text-[#7E87EF]">{firstName}</span></h1>
      </div>
      <div className='flex flex-col space-y-20'>
       <section className="sm:px-10 px-4 mt-12 flex items-center justify-center">
         <WeeklyWorkoutJourney apiData={apiData}/>
       </section>
       <section>
          <Objectives apiData={apiData}/>
       </section>
       <section>
          <WorkoutConsitency apiData={apiData}/>
       </section>
       <section>
          <FitnessProgress apiData={apiData}/>
       </section>
       <section>
          <Strategies apiData={apiData}/>
       </section>
       <section>
          <FuturePlan apiData={apiData}/>
       </section>
       <section>
          <Track/>
       </section>
       <section>
          <Conclusion/>
       </section>
      </div>
    </div>

  )
}

export default JourneyReflectionPage