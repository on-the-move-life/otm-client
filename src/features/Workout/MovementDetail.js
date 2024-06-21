import React, { useEffect, useMemo, useState } from 'react';
import { HiX } from 'react-icons/hi';
import AnimatedComponent from '../../components/AnimatedComponent';
import { fetchExerciseDetails } from './fetchAiData';

const MovementDescriptionCard = ({ heading, details, color , index }) => {

  const colors = useMemo(() => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'], []);
  const headingColor = colors[(index % colors.length)];
  return (
    <div className="bg-black sm:w-72 h-auto p-4 rounded-lg w-[340px]">
      <h2 className="text-2xl font-bold mb-4" style={{fontWeight: 600, color: headingColor}}>{heading}</h2>
      <ul className="">
        {details.map((point, idx) => (
          <li key={idx} className="mb-2 flex">
            <span className={`w-2.5 h-2 rounded-full mt-3 mr-2 bg-white`}></span>
             <span className='sm:text-lg text-lg font-light'>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
const FocusEquipmentCard = ({ heading, subHeaders ,index}) => {
  const colors = useMemo(() => ['#7E87EF', '#F5C563', '#DDF988', '#5ECC7B'], []);
  const headingColor = colors[(index % colors.length)];
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4" style={{fontWeight: 600, color: headingColor}}>{heading}</h2>
      <ul className="flex gap-4">
        {subHeaders.map((subItem, idx) => (
          <li key={idx} className="mb-2 flex border-[1px] border-white px-3 py-2 sm:px-6 rounded-md">
            <span className='text-sm sm:text-lg'>{subItem.subHeading}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MovementDetail = ({ movement, sectionCode, closeMovementDetail }) => {
  const [aiData, setAiData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchExerciseDetails(movement.name);
      setAiData(data);
    };

    getData();
  }, [movement.name]);

  if (!aiData) {
    return <div>Loading...</div>;
  }

  const { movementDescription, focusData } = aiData;
  const selectedImage = movement.link[0];
  const selectedMvmtName = movement.name;
 
  const handleCloseModal = () => {
    closeMovementDetail();
  };

  return (
    <AnimatedComponent key={Math.random() * 1000}>
      <div
        className="flex min-h-screen w-screen flex-col overflow-x-hidden overflow-y-scroll bg-[#141414] pt-8 px-4"
        style={{ maxHeight: 'content-fit' }}
      >
        <div className=" flex justify-end">
          <span
            onClick={handleCloseModal}
            className="rounded-full bg-[#202020] p-2"
          >
            <HiX size={20} />
          </span>
        </div>
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="flex h-auto w-[30%] sm:w-full items-center justify-center">
            <img
              className="h-full rounded-2xl"
              src={selectedImage}
              alt="Movement"
            />
          </div>
          <h3 className="text-center sm:text-3xl text-xl mt-2">{selectedMvmtName}</h3>

          <div className="relative overflow-y-auto sm:w-full sm:h-auto h-[550px] w-[360px] flex flex-col hide-scrollbar sm:ml-0 sm:pb-20 pb:0 sm:items-center sm:justify-center mt-6 pb-6">
          <div className='sm:w-[90%] sm:h-auto h-[280px] w-[340px] bg-black rounded-lg sm:mt-12 mt-4 flex flex-col sm:gap-4 px-4 py-4 sm:px-10 sm:ml-0 ml-3'>
          {focusData.data.map((item, index) => (
          <FocusEquipmentCard
            heading={item.heading}
            subHeaders={item.subHeaders}
            key={item.heading}
            index={index}
          />
        ))}
          </div>
          <div className='flex sm:w-full w-[360px] flex-col items-center justify-center sm:flex-row sm:gap-6 gap-3 sm:mt-6 mt-3'>
           {movementDescription.data.map((item, index) => (
           <MovementDescriptionCard
          heading={item.heading}
          details={item.details}
          color={item.color}
          key={item.heading}
          index={index}
          />
          ))}
          </div>
           </div>
           <div className='absolute z-10 w-[90%] flex items-center justify-center bottom-2'>
          <button
            onClick={closeMovementDetail}
            className="workout-gradient-button sm:text-lg items-center justify-center flex bg-white p-4 shadow-md text-center h-14 w-full rounded-xl border-[rgba(209,209,209,0.70)] font-bold text-black"
          >
           <span>Back</span>
          </button>
          </div>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default MovementDetail;
