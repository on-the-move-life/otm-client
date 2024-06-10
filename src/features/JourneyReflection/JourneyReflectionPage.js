import Conclusion from './Conclusion';
import FitnessProgress from './FitnessProgress';
import FuturePlan from './FuturePlan';
import info from './info.json';
import Objectives from './Objectives';
import Strategies from './Strategies';
import Track from './Track';
import WeeklyWorkoutJourney from './WeeklyWorkoutJourney';
import WorkoutConsitency from './WorkoutConsitency';

const JourneyReflectionPage = () => {
  const nameParts = info.renewalReport.name.split(' ');
    const firstName = nameParts[0];
  return (
    <div className='bg-black w-full h-auto flex flex-col px-2 sm:py-10 py-5'>
     <div className={`sm:px-10 px-4`}>
        <h1 className='text-[#7E87EF] sm:text-4xl text-3xl sm:text-center text-left font-sfpro mt-8 sm:mt-14'>Your Journey Reflection</h1>
        <p className='text-[14px] font-thin sm:text-center text-left mt-6 sm:text-base font-sfpro'>Your dedication to fitness despite long work hours is inspiring. Keep experimenting and staying consistent - you’re on the right path!</p>
      </div>
      <div className="sm:px-10 px-4 mt-10">
       <h1 className="sm:text-center text-left sm:text-2xl text-lg font-sfpro">Let's glance at your journey, <span className="text-[#7E87EF]">{firstName}!</span></h1>
      </div>
    <div className='flex flex-col space-y-10'> 
      <section className="sm:px-10 px-4 mt-12 flex items-center justify-center">
      <WeeklyWorkoutJourney/>
      </section>
       <section>
          <Objectives/>
       </section>
       <section>
          <WorkoutConsitency/>
       </section>
       <section>
          <FitnessProgress/>
       </section>
       <section>
          <Strategies/>
       </section>
       <section>
          <FuturePlan/>
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