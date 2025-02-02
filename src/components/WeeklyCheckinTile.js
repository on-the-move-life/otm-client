import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WeeklyCheckinTile = ({ isWeeklyReviewSubmitted }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 700); // Toggle every 500ms
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div
        idD
        onClick={() => {
          isWeeklyReviewSubmitted
            ? navigate(`/weekly-checkin?formSubmit=${true}`)
            : navigate('/weekly-checkin');
        }}
        className=""
      >
        <div
          style={{
            background: isWeeklyReviewSubmitted
              ? 'var(--aaaa, radial-gradient(100.01% 100% at 50.16% 0%, #97EBAD 0%, #439258 100%))'
              : 'var(--Gradient-purple, linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%))',
          }}
          className="relative min-h-[98px] flex-col rounded-xl px-4 py-[9px]"
        >
          <div className="flex justify-between">
            <div>
              {!isWeeklyReviewSubmitted && (
                <div className="absolute -right-2 -top-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black-opacity-25">
                  <div
                    className={` flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[rgba(245,15,15,0.46)]  transition-opacity duration-700 ${
                      isVisible ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <div
                      className={`h-[12px] w-[12px] rounded-full bg-[rgba(245,15,15)] transition-opacity duration-700 ${
                        isVisible ? 'opacity-100' : 'opacity-50'
                      }`}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mb-2 flex h-min items-center">
                <img
                  src="/assets/weekly-checkin-calender.svg"
                  className="mr-[2px]"
                  alt="calender"
                />
                <span className="pl-1 text-[15px] text-black">
                  Weekly Checkin
                </span>
              </div>
              <div className=" font-sfpro text-[14px] leading-5 text-black">
                Log your stats to unlock key
              </div>
              <div className=" font-sfpro text-[14px] leading-4 text-black">
                insights and visualize your progress
              </div>
            </div>

            <img
              src="/assets/weekly-checkin-intro-graph.svg"
              className="absolute bottom-0 right-[5px] z-10"
              alt="calender"
            />
            {isWeeklyReviewSubmitted && (
              <div className="absolute right-[5px] top-2 z-10 flex gap-1 rounded-[3px] bg-black-opacity-45 px-1 font-sfpro text-[10px] text-green ">
                <img
                  src="/assets/tick-green-circular.svg"
                  className=""
                  alt="calender"
                />
                checked for this week
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyCheckinTile;
