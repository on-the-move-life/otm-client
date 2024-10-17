import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataInputComponent from './DataInputComponent';
import { updateWorkout } from './WorkoutSlice';
import { HiX } from 'react-icons/hi';
import AnimatedComponent from '../../components/AnimatedComponent';
import { RxCross1 } from 'react-icons/rx';

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

const UpdateWorkout = ({ onClose }) => {
  const { inputValues, workout } = useSelector((store) => store.workoutReducer);
  const dispatch = useDispatch();

  // const [isModalOpen, setIsModalOpen] = useState(false);

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
      // setIsModalOpen(false);
      // onClose(false)
      dispatch(updateWorkout(reqBody));
    } catch (error) {
      // Handle errors if needed
      console.error('Error updating workout:', error);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-y-auto bg-black-opacity-65 ">
      <div className="p-4 pb-20">
        <AnimatedComponent>
          <div className="flex justify-end">
            <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-mediumGray ">
              <RxCross1 onClick={() => onClose(false)} className="" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="mt-5 text-center text-[24px] uppercase text-offwhite">
              Customize your workout
            </h3>
            <p className="mt-4 text-center text-[15px] text-offwhite sm:text-lg">
              Easily update your latest workout by selecting a theme, duration,
              and available equipment.
            </p>
            <section className="mt-8">
              <DataInputComponent
                inputId="customTheme"
                inputType="select"
                inputOptions={WORKOUT_THEME_OPTIONS}
                placeholder="select"
                label="THEME"
              />
              <DataInputComponent
                inputId="customEquipments"
                inputType="select"
                inputOptions={EQUIPMENT_OPTIONS}
                placeholder="Choose equipment"
                label="EQUIPMENT (OPTIONAL)"
              />
              <DataInputComponent
                inputId="customDuration"
                inputType="select"
                inputOptions={WORKOUT_DURATION_OPTIONS}
                placeholder="REGULAR"
                label="WORKOUT DURATION"
              />
            </section>
          </div>
        </AnimatedComponent>
      </div>
      <div className="fixed bottom-0 left-0 right-0  p-4">
        <button
          className=" h-11 w-full items-center justify-center rounded-lg border bg-[#F8F8F8] text-xl font-bold text-black"
          onClick={handleUpdateWorkout}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateWorkout;
