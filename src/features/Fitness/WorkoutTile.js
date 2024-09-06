import { Link } from 'react-router-dom';

const WorkoutTile = ({ homeStats, isDisabled, selectedDay }) => {
  return (
    <>
      <section>
        <div
          className="flex items-center"
          style={{
            opacity: isDisabled ? 0.5 : 1,
            pointerEvents: isDisabled ? 'none' : 'auto',
            cursor: isDisabled ? 'not-allowed' : 'default',
          }}
        >
          <Link
            to="/workout/today"
            className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-morning-zone py-2 pl-4 pr-7 "
          >
            <div className="flex h-full flex-col justify-center">
              <h5 className="text-sm font-light text-white-opacity-50">
                Morning Zone
              </h5>
              <h2 className="text-xl  ">
                {' '}
                {
                  homeStats?.weeklyWorkout[selectedDay]['Morning Zone'][
                    'movements'
                  ][0].movementName
                }
              </h2>

              <div className="mt-1 flex gap-3">
                <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                  <img src="/assets/yellowTimer.svg" className="mr-[2px]" />
                  {
                    homeStats?.weeklyWorkout[selectedDay]['Morning Zone'][
                      'movements'
                    ][0].time
                  }
                </h2>
              </div>
            </div>
            <img
              className="h-[55px] w-[55px] rounded-xl"
              style={{
                boxShadow:
                  '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
              }}
              src={
                homeStats?.weeklyWorkout[selectedDay]['Evening Zone'][
                  'movements'
                ][0].completed === true
                  ? '/assets/green-tick-big.svg'
                  : '/assets/yellow-play.svg'
              }
            />
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center">
          <Link
            to="/workout/today"
            className="relative flex h-[85px] w-full grow items-center justify-between rounded-xl bg-evening-zone py-2 pl-4 pr-7 "
          >
            <div className="flex h-full flex-col justify-center">
              <h5 className="text-sm font-light text-white-opacity-50">
                Evening Zone
              </h5>
              <h2 className="text-xl  ">
                {' '}
                {
                  homeStats?.weeklyWorkout[selectedDay]['Evening Zone'][
                    'movements'
                  ][0].movementName
                }
              </h2>

              <div className="mt-1 flex gap-3">
                <h2 className="flex  rounded-md border border-floYellow bg-gray px-1   font-sfpro text-[12px] text-floYellow">
                  <img src="/assets/yellowTimer.svg" className="mr-[2px] " />
                  {
                    homeStats?.weeklyWorkout[selectedDay]['Evening Zone'][
                      'movements'
                    ][0].time
                  }
                </h2>
              </div>
            </div>
            <img
              className="h-[55px] w-[55px] rounded-xl"
              style={{
                boxShadow:
                  '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
              }}
              src={
                homeStats?.weeklyWorkout[selectedDay]['Evening Zone'][
                  'movements'
                ][0].completed === true
                  ? '/assets/green-tick-big.svg'
                  : '/assets/yellow-play.svg'
              }
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default WorkoutTile;
