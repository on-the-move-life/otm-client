import info from './info.json';

const JourneyReflectionPage = () => {

    const { objectives } = info.renewalReport;
   
  return (
    <div className='bg-[#1C1C1E] w-full h-auto flex flex-col px-4'>
     <div className='flex items-center justify-center sm:h-40 h-24'>
        <img src={process.env.PUBLIC_URL + '/assets/journey-pfp.png'} className='rounded-lg sm:w-20 sm:h-20' alt='header_picture'/>
     </div>
     <div className={`sm:px-10 px-4`}>
        <h1 className='text-[#7E87EF] sm:text-3xl text-xl sm:text-center text-left font-serif'>Your Journey Reflection</h1>
        <p className='text-[14px] font-thin sm:text-center text-left mt-3 sm:text-base'>Your dedication to fitness despite long work hours is inspiring. Keep experimenting and staying consistent - you’re on the right path!</p>
      </div>
      <div className="sm:px-10 px-4 mt-10">
       <h1 className="text-center sm:text-3xl text-xl font-serif">Let's glance at your journey, <span className="text-[#7E87EF]">{info.renewalReport.name}!</span></h1>
      </div>
      <div className="sm:px-10 px-4 mt-12 flex items-center justify-center">
      <img src={process.env.PUBLIC_URL + '/assets/journey-graph.svg'} className='rounded-lg sm:w-52 w-30 sm:h-auto' alt='graph'/>
      </div>
      <div className='sm:px-10 px-4 mt-12'>
        <h1 className='text-[#7E87EF] sm:text-3xl text-xl sm:text-center text-left font-serif'>Your Top 3 Objectives</h1>
      </div>
      <div className='flex flex-row overflow-x-auto sm:max-w-screen-lg max-w-screen-[700px] mx-auto overflow-hidden px-4'>
      {objectives.map((prod,index)=>{
          return (
            <div key={index} className='flex-shrink-0 w-3/5 sm:w-[600px] h-auto p-4 bg-black m-1 rounded-md'>
            <h2 className='text-[#7E87EF] sm:text-lg text-sm'>{prod.heading}</h2>
            <hr className="my-2 border-gray-300" />
            <p className='sm:max-w-lg text-xs'>{prod.details}</p>
            </div>
          )
        })
        }
      </div>
  </div>

  )
}

export default JourneyReflectionPage