import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import DataInputComponent from './DataInputComponent';
import Movement from './Movement.js';
import { HiX } from 'react-icons/hi';

const SectionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sectionList, index } = location.state;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentSection, setCurrentSection] = useState(sectionList[index]);

  const lastPage = currentIndex === sectionList.length - 1;

  const handleNext = () => {
    console.log('handle next');

    const newIndex = currentIndex + 1;
    console.log(newIndex);
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex - 1;
    console.log(newIndex);
    if (newIndex === -1) {
      return;
    }
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
  };

  const {
    name,
    movements,
    dataInput,
    notes,
    code,
    rounds,
    description,
    formatInfo,
  } = currentSection;

  const movementLength = movements.length;

  // const redirect = (e) => {
  //   e.preventDefault();
  //   navigate('/home');
  // };

  // useEffect(() => {
  //   window.addEventListener('beforeunload', redirect);
  //   return () => {
  //     window.removeEventListener('beforeunload', redirect);
  //   };
  // }, []);

  return (
    <div className="max-h-fit min-h-screen w-screen pt-4">
      <main className="px-4 pb-32">
        <div className="flex items-center justify-between">
          <h1 className="workout-gradient-text text-3xl">{name}</h1>
          <Link to="/workout">
            <HiX size={24} />
          </Link>
        </div>

        {description && (
          <div className="py-2 text-sm text-lightGray">
            <p>{description}</p>
          </div>
        )}
        <div className="h-0 w-screen border-b-[0.5px] border-[#2E2E2E]"></div>
        {code === 'METCON' && (
          <div className="my-6 flex flex-col">
            <span className="text-sm tracking-widest text-green">
              TODAY'S FORMAT
            </span>
            <div className="flex flex-col">
              <span className=" workout-gradient-text text-2xl uppercase">
                {formatInfo?.name}
              </span>
              {formatInfo?.name !== 'EMOM' && formatInfo?.name !== 'AMRAP' ? (
                <span className="text-sm text-lightGray">
                  Rounds:{' '}
                  <span className="text-green">{formatInfo?.rounds}</span>
                </span>
              ) : (
                <span className="text-sm text-lightGray">
                  {formatInfo?.duration}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="max-w-10/12 my-12 flex max-h-20 rounded-lg">
          <div className="flex items-center justify-center ">
            {movements &&movementLength > 1 && (
              <div className="h-fit w-fit">
                <img
                  className="min-w-[120%]"
                  src={'/assets/bullet-points.svg'}
                  alt=""
                />
              </div>
            )}
            <ul className="pl-2 text-sm leading-7 text-lightGray ">
              {/* <li>
                <span className="text-green">25</span> Butt kicks each side
              </li>
              <li>
                <span className="text-green">10</span> Reverse Lunges
              </li>
              <li>
                <span className="text-green">8</span> Alt V-crunches each side
              </li> */}
              {movements &&
                movements.map((i) => {
                  return (
                    <li key={i._id} className="text-lg">
                      <span className="text-green">{i.reps}</span>{' '}
                      <span className="text-white">{i.name}</span>
                    </li>
                  );
                })}
            </ul>
          </div>

          {code !== 'METCON' && (
            <div className="flex grow items-center justify-around text-green w-1/6">
              {movements &&movementLength > 1 && (
                <div>
                  <img src={'/assets/bracket-arrow.svg'} alt="" />
                </div>
              )}
              <span>x</span>
              <div className="text-3xl">{rounds}</div>
            </div>
          )}
        </div>

        {code === 'METCON' && (
          <div className="my-6 flex justify-around">
            <div className="w-26 flex h-16 flex-col items-center justify-center rounded-lg border border-[#323232] p-2">
              <span className=" text-xs text-lightGray">
                {formatInfo?.name === 'AMRAP' ? 'Target Rounds' : 'Target Time'}
              </span>
              <div className="flex h-full w-full items-center justify-center text-green">
                <span className="text-3xl">{formatInfo.target}</span>
                {formatInfo?.name !== 'AMRAP' && (
                  <span className="pl-1 pt-3 text-xs tracking-widest">
                    MINS
                  </span>
                )}
              </div>
            </div>

            <div className="w-26 flex h-16 flex-col items-center justify-center rounded-lg border border-[#323232] p-2">
              <span className=" text-xs text-lightGray">Current Intensity</span>
              <div className="flex h-full w-full items-center justify-center text-green">
                <span className="text-3xl">{formatInfo?.currentIntensity}</span>
                <span className="text-md pl-1 pt-3 tracking-widest">%</span>
              </div>
            </div>

            <div className="w-26 flex h-16 flex-col items-center justify-center rounded-lg border border-[#323232] p-2">
              <span className=" text-xs text-lightGray">Target Intensity</span>
              <div className="flex h-full w-full items-center justify-center text-green">
                <span className="text-3xl">{formatInfo?.targetIntensity}</span>
                <span className="text-md pl-1 pt-3 tracking-widest">%</span>
              </div>
            </div>
          </div>
        )}

        {/* {notes.length > 0 && (
        <div className="rounded-xl bg-[#0E0E0E] p-4">
          <p className="mb-2 text-xs tracking-widest">NOTES</p>
          <ul>
            {notes.map((note, idx) => (
              <li
                className="text-xs font-light tracking-wider text-lightGray"
                key={idx}
              >
                - {note}
              </li>
            ))}
          </ul>
        </div>
      )} */}

        <div className="scrolling-wrapper">
          {movements.map((movement) => (
            <Movement movement={movement} key={movement._id} code={code} movementLength={movementLength} />
          ))}
        </div>

        <div>
          <h2 className="workout-gradient-text mb-4 mt-8 text-2xl">
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

        {!lastPage && (
          <div
            className="mt-8 flex items-center justify-center"
            onClick={() => navigate('/workout-summary')}
          >
            <div className="flex items-center rounded bg-red p-1 font-bold text-black">
              <span>END WORKOUT</span>
              <span className="ml-2">
                <HiX color="black" size={20} />
              </span>
            </div>
          </div>
        )}
      </main>

      {/* <footer className="fixed bottom-4 h-14 w-11/12 rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)]">
        <div className="flex items-center justify-around pt-1">
          <Link
            className="flex h-11 items-center justify-center rounded-xl"
            to="/workout"
          >
            <span className="text-lg uppercase">Close</span>
          </Link>

          <div className="flex w-1/3 items-center justify-center space-x-3">
            <button disabled={currentIndex === 0} onClick={handlePrevious}>
              <img src="./assets/chevron.left.svg" alt="left-arrow" />
            </button>
            <p className="text-md">
              {currentIndex + 1} / {sectionList.length}
            </p>
            <button onClick={handleNext}>
              <img src="./assets/chevron.right.svg" alt="right-arrow" />
            </button>
          </div>

          <button
            className="flex h-11 items-center justify-center rounded-xl"
            onClick={() => {
              navigate('/workout-summary');
            }}
          >
            <span className="text-lg uppercase">Submit</span>
          </button>
        </div>
      </footer> */}
      <footer className=" fixed bottom-0 flex h-20 w-screen items-center justify-around rounded-xl border-t-[0.5px] border-[#383838]">
        <button
          disabled={currentIndex === 0}
          onClick={handlePrevious}
          className="flex h-full w-1/4 items-center justify-center border-r-[0.5px] border-[#383838] bg-theme"
        >
          <img src="./assets/chevron.left.svg" alt="left-arrow" />
        </button>

        {lastPage ? (
          <div
            className="flex h-full w-3/4 flex-col items-center justify-center bg-theme"
            onClick={() => navigate('/workout-summary')}
          >
            <span className="text-2xl tracking-widest text-green">FINISH</span>
          </div>
        ) : (
          <div className="flex h-full w-3/4 flex-col items-center justify-center bg-theme">
            <span className="text-xs tracking-widest text-lightGray">
              SECTION
            </span>
            <p className="pt-1 text-2xl">
              {currentIndex + 1} / {sectionList.length}
            </p>
          </div>
        )}

        {lastPage ? (
          <button className="flex h-full w-1/4 items-center justify-center border-l-[0.5px] border-[#383838] bg-theme">
            <img src="./assets/chevron.right-hidden.svg" alt="right-arrow" />
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
  );
};

export default SectionDetail;
