import { useNavigate } from 'react-router-dom';
import PathVisualization from './PathVisualisation';

const EvolveScreen = ({ homeStats, getUserData }) => {
  const navigate = useNavigate();

  return (
    <div className="relative z-50 flex h-screen flex-col justify-between overflow-y-scroll bg-[#161513] px-[16px] ">
      <img
        src="assets/movement-frame.svg"
        className="absolute left-0 top-0 -z-10 h-full w-full"
      />
      <div>
        <h2 className="mt-[60px] w-4/5 text-lg text-offwhite">
          Based on your answers, we’ve designed your personalised journey
        </h2>
        <div className="mt-[22px] rounded-xl bg-black-opacity-45 p-1 ">
          <div className="flex items-end gap-[10px] px-3">
            <img src="./assets/evolve.svg" />

            <h5 className="h-min rounded bg-browm-opacity-12 px-2 text-xs text-yellow">
              Level {homeStats.level}
            </h5>
          </div>
          <p className="mt-[10px] w-11/12 px-3 text-sm text-white-opacity-50">
            We'll focus on sustainable integration of fitness and wellbeing
            practices with minimal restrictions and effort!
          </p>
        </div>
        <PathVisualization level={homeStats.level} />
      </div>

      <button
        type="submit"
        onClick={() => {
          navigate('/home');
          getUserData();
        }}
        style={{
          backgroundColor: '#F8F8F8',

          color: 'rgba(0,0,0)',
        }}
        className="relative  mb-10 mt-10  flex h-[46px] w-full items-center justify-center gap-1 rounded-lg bg-custompurple p-1 font-sfpro text-lg leading-8  text-black backdrop-blur-md"
      >
        Let's get On The Move
      </button>
    </div>
  );
};

export default EvolveScreen;
