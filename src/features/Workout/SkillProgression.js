import React, { useEffect, useState } from 'react';
import { Button } from '../../components';
import { useSelector } from 'react-redux';

import { HiX } from 'react-icons/hi';
import { HiCheck } from 'react-icons/hi';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import axios from 'axios';
import SkillScore from './SkillScore';

const SkillProgression = ({ setShowLevel }) => {
  const [index, setIndex] = useState(1);
  const [currentInfo, setCurrentInfo] = useState({});
  const [levelArray, setLevelArray] = useState([]);
  const [description, setDescription] = useState('');

  const { workout } = useSelector((store) => store.workoutReducer);

  console.log(workout, "workout object")


  function setLevelData(data) {
    if (data && data.currentLevelInfo && data.levelArray) {
      setCurrentInfo(data.currentLevelInfo);
      setLevelArray(data.levelArray);

      if (data.currentLevelInfo.level) {
        setIndex(data.currentLevelInfo.level);
      } else {
        console.error('Undefined level in currentLevelInfo');
      }
    } else {
      console.error('Invalid data or currentLevelInfo');
    }
  }

  useEffect(() => {
    async function getSkillData() {
      //api call
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/skill`,
          {params: {theme: workout?.theme, user: workout?.memberCode}}
        );
        if (res.data) {
          const data = res.data.data;
          setDescription(data.description)
          setLevelData(data);
        }
      } catch (error) {}
    }

    getSkillData();
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-hidden bg-[#141414] px-4 py-8">
      <div className="flex justify-end">
        <span
          onClick={() => setShowLevel(false)}
          className="rounded-full bg-[#202020] p-2"
        >
          <HiX size={20} />
        </span>
      </div>
      {levelArray.length > 0 && (
        <div className="flex h-full flex-col justify-around">
          <section className="flex flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl">{levelArray[index - 1].movement}</h1>
            <p className="text-center text-base text-lightGray">


            </p>
          </section>
          <section className="flex flex-col items-center justify-center ">
            <div className="my-4 text-3xl text-floYellow">
              {levelArray[index - 1].name}
            </div>

            {index === currentInfo.level && (
              <>
                <div className="-my-4 w-full ">
                  <SkillScore
                    progress={currentInfo.progress}
                    total={currentInfo.total}
                  />
                </div>
                <p className="-mt-4 text-center text-xs text-lightGray	">
                  complete progress to unlock this badge
                </p>
              </>
            )}

            {index > currentInfo.level && (
              <p className="-mt-4 text-center text-xs text-lightGray	">
                complete last level to unlock
              </p>
            )}

            <div className="my-4 flex h-32 w-full items-center justify-between">
              <span>
                <HiOutlineChevronDoubleLeft
                  size={25}
                  onClick={() => {
                    if (index > 1) {
                      setIndex((index) => index - 1);
                    } else {
                      setIndex(6);
                    }
                  }}
                />
              </span>
              <span className="h-full flex-grow">
                <img src={levelArray[index - 1].link} alt={levelArray[index - 1].name} />
              </span>

              <span>
                <HiOutlineChevronDoubleRight
                  size={25}
                  onClick={() => {
                    if (index < 6) {
                      setIndex((index) => index + 1);
                    } else {
                      setIndex(1);
                    }
                  }}
                />
              </span>
            </div>
            <div className="mt-2 text-lightGray">
              <span>{index} / </span>
              <span>6</span>
            </div>
          </section>

          {index < currentInfo.level && (
            <div className="flex items-center justify-center">
              <div className="glow-green flex w-fit items-center rounded-lg border-green bg-green p-2 px-4 font-bold">
                <span>
                  <HiCheck size={20} color="black" />
                </span>
                <span className="text-black">Completed</span>
              </div>
            </div>
          )}
          {index === currentInfo.level && (
            <div className="flex flex-col items-center justify-center">
              <div className="glow-purple w-fit rounded-lg border-lightPurple bg-lightPurple p-2 px-4 font-bold">
                <span className="text-black">Current Level</span>
              </div>
            </div>
          )}
          {index > currentInfo.level && (
            <div className="flex items-center justify-center">
              <div className="w-fit rounded-lg border-lightGray bg-lightGray p-2 px-4 font-bold">
                <span className="text-black">Locked</span>
              </div>
            </div>
          )}
          <footer>
            <Button
              text="close"
              type="workout"
              action={() => setShowLevel(false)}
            />
          </footer>
        </div>
      )}
    </div>
  );
};

export default SkillProgression;
