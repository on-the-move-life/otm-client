//MovementDetail.js
import { HiX } from 'react-icons/hi';
import ChartComponent from './ChartComponent';
//import AnimatedComponent from '../../components/AnimatedComponent';
import { IoIosSearch } from 'react-icons/io';
import { GiSkippingRope } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const sectionWithLoadArray = ['ISO', 'MR', 'STR', 'HYP', 'HYP2', 'HYP3'];

const MovementDetail = ({
  movement,
  isSectionCodeAvailable,
  closeMovementDetail,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useViewportScroll();

  const imageSize = useTransform(scrollY, [0, 50], [200, 70]);
  const imageRadius = useTransform(scrollY, [0, 50], [0, 8]);
  const headerPadding = useTransform(scrollY, [0, 50], [0, 12]);
  const titleSize = useTransform(scrollY, [0, 50], [20, 20]);
  const titleFontWeight = useTransform(scrollY, [0, 50], [400, 500]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
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
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="relative flex min-h-screen w-screen flex-col overflow-x-hidden bg-[#141414]">
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
            <motion.div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
                  justifyContent: 'center',
                }}
                className="overflow-hidden text-white text-ellipsis whitespace-nowrap"
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
                className="mt-10 text-center text-white"
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
      <div
        className={`flex-1 overflow-y-auto pb-10 ${scrolled ? 'mt-16' : ''}`}
      >
        <div className="flex flex-col items-center justify-center pb-16 my-4">
          {isSectionCodeAvailable && movement.totalTimesPerformed > 0 && (
            <div className="flex flex-col">
              <p className="py-1 my-8 text-sm text-center text-white border rounded-lg sm:text-base">
                You have done this exercise{' '}
                <span className="text-green">
                  {movement.totalTimesPerformed}{' '}
                </span>
                {movement.totalTimesPerformed === 1 ? 'time' : 'times'}
              </p>
              <div key={Math.random() * 1000}>
                <ChartComponent data={movement} />
              </div>
              <p className="my-4 text-sm text-center  sm:text-base">
                Your personal record is{' '}
                <span className="rounded-lg bg-floYellow p-0.5 font-bold text-black">
                  {movement.personalRecord} {''}KG
                </span>
              </p>
            </div>
          )}
          <div className="mt-4 h-auto w-[350px] sm:mt-10 sm:w-[1300px]">
            <div className="flex flex-col space-y-4">
              <div className="w-full h-auto px-4 py-4 bg-black rounded-lg sm:px-10 sm:py-10">
                <h1 className="font-700 flex gap-1 text-[14px] text-[#7E87EF] sm:text-xl">
                  <span className="mt-[4px]">
                    <IoIosSearch />
                  </span>{' '}
                  Focus Area
                </h1>
                <div className="flex gap-2 sm:gap-4">
                  {movement?.focus_area?.map((det, index) => {
                    return (
                      <div className="ml-2 mt-3 inline-block h-auto w-auto items-center justify-center gap-2 rounded-md border-[1px] border-white p-2">
                        <p className="text-[9.333px] text-[#B1B1B1] sm:text-base">
                          {det}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <h1 className="font-700 mt-6 flex gap-1 text-[14px] text-[#F5C563] sm:text-xl">
                  <span className="mt-[4px]">
                    <GiSkippingRope />
                  </span>{' '}
                  Equipment
                </h1>
                <div className="flex gap-2 sm:gap-4">
                  {movement?.equipment && movement.equipment.length > 0 ? (
                    movement.equipment.map((det, index) =>
                      det.trim() !== '' ? (
                        <div
                          key={index}
                          className="ml-2 mt-3 inline-block h-auto w-auto items-center justify-center gap-2 rounded-md border-[1px] border-white p-2"
                        >
                          <p className="text-[9.333px] text-[#B1B1B1] sm:text-base">
                            {det}
                          </p>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="ml-2 mt-3 inline-block h-auto w-auto items-center justify-center gap-2 rounded-md border-[1px] border-white p-2"
                        >
                          <p className="text-[9.333px] text-[#B1B1B1] sm:text-base">
                            None
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <div className="ml-2 mt-3 inline-block h-auto w-auto items-center justify-center gap-2 rounded-md border-[1px] border-white p-2">
                      <p className="text-[9.333px] text-[#B1B1B1] sm:text-base">
                        None
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-auto w-[350px] sm:w-[1300px]">
            <div className="flex flex-col space-y-4">
              <div className="w-full h-auto px-4 py-4 bg-black rounded-lg sm:px-10 sm:py-10">
                <h1 className="font-700 flex gap-1 text-[20px] sm:text-2xl">
                  Setup
                </h1>
                <ul className="flex flex-col gap-2 mt-0 sm:mt-2 sm:gap-4">
                  {movement?.setup?.slice(0, -1).map((det, index) => {
                    return (
                      <li
                        key={index}
                        className="mt-2 flex gap-2 text-sm text-[#B1B1B1] sm:text-base"
                      >
                        <div className="mt-1 h-3 w-3 rounded-full bg-[#7E87EF] sm:mt-2"></div>
                        <span className="text-sm sm:text-lg">
                          {capitalizeFirstLetter(det)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 h-auto w-[350px] sm:w-[1300px]">
            <div className="flex flex-col space-y-4">
              <div className="w-full h-auto px-4 py-4 bg-black rounded-lg sm:px-10 sm:py-10">
                <h1 className="font-700 flex gap-1 text-[20px] sm:text-2xl">
                  Execution
                </h1>
                <ul className="flex flex-col gap-2 mt-0 sm:mt-2 sm:gap-4">
                  {movement?.execution?.slice(0, -1).map((det, index) => {
                    return (
                      <li
                        key={index}
                        className="mt-2 flex gap-2 text-sm text-[#B1B1B1] sm:text-base"
                      >
                        <div className="mt-1 h-3 w-3 rounded-full bg-[#5ECC7B] sm:mt-2"></div>
                        <span className="text-sm sm:text-lg">
                          {capitalizeFirstLetter(det)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 h-auto w-[350px] sm:w-[1300px]">
            <div className="flex flex-col space-y-4">
              <div className="w-full h-auto px-4 py-4 bg-black rounded-lg sm:px-10 sm:py-10">
                <h1 className="font-700 flex gap-1 text-[20px] sm:text-2xl">
                  Completion
                </h1>
                <ul className="flex flex-col gap-2 mt-0 sm:mt-2 sm:gap-4">
                  {movement?.completion?.slice(0, -1).map((det, index) => {
                    return (
                      <li
                        key={index}
                        className="mt-2 flex gap-2 text-sm text-[#B1B1B1] sm:text-base"
                      >
                        <div className="mt-1 h-3 w-3 rounded-full bg-[#F5C563] sm:mt-2"></div>
                        <span className="text-sm sm:text-lg">
                          {capitalizeFirstLetter(det)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 h-auto w-[350px] sm:w-[1300px]">
            <div className="flex flex-col space-y-4">
              <div className="w-full h-auto px-4 py-4 bg-black rounded-lg sm:px-10 sm:py-10">
                <h1 className="font-700 flex gap-1 text-[20px] sm:text-2xl">
                  Key Tips
                </h1>
                <ul className="flex flex-col gap-2 mt-0 sm:mt-2 sm:gap-4">
                  {movement?.key_tips?.slice(0, -1).map((det, index) => {
                    return (
                      <li
                        key={index}
                        className="mt-2 flex gap-2 text-sm text-[#B1B1B1] sm:text-base"
                      >
                        <div className="mt-1 h-3 w-3 rounded-full bg-[#DDF988] sm:mt-2"></div>
                        <span className="text-sm sm:text-lg">
                          {capitalizeFirstLetter(det)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl bg-[#141414] bg-opacity-80 p-2">
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
