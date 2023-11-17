import { useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import SectionItem from './SectionItem';
import { useNavigate } from 'react-router-dom';
import ModalComponent from './ModelComponent';
import { HiArrowNarrowLeft } from 'react-icons/hi';

const Section = () => {
  const navigate = useNavigate();
  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout);

  const handleStart = () => {
    navigate('/section-details', {
      state: { sectionList: workoutData.program, index: 0 },
    });
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error>Error Message</Error>; // Replace with actual error message
  }

  return (
    // <div className="bg-slate-50 h-screen w-screen px-4">
    //   <div className="flex basis-1/4" style={topBgImgStyle}>
    //     <h1 className="relative left-5 top-10 bg-clip-text text-[32px] not-italic leading-[40px]">
    //       Rishi Solanki
    //     </h1>
    //     <p className="relative left-5 top-10 text-[12px] not-italic leading-[17px]">
    //       Let's crush this workout
    //     </p>
    //     <div className="fixed left-[52%] top-20 flex h-[49px] w-[43px] flex-shrink-0 flex-col items-center justify-center rounded-[8px] border-[1px] border-[#B1B1B1] border-[solid] bg-[rgba(37,_37,_37,_0.30)] backdrop-blur-[5px] backdrop-filter">
    //       <p className="text-[8px] font-[510]">
    //         {workoutData.day.split(' ')[0]}{' '}
    //       </p>
    //       <p className="text-[8px] font-[510]">Day </p>
    //       <p className="text-[17px] font-extrabold">
    //         {workoutData.day.split(' ')[2]}
    //       </p>
    //     </div>
    //     {/* <div className="fixed left-[52%] top-40 flex flex-col items-center justify-center">
    //       <p className="text-[12px] font-semibold">35 mins </p>
    //       <p className="text-[12px] font-semibold">740 Kcal</p>
    //     </div> */}
    //     <p className="relative left-5 top-20 text-[12px] not-italic leading-[17px]">
    //       Today's focus
    //     </p>
    //     <h2 className="relative left-5 top-20 text-[20px]  not-italic leading-[32px]">
    //       Theme: {workoutData.theme}
    //     </h2>
    //   </div>
    //   {workoutData.program.map((data, index) => (
    //     <SectionItem
    //       sectionList={workoutData.program}
    //       index={index}
    //       key={index}
    //     />
    //   ))}
    //   <div
    //     className="mt-4 flex h-[49px] w-[358px] items-center justify-center rounded-[12px] border-[2px] border-[rgba(209,209,209,0.70)]  mix-blend-screen"
    //     style={bgStyle}
    //     onClick={handleStart}
    //   >
    //     <p className="static text-[18px] not-italic leading-[normal] text-[#000]">
    //       Start
    //     </p>
    //   </div>

    //   <ModalComponent bgStyle={bgStyle} />
    // </div>

    <div className="h-screen w-screen">
      <div className="mb-4 flex h-1/4 bg-workout-cover bg-cover py-6">
        <div className="flex w-full justify-between px-4">
          <div className="flex flex-col">
            <HiArrowNarrowLeft
              size={20}
              onClick={() => {
                navigate('/home');
              }}
            />
            <h1 className="metallic-gradient-text text-2xl font-semibold ">
              Rishi Solanki
            </h1>
            <span className="text-xs font-extralight tracking-wider text-lightGray">
              Let's crush this workout
            </span>
            <span className="mt-6 text-xs tracking-widest text-lightGray">
              TODAY'S FOCUS
            </span>
            <h2 className="text-xl">{workoutData.theme}</h2>
          </div>

          <div className="mt-4 h-fit rounded-xl border border-white p-2 text-center text-[10px] uppercase tracking-widest">
            <p>{workoutData.day.split(' ')[0]} </p>
            <p>Day </p>
            <p className="text-base">{workoutData.day.split(' ')[2]}</p>
          </div>
        </div>
      </div>

      {workoutData.program.map((data, index) => (
        <SectionItem
          sectionList={workoutData.program}
          index={index}
          key={index}
        />
      ))}

      <footer className="sticky bottom-4 w-full px-4">
        <button
          className="metallic-gradient mt-4 flex h-12 w-full items-center justify-center rounded-xl border border-[rgba(209,209,209,0.70)] text-center"
          onClick={handleStart}
        >
          <p className="text-lg font-semibold text-black">START</p>
        </button>
        <ModalComponent />
      </footer>
    </div>
  );
};

export default Section;
