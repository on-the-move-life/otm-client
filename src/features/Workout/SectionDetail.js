import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import DataInputComponent2 from './DataInputComponent2';
import Movement from './Movement.js';
import { HiX } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import SkillProgression from './SkillProgression.js';
import MovementDetail from './MovementDetail.js';
import { Tooltip, Typography } from '@material-tailwind/react';
import AnimatedComponent from '../../components/AnimatedComponent.js';
import AlertDialog from './AlertDialog.js';
import SwapMovementOptions from './SwapMovementOptions.js';
import { setIndex } from './WorkoutSlice.js';
import { CiDumbbell } from 'react-icons/ci';
import WeightChoosingGuide from './WeightChoosingGuide';

const SectionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  console.log('dfdfdfdfdf', params);
  const [updatedWorkoutProgram, setUpdatedWorkoutProgram] = useState(null);
  const { workout, index } = useSelector((store) => store.workoutReducer);

  const [currentSection, setCurrentSection] = useState([]);
  const [showLevel, setShowLevel] = useState(false);
  const [showMvmtDetail, setShowMvmtDetail] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState({});
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [units, setUnits] = useState(null);
  const [showSwapOptions, setShowSwapOptions] = useState(false);
  const [showWeightGuide, setShowWeightGuide] = useState(false);

  useEffect(() => {
    if (workout && (!workout.coolDownSection || !workout.warmUpSection)) {
      setUpdatedWorkoutProgram(workout.program);
    }

    if (workout && (workout.coolDownSection || workout.warmUpSection)) {
      const workoutArr = [
        workout.warmUpSection,
        ...workout.program,
        workout.coolDownSection,
      ];

      const arrayFeed = workoutArr.some((item) => item.code === 'FEED');

      if (arrayFeed === true) {
        const secondLastIndex = workoutArr.length - 2;
        const lastIndex = workoutArr.length - 1;
        [workoutArr[secondLastIndex], workoutArr[lastIndex]] = [
          workoutArr[lastIndex],
          workoutArr[secondLastIndex],
        ];

        setUpdatedWorkoutProgram(workoutArr);
      }

      if (arrayFeed === false) {
        setUpdatedWorkoutProgram(workoutArr);
      }
    }
  }, [workout]);

  const sectionList = updatedWorkoutProgram || [];

  const lastPage = index === sectionList.length - 1;

  const sectionWithLoadArray = ['ISO', 'MR', 'STR', 'HYP', 'HYP2', 'HYP3'];

  const handleNext = () => {
    const newIndex = index + 1;
    dispatch(setIndex(newIndex));
    setCurrentSection(sectionList[newIndex]);
  };

  const handlePrevious = () => {
    const newIndex = index - 1;
    if (newIndex === -1) {
      return;
    }
    dispatch(setIndex(newIndex));
    setCurrentSection(sectionList[newIndex]);
  };

  const openMovementDetail = (movement) => {
    setSelectedMovement(movement);
    setShowMvmtDetail(true);
  };

  const closeMovementDetail = () => {
    setShowMvmtDetail(false);
  };
  const openWeightGuide = () => {
    setShowWeightGuide(true);
  };

  const closeWeightGuide = () => {
    setShowWeightGuide(false);
  };
  const {
    name = '',
    movements = [],
    dataInput = [],
    code = '',
    rounds = 0,
    description = '',
    formatInfo = {},
    notes = [],
    assessmentMovement = {},
    links = [],
  } = currentSection;
  const movementLength = movements.length;

  const isSectionCodeAvailable = sectionWithLoadArray.includes(code);

  useEffect(() => {
    console.log('section index : ', index, updatedWorkoutProgram);
    if (Object.keys(workout).length === 0) {
      window.location.replace(`/workout/${params.value}`);
    } else {
      setCurrentSection(sectionList[index]);
    }
    console.log('Units : ', units);
  }, [workout, index, sectionList, units]);

  useEffect(() => {
    // preparing units for load valued datainputs
    const unitsObject = {};
    dataInput.forEach((input) => {
      // the best way to identify the unit dataInput element
      if (input.id.includes('unit')) {
        unitsObject[input.id] = input;
      }
    });
    setUnits(unitsObject);
  }, [dataInput]);

  const sectionPageAnimation = {
    initial: {
      opacity: 0,
      y: '30%',
      scale: '90%',
    },
    animate: {
      opacity: 1,
      y: '0%',
      scale: '100%',
    },
    exit: {
      opacity: 0,
      y: '-20%',
      scale: '90%',
    },
  };

  const handleAlertDialog = (confirm) => {
    setShowAlertDialog(false);

    if (confirm) {
      navigate(`/workout-summary/${params.value}`, { replace: true });
    }
  };

  return (
    <>
      {showMvmtDetail && (
        <MovementDetail
          movement={selectedMovement}
          isSectionCodeAvailable={isSectionCodeAvailable}
          closeMovementDetail={closeMovementDetail}
        />
      )}
      {showLevel && <SkillProgression setShowLevel={setShowLevel} />}
      {showWeightGuide && (
        <WeightChoosingGuide closeWeightGuide={closeWeightGuide} />
      )}
      {!showLevel &&
        !showMvmtDetail &&
        Object.keys(workout).length !== 0 &&
        !showSwapOptions && (
          <div className="w-screen h-screen pt-8 overflow-x-hidden max-h-fit">
            <AnimatedComponent
              key={Math.random() * 1000}
              animation={sectionPageAnimation}
            >
              <main className="px-4 pb-32">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="pr-2">
                      <Tooltip
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        content={
                          <div className="w-80 rounded-md border border-[#2E2E2E] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-1 font-serif text-xs tracking-[2px] ">
                            <Typography
                              variant="small"
                              color="white"
                              className="opacity-80"
                            >
                              {description}
                            </Typography>
                          </div>
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="pb-1 cursor-pointer h-7 w-7 text-green"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                      </Tooltip>
                    </div>
                    <h1 className="pb-2 text-3xl workout-gradient-text">
                      {name}
                    </h1>
                  </div>
                  <Link
                    to={`/workout/${params.value}`}
                    className="rounded-full bg-[#202020] p-2"
                  >
                    <HiX size={20} />
                  </Link>
                </div>

                <div className="h-0 w-screen border-b-[0.5px] border-[#2E2E2E]"></div>
                {code === 'METCON' && (
                  <div className="flex flex-col my-6">
                    <span className="text-sm tracking-widest text-green">
                      TODAY'S FORMAT
                    </span>
                    <div className="flex flex-col">
                      <span className="text-2xl uppercase workout-gradient-text">
                        {formatInfo?.name}
                      </span>
                      {formatInfo?.name !== 'EMOM' &&
                      formatInfo?.name !== 'AMRAP' ? (
                        <span className="text-sm text-lightGray">
                          Rounds:{' '}
                          <span className="text-green">
                            {formatInfo?.rounds}
                          </span>
                        </span>
                      ) : (
                        <span className="text-sm text-lightGray">
                          {formatInfo?.duration}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {(code === 'WUP' || code === 'COD') && (
                  <div className="flex justify-center ">
                    <div className="player-wrapper mt-7 h-[500px] max-w-[500px]">
                      <iframe
                        width="100%"
                        height="100%"
                        src={links[0]}
                        title="YouTube video player"
                        loading="lazy"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                )}

                <div className="flex my-12 rounded-lg max-w-10/12 max-h-20">
                  <div className="flex items-center justify-center">
                    {movements && movementLength > 1 && (
                      <div className="h-fit w-fit">
                        <img
                          className="min-w-[120%]"
                          src={'/assets/bullet-points.svg'}
                          alt=""
                        />
                      </div>
                    )}
                    <ul className="pl-2 text-sm leading-7 text-lightGray ">
                      {movements &&
                        movements.map((i) => {
                          return (
                            <li
                              key={i._id}
                              className="tracking- wider text-[1rem]"
                            >
                              <span className="text-green">{i.reps}</span>{' '}
                              <span className="text-white">{i.name}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  {code !== 'METCON' &&
                    code !== 'FEED' &&
                    code !== 'WUP' &&
                    code !== 'COD' && (
                      <div className="flex items-center justify-around w-1/6 grow text-green">
                        {movements && movementLength > 1 && (
                          <div>
                            <img src={'/assets/bracket-arrow.svg'} alt="" />
                          </div>
                        )}
                        <span>x</span>
                        <div className="text-3xl">{rounds}</div>
                      </div>
                    )}
                </div>

                {code === 'GYM' && (
                  <div
                    className="my-4 flex items-center justify-center rounded-xl border-[0.5px] border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] py-2"
                    onClick={() => {
                      setShowLevel(true);
                    }}
                  >
                    <span className="text-sm tracking-wider text-center ">
                      Check Skill Progression
                    </span>
                    <span className="mx-1">
                      <img src="./assets/sparkle.svg" alt="" />
                    </span>
                  </div>
                )}

                {code === 'METCON' && (
                  <div className="flex justify-around my-6">
                    <div className="w-26 flex h-16 flex-col items-center justify-center rounded-lg border border-[#323232] p-2">
                      <span className="text-xs text-lightGray">
                        {formatInfo?.name === 'AMRAP'
                          ? 'Target Rounds'
                          : 'Target Time'}
                      </span>
                      <div className="flex items-center justify-center w-full h-full text-green">
                        <span className="text-3xl">{formatInfo.target}</span>
                        {formatInfo?.name !== 'AMRAP' && (
                          <span className="pt-3 pl-1 text-xs tracking-widest">
                            MINS
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-26 flex h-16 flex-col items-center justify-center rounded-lg border border-[#323232] p-2">
                      <span className="text-xs text-lightGray">
                        Current Intensity
                      </span>
                      <div className="flex items-center justify-center w-full h-full text-green">
                        <span className="text-3xl">
                          {formatInfo?.currentIntensity}
                        </span>
                        <span className="pt-3 pl-1 tracking-widest text-md">
                          %
                        </span>
                      </div>
                    </div>

                    <div className="w-26 flex h-16 flex-col items-center justify-center rounded-lg border border-[#323232] p-2">
                      <span className="text-xs text-lightGray">
                        Target Intensity
                      </span>
                      <div className="flex items-center justify-center w-full h-full text-green">
                        <span className="text-3xl">
                          {formatInfo?.targetIntensity}
                        </span>
                        <span className="pt-3 pl-1 tracking-widest text-md">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="gap-3 scrolling-wrapper">
                  {movements.map((movement) => {
                    return (
                      <Movement
                        movement={movement}
                        key={movement._id}
                        isSectionCodeAvailable={isSectionCodeAvailable}
                        movementLength={movementLength}
                        openMovementDetail={openMovementDetail}
                        setShowSwapOptions={setShowSwapOptions}
                      />
                    );
                  })}
                </div>
                {(code === 'GYM' || (code === 'ASMT' && notes.length > 0)) && (
                  <div className="mt-4 rounded-xl border-[0.5px] border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
                    <p className="mb-2 text-xs tracking-[3px]">NOTES</p>
                    <ul className="pl-3 list-disc">
                      {notes.map((note, idx) => (
                        <li
                          className="my-2 text-xs font-light tracking-wider text-lightGray"
                          key={idx}
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isSectionCodeAvailable && (
                  <div
                    onClick={openWeightGuide}
                    className="my-4 flex  h-auto w-full items-center justify-center gap-2 rounded-[6px] bg-[#1C1C1E] py-2 text-white"
                  >
                    <span className=" text-[22px]">
                      <CiDumbbell />
                    </span>
                    <span className="text-sm">Weight Choosing Guide</span>
                  </div>
                )}

                <div>
                  <h2 className="my-4 text-2xl workout-gradient-text">
                    Data Inputs
                  </h2>
                  {code === 'GYM'
                    ? dataInput
                        .slice(0, 2)
                        .map((input, index) => (
                          <DataInputComponent2
                            key={index}
                            inputId={input.id}
                            inputType={input.type}
                            inputOptions={input.options}
                            placeholder={input.placeholder}
                            label={input.label}
                            options={
                              units[`${input.id}-unit`] !== undefined
                                ? units[`${input.id}-unit`]['options']
                                : null
                            }
                            unitId={
                              units[`${input.id}-unit`] !== undefined
                                ? units[`${input.id}-unit`]['id']
                                : null
                            }
                          />
                        ))
                    : dataInput.map((input, index) => (
                        <DataInputComponent2
                          key={index}
                          inputId={input.id}
                          inputType={input.type}
                          inputOptions={input.options}
                          placeholder={input.placeholder}
                          label={input.label}
                          options={
                            units[`${input.id}-unit`] !== undefined
                              ? units[`${input.id}-unit`]['options']
                              : null
                          }
                          unitId={
                            units[`${input.id}-unit`] !== undefined
                              ? units[`${input.id}-unit`]['id']
                              : null
                          }
                        />
                      ))}

                  {code === 'GYM' && dataInput.length > 2 && (
                    <div className="mt-4 rounded-xl border-[0.5px] border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
                      <p className="mb-2 text-sm tracking-[3px] sm:text-[15px]">
                        MAX EFFORT TEST
                      </p>
                      <div className="flex flex-col items-center mt-4 mb-4 sm:mt-4">
                        <p className="mb-2 text-sm font-semibold text-center sm:text-base">
                          {assessmentMovement?.name}
                        </p>
                        {assessmentMovement?.link &&
                          assessmentMovement?.link[0] && (
                            <img
                              src={assessmentMovement.link[0]}
                              alt={assessmentMovement.name}
                              className="w-20 max-w-xs sm:w-32"
                            />
                          )}
                      </div>
                      <DataInputComponent2
                        key={2}
                        inputId={dataInput[2].id}
                        inputType={dataInput[2].type}
                        inputOptions={dataInput[2].options}
                        placeholder={dataInput[2].placeholder}
                        label={dataInput[2].label}
                        options={
                          units[`${dataInput[2].id}-unit`] !== undefined
                            ? units[`${dataInput[2].id}-unit`]['options']
                            : null
                        }
                        unitId={
                          units[`${dataInput[2].id}-unit`] !== undefined
                            ? units[`${dataInput[2].id}-unit`]['id']
                            : null
                        }
                      />
                      <ul className="pl-5 mt-4 list-disc">
                        <li className="my-2 text-xs font-light tracking-wider text-lightGray">
                          Enter the number of reps
                        </li>
                        <li className="my-2 text-xs font-light tracking-wider text-lightGray">
                          At max do 25 reps
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* {!lastPage && (
              <div className="scrolling-wrapper">
                {movements.map((movement) => {
                  return (
                    <Movement
                      movement={movement}
                      key={movement._id}
                      sectionCode={code}
                      movementLength={movementLength}
                      openMovementDetail={openMovementDetail}
                    />
                  );
                })}
              </div>

              <div>
                <h2 className="mt-8 mb-4 text-2xl workout-gradient-text">
                  Data Inputs
                </h2>
                {dataInput.map((input, index) => (
                  <DataInputComponent
                    key={index}
                    inputId={input.id}
                    inputType={input.type}
                    inputOptions={input.options}
                    placeholder={input.label}
                  />
                ))}
              </div>

              {/* {!lastPage && (
              <div
                className="flex items-center justify-center mt-4"
                onClick={() => navigate('/workout')}
              >
                <div className="flex items-center p-1 font-bold text-black rounded bg-red">
                  <span>EXIT WORKOUT</span>
                  <span className="ml-2">
                    <HiX color="black" size={20} />
                  </span>
                </div>
              </div>
            )} */}
              </main>
            </AnimatedComponent>

            <footer className="fixed bottom-0 flex h-20 w-screen items-center justify-around rounded-xl border-t-[0.5px] border-[#383838]">
              <button
                disabled={index === 0}
                onClick={handlePrevious}
                className="flex h-full w-1/4 items-center justify-center border-r-[0.5px] border-[#383838] bg-theme"
              >
                <img src="./assets/chevron.left.svg" alt="left-arrow" />
              </button>

              {lastPage ? (
                <div
                  className="flex flex-col items-center justify-center w-3/4 h-full bg-theme"
                  onClick={() => setShowAlertDialog(true)}
                >
                  <span className="text-2xl tracking-widest text-green">
                    FINISH
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-3/4 h-full bg-theme">
                  <span className="text-xs tracking-widest text-lightGray">
                    SECTION
                  </span>
                  <p className="pt-1 text-2xl">
                    {index + 1} / {sectionList.length}
                  </p>
                </div>
              )}

              {lastPage ? (
                <button className="flex h-full w-1/4 items-center justify-center border-l-[0.5px] border-[#383838] bg-theme">
                  <img
                    src="./assets/chevron.right-hidden.svg"
                    alt="right-arrow"
                  />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex h-full w-1/4 items-center justify-center border-l-[0.5px] border-[#383838] bg-theme"
                >
                  <img src="./assets/chevron.right.svg" alt="right-arrow" />
                </button>
              )}
            </footer>
          </div>
        )}
      {showSwapOptions && (
        <SwapMovementOptions
          setShowSwapOptions={setShowSwapOptions}
          sectionCode={code}
        />
      )}
      {showAlertDialog && <AlertDialog handleAlertDialog={handleAlertDialog} />}
    </>
  );
};

export default SectionDetail;
