import { HiX } from 'react-icons/hi';
import ChartComponent from './ChartComponent';
import AnimatedComponent from '../../components/AnimatedComponent';
import { IoIosSearch } from "react-icons/io";
import { GiSkippingRope } from "react-icons/gi";
import { useEffect, useRef, useState } from 'react';

const sectionWithLoadArray = ['ISO', 'MR', 'STR', 'HYP', 'HYP2', 'HYP3'];
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const MovementDetail = ({ movement, sectionCode, closeMovementDetail }) => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const selectedImage = movement.link[0];
  const selectedMvmtName = movement.name;

  console.log(movement);
  const handleCloseModal = () => {
    closeMovementDetail();
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen bg-[#141414] overflow-x-hidden">
         <div
        ref={headerRef}
        className={`transition-all duration-900 ease-in-out ${
          scrolled
            ? 'fixed top-0 left-0 right-0 z-50 bg-[#141414] py-2 flex items-center justify-between px-4'
            : 'relative'
        }`}
      >
        <div className={`flex transition-all duration-900 ease-in-out ${scrolled ? 'flex-row items-center' : 'flex-col items-center w-full'}`}>
          <img
            className={`transition-all duration-900 ease-in-out ${
              scrolled ? 'sm:h-28 sm:w-28 h-12 w-12 rounded-md mr-4' : 'my-4 sm:h-full h-40'
            }`}
            src={selectedImage}
            alt="Movement"
          />
          <h3 className={`text-center text-white transition-all duration-500 ease-in-out ${
            scrolled ? 'text-xl sm:text-2xl' : 'sm:text-3xl text-2xl'
          }`}>
            {selectedMvmtName}
          </h3>
        </div>
        {scrolled && (
          <span
            onClick={handleCloseModal}
            className="rounded-full p-2"
          >
            <HiX size={20} />
          </span>
        )}
        
      </div>

      {!scrolled && (
        <div className="absolute top-8 right-2">
          <span
            onClick={handleCloseModal}
            className="rounded-full bg-[#202020] p-2"
          >
            <HiX size={20} />
          </span>
        </div>
      )}
        <div className="flex-1 overflow-y-auto pb-20">
        <div className="my-4 flex flex-col justify-center items-center pb-16">
          {sectionWithLoadArray.includes(sectionCode) &&
            movement.totalTimesPerformed > 0 && (
              <div className="flex flex-col">
                <p className="my-8 rounded-lg border p-1 text-center text-white">
                  You have done this exercise{' '}
                  <span className="text-green">
                    {movement.totalTimesPerformed}{' '}
                  </span>
                  {movement.totalTimesPerformed === 1 ? 'time' : 'times'}
                </p>
                <AnimatedComponent key={Math.random() * 1000}>
                <ChartComponent data={movement} />
                </AnimatedComponent>   
                <p className=" my-4 text-center text-base">
                  Your personal record is{' '}
                  <span className="rounded-lg bg-floYellow p-0.5 font-bold text-black">
                    {movement.personalRecord} {''}KG
                  </span>
                </p>
              </div>
            )}
              <div className='h-auto w-[350px] sm:w-[1300px] mt-4 sm:mt-10'>
                <div className='flex flex-col space-y-4'>
                 <div className='w-full h-auto bg-black rounded-lg sm:px-10 sm:py-10 px-4 py-4'>
                 <h1 className='sm:text-2xl text-xl flex gap-1 text-[#7E87EF] font-700'><span className='mt-[4px]'><IoIosSearch /></span> Focus Area</h1>
                 <div className='flex sm:gap-4 gap-2'>
                 {movement?.focus_area?.map((det,index)=>{
                  return (
                    <div className='p-2 border-white border-[1px] rounded-md inline-block gap-2 w-auto h-auto mt-3 justify-center items-center ml-2'>
                    <p className='text-white sm:text-base text-sm'>{det}</p>
                    </div>
                  )
                 })}
                  </div>           
                 <h1 className='sm:text-2xl text-xl mt-6 text-[#F5C563] font-700 gap-1 flex'><span className='mt-[4px]'><GiSkippingRope /></span> Equipment</h1>
                 <div className='flex sm:gap-4 gap-2'>
                 {movement?.equipment?.map((det,index)=>{
                  return (
                    <div className='p-2 border-white border-[1px] rounded-md inline-block gap-2 w-auto h-auto mt-3 justify-center items-center ml-2'>
                    <p className='text-white sm:text-base text-sm'>{det}</p>
                    </div>
                  )
                 })}
                  </div>
                 </div>
               </div>
              </div>
              <div className='h-auto w-[350px] sm:w-[1300px] mt-4'>
                <div className='flex flex-col space-y-4'>
                 <div className='w-full h-auto bg-black rounded-lg sm:px-10 sm:py-10 px-4 py-4'>
                 <h1 className='sm:text-3xl text-2xl flex gap-1 font-700'>Setup</h1>
                 <ul className='flex flex-col sm:gap-4 gap-2 sm:mt-2 mt-0'>
                 {movement?.setup?.map((det,index)=>{
                  return ( 
                    
                    <li key={index} className='text-white sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#7E87EF] rounded-full mt-2"></div>
                      <span className='text-lg'>{capitalizeFirstLetter(det)}</span>
                    </li>
                    
                  )
                 })}
                  </ul>           
                 </div>
               </div>
              </div>
              <div className='h-auto w-[350px] sm:w-[1300px] mt-4'>
                <div className='flex flex-col space-y-4'>
                 <div className='w-full h-auto bg-black rounded-lg sm:px-10 sm:py-10 px-4 py-4'>
                 <h1 className='sm:text-3xl text-2xl flex gap-1 font-700'>Execution</h1>
                 <ul className='flex flex-col sm:gap-4 gap-2 sm:mt-2 mt-0'>
                 {movement?.execution?.map((det,index)=>{
                  return ( 
                    
                    <li key={index} className='text-white sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#5ECC7B] rounded-full mt-2"></div>
                      <span className='text-lg'>{det}</span>
                    </li>
                    
                  )
                 })}
                  </ul>           
                 </div>
               </div>
              </div>
              <div className='h-auto w-[350px] sm:w-[1300px] mt-4'>
                <div className='flex flex-col space-y-4'>
                 <div className='w-full h-auto bg-black rounded-lg sm:px-10 sm:py-10 px-4 py-4'>
                 <h1 className='sm:text-3xl text-2xl flex gap-1 font-700'>Completion</h1>
                 <ul className='flex flex-col sm:gap-4 gap-2 sm:mt-2 mt-0'>
                 {movement?.completion?.map((det,index)=>{
                  return ( 
                    
                    <li key={index} className='text-white sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#F5C563] rounded-full mt-2"></div>
                      <span className='text-lg'>{det}</span>
                    </li>
                    
                  )
                 })}
                  </ul>           
                 </div>
               </div>
              </div>
              <div className='h-auto w-[350px] sm:w-[1300px] mt-4'>
                <div className='flex flex-col space-y-4'>
                 <div className='w-full h-auto bg-black rounded-lg sm:px-10 sm:py-10 px-4 py-4'>
                 <h1 className='sm:text-3xl text-2xl flex gap-1 font-700'>Key Tips</h1>
                 <ul className='flex flex-col sm:gap-4 gap-2 sm:mt-2 mt-0'>
                 {movement?.key_tips?.map((det,index)=>{
                  return ( 
                    
                    <li key={index} className='text-white sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#DDF988] rounded-full mt-2"></div>
                      <span className='text-lg'>{det}</span>
                    </li>
                    
                  )
                 })}
                  </ul>           
                 </div>
               </div>
              </div>
        </div>
        </div>
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-[#141414] bg-opacity-80 p-2 rounded-xl">
        <button
          onClick={closeMovementDetail}
          className="workout-gradient-button h-10 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-bold text-black"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default MovementDetail;

