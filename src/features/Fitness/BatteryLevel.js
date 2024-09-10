const BatteryLevel = ({ homeStats }) => {
  const chargeArray = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex flex-col items-center rounded-xl bg-black-opacity-45 px-4 py-2">
      <div className="flex">
        <img src="./assets/yellow-bg-power.svg" />
        <h4 className="text-sm text-yellow ">Level {homeStats?.level}</h4>
        <img src="./assets/level-question.svg" className="ml-1" />
      </div>
      <div className="my-2 flex flex-col items-center">
        {chargeArray.map((item, index) => {
          return (
            <div
              style={{
                boxShadow:
                  index > chargeArray.length - homeStats?.level - 1 &&
                  '0 2px 4px   rgba(245 ,197, 99 , 0.2), 0 -4px 6px rgba(245 ,197, 99 , 0.2), 4px 0 6px rgba(221, 249, 136, 0.2), -4px 0 6px rgba(221, 249, 136, 0.2)',
              }}
              className={`mb-[1px]    ${
                index > chargeArray.length - homeStats?.level - 1
                  ? 'bg-yellow'
                  : 'bg-white-opacity-50 opacity-50'
              }  ${
                index === 0
                  ? 'h-[6px] w-[11px]  rounded-t-[4px] '
                  : 'h-[11px] w-[38px]  rounded '
              }`}
            ></div>
          );
        })}
      </div>
      <p className="text-center text-[10px] text-white-opacity-50">
        Charge up to unlock next level
      </p>
    </div>
  );
};

export default BatteryLevel;
