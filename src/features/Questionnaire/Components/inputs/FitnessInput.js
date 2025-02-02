import React from 'react';

const FitnessInput = ({ response, setResponse, heading, questionCode }) => {
  const responseValue = response?.find((item) => item.code === questionCode);
  return (
    <div className=" flex h-[46px] items-center justify-between rounded-xl bg-white-opacity-08 px-[24px]">
      <div className="font-sfpro text-[16px] text-white-opacity-50">
        {heading}
      </div>
      <input
        type="number"
        value={responseValue && responseValue.value[0]}
        onChange={(e) => {
          setResponse((prev) => {
            const updatedResponse = response.map((item) =>
              item.code === questionCode
                ? { ...item, value: [e.target.value] } // Update the value if the code matches
                : item,
            );

            // If the code doesn't exist, add a new entry
            if (!updatedResponse.some((item) => item.code === questionCode)) {
              updatedResponse.push({ questionCode, value: e.target.value });
            }

            return updatedResponse;
          });
        }}
        style={{
          border: '0.5px solid rgba(126,135,239,0.38)',
        }}
        className="h-[35px] w-[80px] rounded-md  bg-black-opacity-45 text-center text-offwhite  placeholder:text-center  placeholder:text-[14px] placeholder:text-white-opacity-26"
        placeholder="0"
      />
    </div>
  );
};

export default FitnessInput;
