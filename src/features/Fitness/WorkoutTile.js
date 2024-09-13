import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';

const SlideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100px; /* Adjust as needed */
    opacity: 1;
  }
`;

const SlideContainer = styled.div`
  overflow: hidden;
  animation: ${SlideDown} 0.5s ease-out forwards;
  max-height: 100px; /* Adjust as needed */
`;

const WorkoutTile = ({ homeStats, isDisabled, setHomeStats, date }) => {
  const navigate = useNavigate();
  const [morningInput, setMorningInput] = useState(false);
  const [eveningInput, setEveningInput] = useState(false);
  const [tileId, setTileId] = useState(null);
  const memberCode = JSON.parse(localStorage.getItem('user'))['code'];

  const handleMorningTile = (Id, index) => {
    if (
      homeStats['Morning Zone']['movements'][index].movementName === 'Workout'
    ) {
      navigate(
        `/workout/today?movementId=${homeStats['Morning Zone']['movements'][index].movementId}&date=${date}`,
      );
    }

    if (homeStats['Morning Zone']['movements'][index].movementName === 'Flex') {
      navigate(
        `/workout/flex?movementId=${homeStats['Morning Zone']['movements'][index].movementId}&date=${date}`,
      );
    }
    if (
      homeStats['Morning Zone']['movements'][index].movementName ===
      'Dynamic Stretch'
    ) {
      navigate(
        `/warm-up?movementId=${homeStats['Morning Zone']['movements'][index].movementId}&movementName=${homeStats['Morning Zone']['movements'][index].movementName}&date=${date}`,
      );
    }

    if (
      homeStats['Morning Zone']['movements'][index].movementName !==
        'Workout' &&
      homeStats['Morning Zone']['movements'][index].movementName !== 'Flex' &&
      homeStats['Morning Zone']['movements'][index].movementName !== 'Rest'
    ) {
      if (tileId === Id) {
        setMorningInput(!morningInput);
      }
      if (tileId !== Id) {
        setTileId(Id);
        setMorningInput(true);
      }
    }
  };

  const handleEveningTile = (Id, index) => {
    if (homeStats['Evening Zone']['movements'][index].completed !== true) {
      if (
        homeStats['Evening Zone']['movements'][index].movementName === 'Workout'
      ) {
        navigate(
          `/workout/today?movementId=${homeStats['Evening Zone']['movements'][index].movementId}&date=${date}`,
        );
      }

      if (
        homeStats['Evening Zone']['movements'][index].movementName === 'Flex'
      ) {
        navigate(
          `/workout/flex?movementId=${homeStats['Evening Zone']['movements'][index].movementId}&date=${date}`,
        );
      }
      if (
        homeStats['Evening Zone']['movements'][index].movementName ===
        'Dynamic Stretch'
      ) {
        navigate(
          `/warm-up?movementId=${homeStats['Evening Zone']['movements'][index].movementId}&movementName=${homeStats['Evening Zone']['movements'][index].movementName}&date=${date}`,
        );
      }

      if (
        homeStats['Evening Zone']['movements'][index].movementName !==
          'Workout' &&
        homeStats['Evening Zone']['movements'][index].movementName !== 'Flex' &&
        homeStats['Evening Zone']['movements'][index].movementName !== 'Rest'
      ) {
        if (tileId === Id) {
          setEveningInput(!eveningInput);
        }
        if (tileId !== Id) {
          setTileId(Id);
          setEveningInput(true);
        }
      }
    }
  };

  const postWorkoutData = ({ id, text, name }) => {
    if (text === 'Morning Zone') {
      setMorningInput(false);
    }
    if (text === 'Evening Zone') {
      setEveningInput(false);
    }

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/v1/weekly-movement/workout`, {
        movementId: id,
        memberCode: memberCode,
        movementName: name,
        action: 'update_completion_status',
        createdAt: date,
      })
      .then((res) => {
        setHomeStats(res.data.data);
        toast.success('Workout is updated');
      })
      .catch((err) => {
        console.log(err.message);
        toast.error('Error with updating workout');
      })
      .finally(() => {});
  };

  return (
    <div className="flex flex-col gap-2 pb-4 h-max">
      {Object.keys(homeStats['Morning Zone']['movements']).length > 0 && (
        <>
          {homeStats['Morning Zone']['movements'].map((item, index) => {
            return (
              <section key={item.movementId}>
                <div
                  className="flex flex-col items-center"
                  style={{
                    opacity: isDisabled ? 0.5 : 1,
                    pointerEvents: isDisabled ? 'none' : 'auto',
                    cursor: isDisabled ? 'not-allowed' : 'default',
                  }}
                >
                  <div
                    onClick={() => {
                      item.completed !== true &&
                        handleMorningTile(item.movementId, index);
                    }}
                    className={`1 relative z-10 flex h-[85px] w-full grow items-center justify-between  rounded-xl bg-cover py-2 pl-4 pr-7 ${
                      item.movementName === 'Flex' ||
                      item.movementName === 'Workout'
                        ? 'bg-morning-zone'
                        : 'bg-evening-zone'
                    } `}
                  >
                    <div className="flex flex-col justify-center h-full">
                      <h5 className="text-sm font-light text-white-opacity-50">
                        Morning Zone
                      </h5>
                      <h2 className="text-xl "> {item.movementName}</h2>

                      {item.movementName !== 'Rest' && (
                        <div className="flex gap-3 mt-1">
                          <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                            <img
                              src="/assets/yellowTimer.svg"
                              className="mr-[2px]"
                            />
                            {item.time}
                          </h2>
                        </div>
                      )}
                    </div>
                    {item.movementName !== 'Rest' && (
                      <img
                        className="h-[55px] w-[55px] rounded-xl"
                        style={{
                          boxShadow:
                            item.completed === true
                              ? '0 4px 6px rgba(94, 204, 123, 0.2), 0 -4px 6px rgba(94, 204, 123, 0.2), 4px 0 6px rgba(94, 204, 123, 0.2), -4px 0 6px rgba(94, 204, 123,0.2)'
                              : '0 4px 6px rgba(221, 249, 136, 0.2), 0 -4px 6px rgba(221, 249, 136, 0.2), 4px 0 6px rgba(221, 249, 136, 0.2), -4px 0 6px rgba(221, 249, 136, 0.2)',
                        }}
                        src={
                          item.completed === true
                            ? '/assets/green-tick-big.svg'
                            : '/assets/yellow-play.svg'
                        }
                      />
                    )}
                  </div>

                  {tileId === item.movementId && morningInput === true && (
                    <SlideContainer className="relative w-full px-3 pb-3 -top-3 rounded-b-xl bg-black-opacity-45 pt-7">
                      <p className="text-center text-offwhite">
                        Have you completed this?
                      </p>
                      <div className="flex justify-center w-full gap-8 mt-3">
                        <button
                          onClick={() =>
                            postWorkoutData({
                              id: item.movementId,
                              text: 'Morning Zone',
                              name: item.movementName,
                            })
                          }
                          className="text-black rounded w-14 bg-green"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            setMorningInput(false);
                            setTileId(null);
                          }} // Use button and attach onClick here
                          className="text-black rounded w-14 bg-red"
                        >
                          No
                        </button>
                      </div>
                    </SlideContainer>
                  )}
                </div>
              </section>
            );
          })}
        </>
      )}

      {Object.keys(homeStats['Evening Zone']['movements']).length > 0 && (
        <>
          {homeStats['Evening Zone']['movements'].map((item, index) => (
            <section>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => handleEveningTile(item.movementId, index)}
                  className={` relative flex h-[85px] w-full grow items-center justify-between rounded-xl ${
                    item.movementName === 'Flex' ||
                    item.movementName === 'Workout'
                      ? 'bg-morning-zone'
                      : 'bg-evening-zone'
                  } bg-cover py-2 pl-4 pr-7 `}
                >
                  <div className="flex flex-col justify-center h-full">
                    <h5 className="text-sm font-light text-white-opacity-50">
                      Evening Zone
                    </h5>
                    <h2 className="text-xl "> {item.movementName}</h2>
                    {item.movementName !== 'Rest' && (
                      <div className="flex gap-3 mt-1">
                        <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                          <img
                            src="/assets/yellowTimer.svg"
                            className="mr-[2px] "
                          />
                          {item.time}
                        </h2>
                      </div>
                    )}
                  </div>
                  {item.movementName !== 'Rest' && (
                    <img
                      className="h-[55px] w-[55px] rounded-xl"
                      style={{
                        boxShadow:
                          item.completed === true
                            ? '0 4px 6px rgba(94, 204, 123, 0.2), 0 -4px 6px rgba(94, 204, 123, 0.2), 4px 0 6px rgba(94, 204, 123, 0.2), -4px 0 6px rgba(94, 204, 123, 0.2)'
                            : '0 4px 6px rgba(221, 249, 136, 0.2), 0 -4px 6px rgba(221, 249, 136, 0.2), 4px 0 6px rgba(221, 249, 136, 0.2), -4px 0 6px rgba(221, 249, 136, 0.2)',
                      }}
                      src={
                        item.completed === true
                          ? '/assets/green-tick-big.svg'
                          : '/assets/yellow-play.svg'
                      }
                    />
                  )}
                </div>
                {tileId === item.movementId && eveningInput === true && (
                  <SlideContainer className="relative w-full px-3 pb-3 -top-3 rounded-b-xl bg-black-opacity-45 pt-7">
                    <p className="text-center text-offwhite">
                      Have you completed this?
                    </p>
                    <div className="flex justify-center w-full gap-8 mt-3">
                      <button
                        onClick={() =>
                          postWorkoutData({
                            id: item.movementId,
                            text: 'Evening Zone',
                          })
                        }
                        className="text-black rounded w-14 bg-green"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          setEveningInput(false);
                          setTileId(null);
                        }} // Use button and attach onClick here
                        className="text-black rounded w-14 bg-red"
                      >
                        No
                      </button>
                    </div>
                  </SlideContainer>
                )}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
};

export default WorkoutTile;
