import { HiX } from 'react-icons/hi';
import ChartComponent from './ChartComponent';
import AnimatedComponent from '../../components/AnimatedComponent';
import { IoIosSearch } from "react-icons/io";
import { GiSkippingRope } from "react-icons/gi";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const sectionWithLoadArray = ['ISO', 'MR', 'STR', 'HYP', 'HYP2', 'HYP3'];
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const MovementDetail = ({ movement, sectionCode, closeMovementDetail }) => {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
        controls.start("scrolled");
      } else {
        setScrolled(false);
        controls.start("notScrolled");
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const handleCloseModal = () => {
    closeMovementDetail();
  };

  const selectedImage = movement.link[0];
  const selectedMvmtName = movement.name;

  const headerVariants = {
    notScrolled: {
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      top:'12px',
    },
    scrolled: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 16px',
      backgroundColor: '#141414',
      zIndex: 50,
    },
  };

  const imageVariants = {
    notScrolled: { 
      height: '160px',
      width: 'auto',
      marginBottom: '16px',
      borderRadius: '0%',
      marginTop:'30px',
    },
    scrolled: { 
      height: '48px',
      width: '48px',
      marginRight: '16px',
      borderRadius: '15%',
    },
  };

  const titleVariants = {
    notScrolled: { fontSize: '32px' },
    scrolled: { fontSize: '20px' },
  };

  const closeButtonVariants = {
    notScrolled: { 
      opacity: 1, 
      position: 'absolute',
      top: '8px',
      right: '8px',
    },
    scrolled: { 
      opacity: 1,
      position: 'relative',
      top: 0,
      right: 0,
    },
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen bg-[#141414] overflow-x-hidden">
        <motion.div
        initial="notScrolled"
        animate={controls}
        variants={headerVariants}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="flex bg-[#141414]"
      >
        <motion.img
          variants={imageVariants}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          src={selectedImage}
          alt="Movement"
        />
        <motion.h3
          variants={titleVariants}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="text-center text-white"
        >
          {selectedMvmtName}
        </motion.h3>
        <motion.span
          variants={closeButtonVariants}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          onClick={handleCloseModal}
          className="rounded-full bg-[#202020] p-2"
        >
          <HiX size={20} />
        </motion.span>
      </motion.div>
        <div className={`flex-1 overflow-y-auto pb-10 ${scrolled ? 'mt-16' : ''}`}>
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

