import React, { useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styled from 'styled-components';

const StarterText = styled.div`
  color: var(--New-White, rgba(222.37, 222.37, 222.37, 0.5));
  /* H1 */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: ${(props) =>
    props.fontSize !== undefined ? props.fontSize : '14px'};
  font-style: normal;

  line-height: 16px; /* 125% */
`;

const prgramDetails = [
  {
    id: 'ultimateStrength',

    heading: 'Ultimate Shred',
    img: '/assets/muscle-transparent.svg',
    headingImg: '/assets/muscle-star-black.svg',
    description: 'The ultimate fat-cutting solution',
    workouts: [
      {
        rounds: '3-4',
        roundsDescription: 'x Strength Training',
      },
      {
        rounds: '0-2',
        roundsDescription: 'x Aerobic Session',
      },
    ],
    levels: [
      {
        id: 'beginner',
        heading: 'Beginner',
        weeklyStructure: [
          {
            id: 'workout',
            heading: 'Workout',
            noOfTypes: '3',
            duration: '30 min',
            description: 'strength training session',
          },
        ],
      },
      {
        id: 'intermediate',
        heading: 'Intermediate',
        weeklyStructure: [
          {
            id: 'workout',
            heading: 'Workout',
            noOfTypes: '3',
            duration: '45 min',
            description: 'strength training sessions',
          },
          {
            id: 'aerobic',
            heading: 'Aerobic',
            noOfTypes: '1',
            duration: '45 min',
            description: 'aerobic session',
          },
        ],
      },
      {
        id: 'advanced',
        heading: 'Advanced',
        weeklyStructure: [
          {
            id: 'workout',
            heading: 'Workout',
            noOfTypes: '4',
            duration: '60 min',
            description: 'strength training session',
          },
          {
            id: 'aerobic',
            heading: 'Aerobic',
            noOfTypes: '2',
            duration: '60 min',
            description: 'aerobic session',
          },
        ],
      },
    ],
    about: {
      heading: 'About',
      description:
        'Designed to maximise fat loss and achieve a lean, shredded physique, this program combines high-intensity workouts and precise routines to bring out your best. Its the go-to choice for anyone serious about redefining their body composition.',
    },
  },
  {
    id: 'evolve',
    heading: 'evolve',
    headingImg: '/assets/v-sign-black.svg',
    img: '/assets/v-sign-light.svg',
    description: 'Build strong foundations for a lifetime of health',
    workouts: [
      // {
      //   rounds: '0-3',
      //   roundsDescription: 'x Strength Training',
      // },
      {
        rounds: '0-3',
        roundsDescription: 'x Flex Session',
      },
      {
        rounds: '0-3',
        roundsDescription: 'x Walk',
      },
    ],
    levels: [
      {
        id: 'beginner',
        heading: 'Beginner',
        weeklyStructure: [
          {
            id: 'description',
            heading: 'Description',
            description:
              'Focus on lifestyle design and nutrition guidelines to build consistency and develop healthy habits. With focus on dynamic and static stretches to enhance flexibility and movement as you begin incorporating exercise into your lifestyle.',
          },
        ],
      },
      {
        id: 'intermediate',
        heading: 'Intermediate',
        weeklyStructure: [
          {
            id: 'description',
            heading: 'Description',
            description:
              'Focus on lifestyle design and nutrition guidelines to build consistency and develop healthy habits',
          },
          {
            id: 'walk',
            heading: 'Walk',
            noOfTypes: '3',
            duration: '30 min',
            description: 'walk',
          },
          {
            id: 'flex',
            heading: 'Flex',
            noOfTypes: '3',
            duration: '30 min',
            description: 'flex workout',
          },
        ],
      },
      {
        id: 'advanced',
        heading: 'Advanced',
        weeklyStructure: [
          {
            id: 'workout',
            heading: 'Workout',
            noOfTypes: '3',
            duration: '30 min',
            description: 'strength training session',
          },
        ],
      },
    ],
    about: {
      heading: 'About',
      description:
        'Evolve is a comprehensive program designed to create a sustainable lifestyle by combining functional fitness, injury prevention, personalized nutrition, and mindset coaching. With expert guidance and a supportive community, it empowers you to cultivate a healthier, more fulfilling life—inside and out.',
    },
  },
];

const ProgramDetailScreen = ({
  program,
  setWorkoutLevel,
  workoutLevel,
  setProgram,
  setProgramDetail,
  programDetail,
}) => {
  useEffect(() => {
    const data = prgramDetails
      .find((item) => item.id === program)
      .levels.find((level) => level.id === workoutLevel);

    const newState = {
      ...data.weeklyStructure.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item.noOfTypes ? Number(item.noOfTypes) : item.description,
        }),
        {},
      ),
      level: data.heading,
    };

    setProgramDetail(newState);
  }, [workoutLevel]);

  useEffect(() => {
    // axios
    //   .get(
    //     `${process.env.REACT_APP_BASE_URL}/api/v1/onboarding/re`, {
    //       memberCode: '',
    //       plan: {
    //       }
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data.msg.response);
    //   })
    //   .catch((err) => {})
    //   .finally(() => {
    //     // delay is introduced to increase the time for loading screen (UX improvement)
    //   });
  }, []);

  return (
    <div className="relative z-20 h-screen overflow-y-scroll px-4 pb-[100px] pt-[80px]">
      <div className=" absolute right-4 top-[50px] flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white-opacity-08 ">
        <RxCross1 onClick={() => setProgram(null)} className="" />
      </div>
      <h5 className="px-4 text-center font-sfpro text-sm font-medium text-white-opacity-50">
        Program details
      </h5>
      {prgramDetails.map((item) => {
        if (item.id === program) {
          return (
            <div key={item.id} className="mt-5 flex flex-col gap-4">
              {' '}
              <div className="relative rounded-xl bg-gradient-to-r from-lightPurple to-blue px-[18px]  pb-[24px] pt-[10px]">
                <img src={item.img} className="absolute bottom-4 right-0 " />
                <div
                  className={`flex w-full justify-center ${
                    item.id !== 'evolve' && 'gap-2'
                  }`}
                >
                  <img src={item.headingImg} className="h-[30px] w-[30px]" />
                  <div className=" font-futura text-2xl uppercase text-black">
                    {item.heading}
                  </div>
                </div>

                <div className="mt-[25px] pr-[133px] font-sfpro text-sm text-black">
                  {item.description}
                </div>
                <div className="mt-[6px] flex w-fit gap-1 rounded-[4px] bg-black-opacity-45 px-1">
                  <img src="/assets/calender-white.svg" />
                  <div className=" font-sfpro text-sm font-light text-white">
                    Week Includes
                  </div>
                </div>

                <div className="mt-4">
                  {item.workouts.map((workout, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="font-futura text-[21px] leading-6 text-black">
                        {' '}
                        {workout.rounds}
                      </div>
                      <div className=" text-sm text-black ">
                        {' '}
                        {workout.roundsDescription}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between gap-2 overflow-x-scroll">
                {item.levels.map((level, idx) => (
                  <div
                    key={idx}
                    onClick={() => setWorkoutLevel(level.id)}
                    className={`relative z-30 grow rounded-md bg-black-opacity-45 px-[17px] py-[11px] text-center ${
                      level.id === workoutLevel &&
                      'border border-blue text-blue'
                    }`}
                  >
                    {level.heading}
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-black-opacity-45 px-4 pb-[16px] pt-[10px]">
                <div className=" font-sfpro text-sm text-white">
                  Weekly Structure
                </div>

                <div className="mt-2">
                  {item.levels.map((level, index) => {
                    if (level.id === workoutLevel) {
                      return (
                        <div key={index} className="flex flex-col gap-2">
                          {level.weeklyStructure.map((structure, idx) => (
                            <div key={idx} className="flex gap-2">
                              {structure.noOfTypes && (
                                <div
                                  style={{
                                    border: '0.5px solid rgba(221,249,136,0.4)',
                                  }}
                                  className=" flex w-fit rounded-md border border-floYellow bg-dark-green-opacity-66  px-1 font-sfpro text-[12px] text-floYellow"
                                >
                                  {structure.noOfTypes}x
                                  <div className="mx-[2px] flex w-[16px] items-center">
                                    <img
                                      src="/assets/yellowTimer.svg"
                                      className="mx-[2px]"
                                      alt="img"
                                    />
                                  </div>
                                  {structure.duration}
                                </div>
                              )}

                              <div className="font-sfpro text-sm text-offWhite-opacity-70 ">
                                {structure.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    } else return null;
                  })}
                </div>
              </div>
              <div className="rounded-xl bg-black-opacity-45 px-4 pb-[10px]">
                <div className="mt-4">
                  <div className=" font-sfpro text-sm">
                    {item.about.heading}
                  </div>
                  <div className="mt-1 font-sfpro text-sm text-offWhite-opacity-70">
                    {item.about.description}
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full rounded-xl bg-black-opacity-45 p-[40px]">
                  <div className="flex flex-col items-center ">
                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6 "
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">Rishi Solanki</span> to
                        guide you every step of the way
                      </StarterText>
                    </div>

                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        Your{' '}
                        <span className="text-offwhite">
                          weekly workout schedule
                        </span>{' '}
                        to meet your goals
                      </StarterText>
                    </div>

                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">
                          Custom made meal planning
                        </span>{' '}
                        suited to your taste
                      </StarterText>
                    </div>
                    <div className="flex w-full ">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">
                          A personalised lifestyle design that works
                        </span>{' '}
                      </StarterText>
                    </div>

                    <div className="flex w-full">
                      <img
                        src={'./assets/GreenTick.svg'}
                        alt="correct"
                        className="mr-6"
                      />
                      <StarterText className=" py-[10px]" fontSize="14px">
                        <span className="text-offwhite">
                          An accountability coach
                        </span>{' '}
                        to full proof your success
                      </StarterText>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else return null;
      })}
    </div>
  );
};

export default ProgramDetailScreen;
