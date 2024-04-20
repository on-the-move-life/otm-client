import React from 'react';

function Options({ questionCode, options, isMCQ, response, setResponse }) {
  console.log('Question code : ', questionCode);

  const Option = ({
    questionCode,
    optionID,
    optionValue,
    isMCQ,
    response,
    setResponse,
  }) => {
    console.log('questioncode : ', questionCode);
    return (
      <div
        className={`w-full rounded-[12px] bg-[#3d3d3d]/30 px-3 py-4 ${
          response[questionCode]?.find((elem) => elem === optionID)
            ? 'border-1 border border-[#7e87ef]'
            : ''
        }`}
        onClick={() => {
          // If an optionID is present, remove the empty string from the list
          // If no optionID is present in the list, keep the response as [""]
          if (isMCQ) {
            if (response[questionCode]?.find((elem) => elem === optionID)) {
              setResponse((prev) => {
                return {
                  ...prev,
                  [questionCode]: response[questionCode]?.filter(
                    (elem) => elem !== optionID,
                  ),
                };
              });
              if (response.length === 0) {
                setResponse((prev) => {
                  return {
                    ...prev,
                    [questionCode]: [''],
                  };
                });
              }
            } else {
              if (
                response[questionCode]?.length === 1 &&
                response[questionCode][0] === ''
              ) {
                setResponse((prev) => {
                  return {
                    ...prev,
                    [questionCode]: [optionID],
                  };
                });
              } else {
                setResponse((prev) => {
                  return {
                    ...prev,
                    [questionCode]: [...response[questionCode], optionID],
                  };
                });
              }
            }
          } else {
            setResponse((prev) => {
              return {
                ...prev,
                [questionCode]: [optionID],
              };
            });
          }
        }}
      >
        <p
          className={`text-[16px] ${
            response[questionCode]?.find((elem) => elem === optionID)
              ? 'text-[#7e87ef]'
              : 'text-[#b1b1b1]'
          }`}
        >
          {optionValue}
        </p>
      </div>
    );
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      {options &&
        options?.map((option, idx) => {
          return (
            <Option
              isMCQ={isMCQ}
              response={response}
              setResponse={setResponse}
              optionID={option?.id}
              optionValue={option?.value}
              questionCode={questionCode}
              key={option?.id}
            />
          );
        })}
    </div>
  );
}

export default Options;
