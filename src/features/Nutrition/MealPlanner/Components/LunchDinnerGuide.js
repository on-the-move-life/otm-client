const LunchDinnerGuide = ({ meal }) => {
  return (
    <div className="absolute z-30 flex w-full h-full">
      <div className="flex flex-col items-end w-1/2 ">
        <div className="flex items-center mt-4 ">
          <span className="rounded bg-yellow px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% Raw Veggies
          </span>{' '}
          <span className="w-[50px] border-b border-yellow"></span>
        </div>
        <div className="flex items-center mt-9 ">
          <span className="rounded bg-green px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% Cooked Veggies
          </span>{' '}
          <span className="w-[50px] border-b border-green"></span>
        </div>
      </div>
      <div className="flex flex-col w-1/2 ">
        <div className="flex items-center mt-4 ">
          <span className="w-[60px] border-b border-red"></span>
          <span className="rounded bg-red px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% Protien
          </span>{' '}
        </div>
        <div className="flex items-center mt-9 ">
          <span className="w-[70px] border-b border-blue"></span>
          <span className="rounded bg-blue px-1 text-[10px] text-[rgba(0,0,0,0.80)]">
            25% {meal === 'lunch' ? 'Fat' : 'Carbs'}
          </span>{' '}
        </div>
      </div>
    </div>
  );
};

export default LunchDinnerGuide;
