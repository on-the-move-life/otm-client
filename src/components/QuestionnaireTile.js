import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionnaireTile = () => {
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
          navigate('/questionnaire');
        }}
        className=""
      >
        <div
          style={{
            background:
              'var(--Gradient-purple, linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%))',
          }}
          className="relative min-h-[98px] flex-col rounded-xl px-4 py-[9px]"
        >
          <div className="flex justify-between">
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
            <div>
              <div className="mb-2 flex h-min items-center">
                <img
                  src="/assets/weekly-checkin-calender.svg"
                  className="mr-[2px]"
                  alt="calender"
                />
                <span className="pl-1 text-[15px] text-black">
                  Complete Onboarding
                </span>
              </div>
              <div className=" w-[60%] font-sfpro text-[14px] leading-5 text-black">
                Complete our new onboarding flow to update your program
              </div>
            </div>

            <img
              src="/assets/weekly-checkin-intro-graph.svg"
              className="absolute bottom-0 right-[5px] z-10"
              alt="calender"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireTile;
