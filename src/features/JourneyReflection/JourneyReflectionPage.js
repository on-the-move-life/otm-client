
import Conclusion from './Conclusion';
import FitnessProgress from './FitnessProgress';
import FuturePlan from './FuturePlan';
import info from './info.json';
import Objectives from './Objectives';
import Strategies from './Strategies';
import Track from './Track';
import WorkoutConsitency from './WorkoutConsitency';

const JourneyReflectionPage = () => {
  const nameParts = info.renewalReport.name.split(' ');
    const firstName = nameParts[0];
  return (
    <div className='bg-[#1C1C1E] w-full h-auto flex flex-col px-2'>
     <div className='flex items-center justify-center sm:h-40 h-24'>
        <img src={process.env.PUBLIC_URL + '/assets/journey-pfp.png'} className='rounded-lg sm:w-20 sm:h-20' alt='header_picture'/>
     </div>
     <div className={`sm:px-10 px-4`}>
        <h1 className='text-[#7E87EF] sm:text-3xl text-xl sm:text-center text-left font-sf-pro'>Your Journey Reflection</h1>
        <p className='text-[14px] font-thin sm:text-center text-left mt-3 sm:text-base font-sf-pro'>Your dedication to fitness despite long work hours is inspiring. Keep experimenting and staying consistent - you’re on the right path!</p>
      </div>
      <div className="sm:px-10 px-4 mt-10">
       <h1 className="sm:text-center text-left sm:text-3xl text-xl font-sf-pro">Let's glance at your journey, <span className="text-[#7E87EF]">{firstName}!</span></h1>
      </div>
      <div className="sm:px-10 px-4 mt-12 flex items-center justify-center">
      <img src={process.env.PUBLIC_URL + '/assets/journey-graph.svg'} className='rounded-lg sm:w-52 w-30 sm:h-auto' alt='graph'/>
      </div>
       <Objectives/>
       <WorkoutConsitency/>
       <FitnessProgress/>
       <Strategies/>
       <FuturePlan/>
       <Track/>
       <Conclusion/>
  </div>

  )
}

export default JourneyReflectionPage