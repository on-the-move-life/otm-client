import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DataInputComponent from './DataInputComponent';
import { setLoading, updateWorkout } from './WorkoutSlice';
import { HiX } from 'react-icons/hi';

const WORKOUT_BASE_THEME_OPTIONS = [
  'Horizontal Push',
  'Horizontal Pull',
  'Squat',
  'Vertical Push',
  'Posterior Chain',
];

const EQUIPMENT_OPTIONS = [
  'At gym (full equipment)',
  'At home (bands & dumbbell)',
];

const WORKOUT_DURATION_OPTIONS = ['Regular', 'Shorter'];

Modal.setAppElement('#root'); // Set the root element for screen readers

const UpdateWorkout = () => {
  const { inputValues, workout } = useSelector((store) => store.workoutReducer);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const WORKOUT_THEME_OPTIONS = WORKOUT_BASE_THEME_OPTIONS.filter(
    (theme) => theme !== workout.theme,
  );
  WORKOUT_THEME_OPTIONS.unshift(workout.theme);

  const handleUpdateWorkout = () => {
    const { customTheme, customEquipments, customDuration } = inputValues;
    const reqBody = {
      memberCode: workout.memberCode,
      theme: customTheme || workout.theme,
      equipment:
        customEquipments === 'At home (bands & dumbbell)'
          ? 'band-dumbbell'
          : 'gym',
      isLite: customDuration,
    };
    try {
      setIsModalOpen(false);
      dispatch(updateWorkout(reqBody));
    } catch (error) {
      // Handle errors if needed
      console.error('Error updating workout:', error);
    }
  };

  return (
    <>
      <button
        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-white bg-[#050505]"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-lg">Customize Workout</p>
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Customize Your Workout Modal"
        className="h-screen w-screen flex-shrink-0 bg-[#141414] p-4"
      >
        <div className="flex justify-end">
          <span onClick={() => setIsModalOpen(false)}>
            <HiX size={20} />
          </span>
        </div>
        <div className="flex h-screen flex-col justify-around">
          <h3 className="workout-gradient-text text-center text-xl uppercase">
            Customize your workout
          </h3>

          <section>
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
              twClasses="block w-full px-4 py-2 border border-gray-300 bg-transparent focus:outline-none rounded-lg border border-[#2A2A2A] gap-[8px]"
            />
          </section>
          <button
            className="workout-gradient-button h-11 w-full items-center  justify-center rounded-xl border border-[rgba(209,209,209,0.70)] text-xl font-bold text-black"
            onClick={() => handleUpdateWorkout()}
          >
            Update
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UpdateWorkout;
