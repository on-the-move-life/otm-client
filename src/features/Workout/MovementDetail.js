import { HiX } from 'react-icons/hi';
import ChartComponent from './ChartComponent';
//import AnimatedComponent from '../../components/AnimatedComponent';
import { IoIosSearch } from "react-icons/io";
import { GiSkippingRope } from "react-icons/gi";
import { useEffect, useState } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const sectionWithLoadArray = ['ISO', 'MR', 'STR', 'HYP', 'HYP2', 'HYP3']

const MovementDetail = ({ movement, sectionCode, closeMovementDetail }) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useViewportScroll();

  const imageSize = useTransform(scrollY, [0, 50], [160, 70]);
  const imageRadius = useTransform(scrollY, [0, 50], [0, 8]);
  const headerPadding = useTransform(scrollY, [0, 50], [0, 12]);
  const titleSize = useTransform(scrollY, [0, 50], [20, 20]);
  const titleFontWeight = useTransform(scrollY, [0, 50], [400, 900]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleCloseModal = () => {
    closeMovementDetail();
  };

  const selectedImage = movement.link[0];
  const selectedMvmtName = movement.name;
  const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
 

  return (
    <div className="relative flex flex-col min-h-screen w-screen bg-[#141414] overflow-x-hidden">
        <motion.div
        style={{
          position: scrolled ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: scrolled ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: scrolled ? 'space-between' : 'center',
          padding: headerPadding,
          backgroundColor: '#141414',
          zIndex: 50,
        }}
      >
        {scrolled ? (
          <>
          <motion.div style={{display: 'flex', gap: 12, alignItems: 'center',
                justifyContent: 'center' }}>
            <motion.img
              style={{
                height: imageSize,
                width: imageSize,
                borderRadius: imageRadius,
              }}
              src={selectedImage}
              alt="Movement"
            />
            <motion.h3
              style={{
                fontSize: titleSize,
                fontWeight: titleFontWeight,
                marginLeft: 0,
                flex: 'none',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="text-white whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {capitalizeFirstLetter(selectedMvmtName)}
            </motion.h3>
            </motion.div>
          </>
        ) : (
          <>
          <motion.div>
            <motion.h3
              style={{
                fontSize: titleSize,
                fontWeight: titleFontWeight,
                marginBottom: 16,
              }}
              className="text-center text-white mt-10"
            >
              {capitalizeFirstLetter(selectedMvmtName)}
            </motion.h3>
            <motion.img
              style={{
                height: imageSize,
                width: imageSize,
                borderRadius: imageRadius,
              }}
              src={selectedImage}
              alt="Movement"
            />
            </motion.div>
          </>
        )}
        
        <motion.span
          style={{
            opacity: 1,
            position: scrolled ? 'relative' : 'absolute',
            top: scrolled ? 0 : 32,
            right: scrolled ? 0 : 8,
          }}
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
                <div key={Math.random() * 1000}>
                <ChartComponent data={movement} />
                </div>   
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
                    <p className='text-[#B1B1B1] sm:text-base text-xs'>{det}</p>
                    </div>
                  )
                 })}
                  </div>           
                 <h1 className='sm:text-2xl text-xl mt-6 text-[#F5C563] font-700 gap-1 flex'><span className='mt-[4px]'><GiSkippingRope /></span> Equipment</h1>
                 <div className='flex sm:gap-4 gap-2'>
                 {movement?.equipment?.map((det,index)=>{
                  return (
                    <div className='p-2 border-white border-[1px] rounded-md inline-block gap-2 w-auto h-auto mt-3 justify-center items-center ml-2'>
                    <p className='text-[#B1B1B1] sm:text-base text-xs'>{det}</p>
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
                    
                    <li key={index} className='text-[#B1B1B1] sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#7E87EF] rounded-full mt-1"></div>
                      <span className='sm:text-lg text-sm'>{capitalizeFirstLetter(det)}</span>
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
                    
                    <li key={index} className='text-[#B1B1B1] sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#5ECC7B] rounded-full mt-1"></div>
                      <span className='sm:text-lg text-sm'>{capitalizeFirstLetter(det)}</span>
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
                    
                    <li key={index} className='text-[#B1B1B1] sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#F5C563] rounded-full mt-1"></div>
                      <span className='sm:text-lg text-sm'>{capitalizeFirstLetter(det)}</span>
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
                    
                    <li key={index} className='text-[#B1B1B1] sm:text-base text-sm flex gap-2 mt-2'>
                      <div className="w-3 h-3 bg-[#DDF988] rounded-full mt-1"></div>
                      <span className='sm:text-lg text-sm'>{capitalizeFirstLetter(det)}</span>
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

