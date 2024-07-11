import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';
import SectionItem from './Section';
import { useNavigate } from 'react-router-dom';
import UpdateWorkout from './UpdateWorkout';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { setIndex } from './WorkoutSlice';
import { useState } from 'react';
import AnimatedComponent from '../../components/AnimatedComponent';

const MainPage = () => {
  const [showUpdateWorkout, setShowUpdateWorkout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dummyData = [
    {
      code: 'WAR',
      name: 'Warmup',
      format: '2 Rounds',
      movements: [
        {
          _id: '66792eb47a5749d8bedaac53',
          bucket: 'Scapular',
          section: 'Warmup',
          res_section: '',
          tag: [''],
          code: 'WSL',
          name: 'Wallslides',
          hint: '',
          equipment: [''],
          variation: ['seated'],
          rep_range: '30-45 sec',
          beg_rep_range: '',
          adv_rep_range: '',
          link: [
            'https://storage.googleapis.com/otm_web_assets/OTM%20GIFS%202/Wall%20slides%20-%20Made%20with%20Clipchamp.gif',
          ],
          alt_basic_equipment: [''],
          alt_no_equipment: [''],
          alt_skill_equipment: [''],
          focus_area: ['Shoulders'],
          setup: [
            'Stand with back against a wall',
            ' arms bent at 90 degrees',
            ' slide arms up and down the wall',
            '',
          ],
          execution: [
            'Keep elbows and wrists in contact with the wall throughout the movement',
            '',
          ],
          completion: [
            'Complete the desired number of reps',
            ' Keep your core engaged',
            '',
          ],
          key_tips: [
            'Focus on keeping the entire arm in contact with the wall',
            ' Keep movements controlled',
            '',
          ],
          count: 1,
          reps: '30-45 sec',
          fullName: ' Wallslides ',
        },
        {
          _id: '66792eb47a5749d8bedaac51',
          bucket: 'Scapular',
          section: 'Warmup',
          res_section: '',
          tag: [''],
          code: 'TSE',
          name: 'Wall t-spine extensions',
          hint: '',
          equipment: [''],
          variation: ['wall'],
          rep_range: '10-12',
          beg_rep_range: '',
          adv_rep_range: '',
          link: [
            'https://storage.googleapis.com/otm_web_assets/OTM%20GIFS%202/Wall%20t-spine%20extensions%20-%20Made%20with%20Clipchamp.gif',
          ],
          alt_basic_equipment: [''],
          alt_no_equipment: [''],
          alt_skill_equipment: [''],
          focus_area: ['Spine'],
          setup: [
            'Stand facing a wall with hands on the wall at shoulder height',
            ' lean in and arch back',
            '',
          ],
          execution: [
            'Hold the stretch for a few seconds',
            ' then return to standing',
            '',
          ],
          completion: [
            'Complete the desired number of reps',
            ' Keep your core engaged',
            '',
          ],
          key_tips: [
            'Focus on arching through the upper back',
            ' Keep breathing steady',
            '',
          ],
          count: 1,
          reps: '10-12',
          fullName: ' Wall t-spine extensions ',
        },
        {
          _id: '66792eb47a5749d8bedaac50',
          bucket: 'Scapular',
          section: 'Warmup',
          res_section: '',
          tag: [''],
          code: 'TSER',
          name: 'Wall t-spine extension raises',
          hint: '',
          equipment: [''],
          variation: ['wall'],
          rep_range: '10-12',
          beg_rep_range: '',
          adv_rep_range: '',
          link: [
            'https://storage.googleapis.com/otm_web_assets/OTM%20GIFS%202/Wall%20t-spine%20extension%20raises%20-%20Made%20with%20Clipchamp.gif',
          ],
          alt_basic_equipment: [''],
          alt_no_equipment: [''],
          alt_skill_equipment: [''],
          focus_area: ['Spine'],
          setup: [
            'Stand facing a wall with hands on the wall at shoulder height',
            ' lean in and raise arms overhead',
            '',
          ],
          execution: [
            'Keep arms straight and raise them overhead',
            ' then lower back down',
            '',
          ],
          completion: [
            'Complete the desired number of reps',
            ' Keep your core engaged',
            '',
          ],
          key_tips: [
            'Focus on arching through the upper back',
            ' Keep movements controlled',
            ' Keep breathing steady',
            '',
          ],
          count: 1,
          reps: '10-12',
          fullName: ' Wall t-spine extension raises ',
        },
      ],
      sectionMain:
        '2 Rounds\n30-45 sec  Wallslides \n10-12  Wall t-spine extensions \n10-12  Wall t-spine extension raises \n\n',
      links: [
        [
          'https://storage.googleapis.com/otm_web_assets/OTM%20GIFS%202/Wall%20slides%20-%20Made%20with%20Clipchamp.gif',
        ],
        [
          'https://storage.googleapis.com/otm_web_assets/OTM%20GIFS%202/Wall%20t-spine%20extensions%20-%20Made%20with%20Clipchamp.gif',
        ],
        [
          'https://storage.googleapis.com/otm_web_assets/OTM%20GIFS%202/Wall%20t-spine%20extension%20raises%20-%20Made%20with%20Clipchamp.gif',
        ],
      ],
      sectionFooter: '',
      dataInput: [
        {
          id: 'MOB-rounds',
          label: 'Rounds Completed',
          placeholder: 0,
          type: 'select',
          options: [0, 1, 2, 3, 4, 5],
        },
        {
          id: 'MOB-comment',
          label: 'Comment',
          placeholder: 'enter your comment here...',
          type: 'textarea',
        },
      ],
      notes: [],
      meta: null,
      rounds: '2',
      description:
        'The strength in your flexibility, helps increase your range of motion and performance.',
    },
  ];

  const status = useSelector((store) => store.workoutReducer.status);
  const workoutData = useSelector((store) => store.workoutReducer.workout);

  let memberName = 'Guest';
  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
    memberName = user['name'];
  }

  const handleUpdateClose = () => {
    setShowUpdateWorkout(false);
  };

  const handleStart = () => {
    dispatch(setIndex(0));
    navigate('/section-details');
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'error') {
    return <Error>Error Message</Error>; // Replace with actual error message
  }

  return (
    <div className="w-screen h-screen">
      {showUpdateWorkout && <UpdateWorkout onClose={handleUpdateClose} />}

      {!showUpdateWorkout && (
        <>
          {' '}
          <AnimatedComponent>
            <div className="flex py-6 mb-4 bg-cover h-fit bg-black/70 bg-workout-cover bg-blend-soft-light">
              <div className="flex justify-between w-full px-4">
                <div className="flex flex-col items-start justify-between w-full h-full gap-4">
                  <HiArrowNarrowLeft
                    size={20}
                    onClick={() => {
                      navigate('/home');
                    }}
                  />
                  <div className="flex flex-col items-start justify-center w-full mt-2">
                    <h1 className="text-2xl font-semibold metallic-workout-gradient-text ">
                      {memberName}
                    </h1>
                    <span className="text-xs tracking-wider font-extralight text-lightGray">
                      Let's crush this workout
                    </span>
                    <span className="mt-6 text-xs tracking-widest text-lightGray">
                      TODAY'S FOCUS
                    </span>
                    <div className="flex gap-2">
                      <div>
                        <h2 className="text-xl">{workoutData.theme}</h2>
                      </div>
                      <div className="flex items-center justify-center rounded-[7px] border border-white px-[3px]">
                        <button
                          onClick={() => setShowUpdateWorkout(true)}
                          className="w-fit rounded border bg-white px-[0.7px] text-center text-[10px] font-bold text-black"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-4 h-fit rounded-xl border border-white p-2 text-center text-[10px] uppercase tracking-widest">
            <p>{workoutData.day.split(' ')[0]} </p>
            <p>Day </p>
            <p className="text-base">{workoutData.day.split(' ')[2]}</p>
          </div> */}
              </div>
            </div>
          </AnimatedComponent>
          <div className="pb-32">
            <AnimatedComponent
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <SectionItem sectionList={dummyData} index={0} key={0} />
            </AnimatedComponent>
            {/* <AnimatedComponent
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {workoutData.program.map((data, index) => (
                <SectionItem
                  sectionList={workoutData.program}
                  index={index}
                  key={index}
                />
              ))}
            </AnimatedComponent> */}
          </div>
          <footer className="fixed w-full px-4 bottom-4">
            <button
              className="workout-gradient-button mt-4 flex h-12 w-full items-center justify-center rounded-xl border border-[rgba(209,209,209,0.70)] text-center"
              onClick={handleStart}
            >
              <p className="text-lg font-semibold text-black">START</p>
            </button>
            <style>
              {`
             @keyframes backgroundMove {
             0%, 100% { background-position: left; }
             50% { background-position: right; }
            }

            .animate-backgroundMove {
             animation: backgroundMove 3s infinite;
             }
            `}
            </style>
            <button
              className="animate-backgroundMove relative mt-2 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-none bg-gradient-to-r from-[#d1d1d1] via-[#FFFFFF] to-[#d1d1d1] bg-[length:250%] bg-left text-[#FFFFFF]"
              onClick={() => setShowUpdateWorkout(true)}
            >
              <span className="animate-backgroundMove absolute flex h-[90%] w-[97%] items-center justify-center rounded-md bg-black bg-opacity-90 text-[#ffffff]">
                Customise Workout
              </span>
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

export default MainPage;
