import React, { useState } from 'react';
import DataInputComponent from './DataInputComponent';

const WORKOUT_THEME_OPTIONS = [
  'Horizontal Push',
  'Horizontal Pull',
  'Squat',
  'Vertical Push',
  'Posterior Chain',
];

const EQUIPMENT_OPTIONS = ['none', 'band-dumbbell', 'gym'];

const WORKOUT_DURATION_OPTIONS = ['none', 'band-dumbbell', 'gym'];

const CustomizeWorkout = () => {
  const [showModal, setShowModal] = useState();
  
  return (
    <div className="h-[783px] w-[390px] flex-shrink-0 rounded-[12px] bg-[#141414]">
      <span>X</span>
      <h3>Customize your workout </h3>
      <DataInputComponent
        inputId="custom-theme"
        inputType="select"
        inputOptions={WORKOUT_THEME_OPTIONS}
        placeholder="select"
        label="THEME"
      />
      <DataInputComponent
        inputId="custom-equipments"
        inputType="select"
        inputOptions={EQUIPMENT_OPTIONS}
        placeholder="Choose equipment"
        label="EQUIPMENT (OPTIONAL)"
      />
      <DataInputComponent
        inputId="custom-duration"
        inputType="select"
        inputOptions={WORKOUT_DURATION_OPTIONS}
        placeholder="REGULAR"
        label="Workout duration"
      />
    </div>
  );
};

export default CustomizeWorkout;
