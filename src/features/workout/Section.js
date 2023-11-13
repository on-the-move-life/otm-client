import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import { getWorkout, updateWorkout } from './WorkoutSlice';
import SectionItem from './SectionItem';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import DataInputComponent from './DataInputComponent';
const WORKOUT_THEME_OPTIONS = [
  'Horizontal Push',
  'Horizontal Pull',
  'Squat',
  'Vertical Push',
  'Posterior Chain',
];

const EQUIPMENT_OPTIONS = ['Choose equipments', 'none', 'band-dumbbell', 'gym'];

const WORKOUT_DURATION_OPTIONS = ['REGULAR', 'none', 'band-dumbbell', 'gym'];

Modal.setAppElement('#root'); // Set the root element for screen readers

const Section = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout);

  useEffect(() => {
    if (status === 'loading' || status === 'ready') {
      dispatch(getWorkout());
    }
  }, [dispatch, status]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStart = () => {
    navigate('/section-details', {
      state: { sectionList: workoutData.program, index: 0 },
    });
  };

  const handleUpdateWorkout = () => {
    dispatch(updateWorkout());
  };

  const handleCustomize = () => {
    openModal();
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error>Error Message</Error>; // Replace with actual error message
  }

  const topBgImgStyle = {
    backgroundImage: "url('./assets/workout-top.png')",
  };

  const bgStyle = {
    background:
      'linear-gradient(96deg, #999 1.59%, #616161 15%, #323232 19.77%, #818181 31.33%, #E7E7E7 43.14%, #848484 56.78%, #474747 67.1%, #C2C2C2 72.27%, #FFF 80.72%, #B7B7B7 87.42%, #242424 96.75%)',
    mixBlendMode: 'screen',
  };

  return (
    <div className="bg-slate-50 h-[844px] w-[390px] pl-4">
      <div
        className="relative left-[-14px] top-2 h-[233px] w-[390px] pb-5"
        style={topBgImgStyle}
      >
        <h1 className="relative left-5 top-10 bg-clip-text text-[32px] font-[SF_Pro_Display] font-medium not-italic leading-[40px]">
          Rishi Solanki
        </h1>
        <p className="relative left-5 top-10 text-[12px] font-[SF_Pro_Text] font-extralight not-italic leading-[17px]">
          Let's crush this workout
        </p>
        <div className="fixed left-[52%] top-20 flex h-[49px] w-[43px] flex-shrink-0 flex-col items-center justify-center rounded-[8px] border-[1px] border-[#B1B1B1] border-[solid] bg-[rgba(37,_37,_37,_0.30)] backdrop-blur-[5px] backdrop-filter">
          <p className="text-[8px] font-[510]">{workoutData.day.split(" ")[0]} </p>
          <p className="text-[8px] font-[510]">Day </p>
          <p className="text-[17px] font-extrabold">{workoutData.day.split(" ")[2]}</p>
        </div>
        {/* <div className="fixed left-[52%] top-40 flex flex-col items-center justify-center">
          <p className="text-[12px] font-semibold">35 mins </p>
          <p className="text-[12px] font-semibold">740 Kcal</p>
        </div> */}
        <p className="relative left-5 top-20 text-[12px] font-[SF_Pro_Text] font-extralight not-italic leading-[17px]">
          Today's focus
        </p>
        <h2 className="relative left-5 top-20 text-[20px] font-[SF_Pro_Display] font-medium not-italic leading-[32px]">
          Theme: {workoutData.theme}
        </h2>
      </div>
      {workoutData.program.map((data, index) => (
        <SectionItem
          sectionList={workoutData.program}
          index={index}
          key={index}
        />
      ))}
      <div
        className="mt-4 flex h-[49px] w-[358px] items-center justify-center rounded-[12px] border-[2px] border-[rgba(209,209,209,0.70)] border-[solid] mix-blend-screen"
        style={bgStyle}
        onClick={handleStart}
      >
        <p className="static text-[18px] font-[SF_Pro_Display] font-medium not-italic leading-[normal] text-[#000]">
          Start
        </p>
      </div>
      <div
        className="static top-[] mt-4 flex h-[49px] w-[358px] items-center justify-center rounded-[12px] border-[2px]"
        onClick={handleCustomize}
      >
        <p className="text-[18px] font-[SF_Pro_Display] font-medium not-italic leading-[normal]">
          Customize Workout
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Customize Your Workout Modal"
        className="h-[783px] w-[390px] flex-shrink-0 rounded-[12px] bg-[#141414] p-4"
      >
        <span
          onClick={closeModal}
          className="close-button relative left-[90%] top-2 mr-2 mt-2 cursor-pointer rounded-full p-2"
        >
          X
        </span>
        <h3 className="relative left-16 mb-24 text-[20px] font-[SF_Pro_Display] font-medium not-italic leading-[32px]">
          Customize your workout
        </h3>

        <DataInputComponent
          inputId="customTheme"
          inputType="select"
          inputOptions={WORKOUT_THEME_OPTIONS}
          placeholder="select"
          label="THEME"
          twClasses="block w-full px-4 py-2 border border-gray-300 bg-transparent focus:outline-none rounded-lg border-[1px] border-[solid] border-[#2A2A2A] gap-[8px]"
        />
        <DataInputComponent
          inputId="customEquipments"
          inputType="select"
          inputOptions={EQUIPMENT_OPTIONS}
          placeholder="Choose equipment"
          label="EQUIPMENT (OPTIONAL)"
          twClasses="block w-full px-4 py-2 border border-gray-300 bg-transparent focus:outline-none rounded-lg border-[1px] border-[solid] border-[#2A2A2A] gap-[8px]"
        />
        <DataInputComponent
          inputId="customDuration"
          inputType="select"
          inputOptions={WORKOUT_DURATION_OPTIONS}
          placeholder="REGULAR"
          label="WORKOUT DURATION"
          twClasses="block w-full px-4 py-2 border border-gray-300 bg-transparent focus:outline-none rounded-lg border-[1px] border-[solid] border-[#2A2A2A] gap-[8px]"
        />
        <div
          className="relative top-[35%] flex h-[49px] w-[358px] flex-shrink-0 items-center justify-center rounded-[12px] border-[2px] border-[rgba(209,209,209,0.70)] border-[solid] mix-blend-screen"
          style={bgStyle}
          onClick={handleUpdateWorkout}
        >
          <p className="text-[18px] font-medium not-italic leading-[normal] text-[#000]">
            Update
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Section;
