import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
  const navigate = useNavigate();

  const LoadingGraphData = [
    { finalPercent: 55, initialPercent: 35, img: '/assets/bar-graph-logo.svg' },
    { finalPercent: 45, initialPercent: 85, img: '/assets/weight-icon.svg' },
    { finalPercent: 83, initialPercent: 30, img: '/assets/shoe-icon.svg' },
    { finalPercent: 65, initialPercent: 44, img: '/assets/star-icon.svg' },
    { finalPercent: 30, initialPercent: 75, img: '/assets/weight-machine.svg' },
    { finalPercent: 87, initialPercent: 60, img: '/assets/heart-icon.png' },
  ];

  const LoadingText = [
    `Delay caffeine intake<span class='text-blue'> by 90 minutes after waking</span> to avoid energy crashes through the day`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 10000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  const [graphData, setGraphData] = useState(LoadingGraphData);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let isInitial = true; // Toggle between initial and final percent
    const graphTimer = setInterval(() => {
      setGraphData((prev) =>
        prev.map((item) => ({
          ...item,
          initialPercent: isInitial
            ? item.finalPercent
            : LoadingGraphData.find((data) => data.img === item.img)
                ?.initialPercent,
        })),
      );
      isInitial = !isInitial; // Toggle state
    }, 2000); // Loop every 2 seconds

    return () => clearInterval(graphTimer);
  }, []);
  useEffect(() => {
    // Cycle through texts with slide and fade transition
    const textTimer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % LoadingText.length); // Change text
    }, 4000); // Total interval duration

    return () => clearInterval(textTimer);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[150] flex h-screen w-screen flex-col items-center gap-[78px] bg-black">
      <img
        src="/assets/weekly-checkin-intro-bg.svg"
        className="h-scren absolute top-0 z-10 w-full  brightness-75 saturate-150 filter"
        alt="background"
      />
      <div className="relative z-20 flex flex-col items-center gap-[78px]">
        <div className="pt-[45%]">
          <h3 className="font-sfpro text-[20px] text-offwhite">
            Getting Your Dashboard Ready
          </h3>
        </div>
        <div className="flex gap-4">
          {graphData.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-[11px]">
              <div className="relative h-[90px] w-[9px] rounded-[24px] bg-white-opacity-08">
                <div
                  style={{
                    height: `${item.initialPercent}%`,
                    transition: 'height 1.5s ease-in-out', // Smooth transition
                  }}
                  className="absolute bottom-0 flex w-[9px] justify-center rounded-[24px] bg-white-opacity-50 pt-[2px]"
                >
                  <div className="h-[7px] w-[7px] rounded bg-offwhite"></div>
                </div>
              </div>
              <img src={item.img} className="h-[18px] w-[18px]" alt="pic" />
            </div>
          ))}
        </div>
        <div className="relative h-[140px] w-full overflow-hidden">
          <div
            className="w-full"
            style={{
              display: 'flex', // Flex container for sliding effect
            }}
          >
            {LoadingText.map((text, index) => (
              <div
                key={index}
                className="flex w-full flex-col justify-center gap-5 px-[25px] text-center text-[20px] text-white-opacity-50"
                style={{
                  opacity: currentTextIndex === index ? 1 : 0.5, // Fade effect for inactive text
                  transition: 'opacity 0.5s ease', // Smooth fade transition
                }}
              >
                <div>Quick Tip</div>
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
