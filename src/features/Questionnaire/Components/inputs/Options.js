import React, { useState } from 'react';
import { mealproportion } from '../../utils';
import { FULL, HOME, LIA, MOA, NOEQ, SED, SHRED, SIZE, SUA, VEA } from '../svg';

function Options({
  questionCode,
  options,
  MCQType,
  target,
  response,
  setResponse,
  heading,
  questionnaireData,
}) {
  const [isTextFieldActive, setTextFieldActive] = useState(false);

  const RenderSVG = (name, isSelected) => {
    switch (name) {
      case 'FULL':
        return <FULL isSelected={isSelected} />;
      case 'HOME':
        return <HOME isSelected={isSelected} />;
      case 'LIA':
        return <LIA isSelected={isSelected} />;
      case 'MOA':
        return <MOA isSelected={isSelected} />;
      case 'NOEQ':
        return <NOEQ isSelected={isSelected} />;
      case 'SED':
        return <SED isSelected={isSelected} />;
      case 'SHRED':
        return <SHRED isSelected={isSelected} />;
      case 'SIZE':
        return <SIZE isSelected={isSelected} />;
      case 'SUA':
        return <SUA isSelected={isSelected} />;
      case 'VEA':
        return <VEA isSelected={isSelected} />;
      default:
        break;
    }
  };
  const Option = ({
    questionCode,
    optionID,
    optionValue,
    optionDescription,
    MCQType,
    response,
    setResponse,
  }) => {
    const handleResponseUpdate = (updatedValue) => {
      if (questionCode === 'onb11' && updatedValue[0] === 'no_thanks') {
        setResponse((prev) => {
          return prev.map((item) =>
            item.code === 'onb12' ? { ...item, value: [''] } : item,
          );
        });
      }

      setResponse((prev) => {
        const existingQuestionResponse = prev.find(
          (item) => item.code === questionCode,
        );

        if (existingQuestionResponse) {
          // If response for this question already exists, update its value
          return prev.map((item) =>
            item.code === questionCode
              ? { ...item, value: updatedValue }
              : item,
          );
        } else {
          // If no response for this question, add a new entry
          return [...prev, { code: questionCode, value: updatedValue }];
        }
      });
    };

    const handleClick = () => {
      if (MCQType === 'multiChoice') {
        // Handle multiChoice case
        const currentSelection =
          response.find((item) => item.code === questionCode)?.value || [];

        if (currentSelection.includes(optionID)) {
          setResponse((prev) => {
            const filterData = currentSelection.filter(
              (item) => item !== optionID,
            );

            return prev.map((item) =>
              item.code === questionCode
                ? { ...item, value: filterData }
                : item,
            );
          });
        } else {
          // If option is not selected, add it
          if (
            (currentSelection.length === 1 && currentSelection[0] === '') ||
            currentSelection.length === 0
          ) {
            const updatedValue = [optionID];
            handleResponseUpdate(updatedValue);
          }
          if (currentSelection.length > 0 && currentSelection[0] !== '') {
            const updatedValue = [...currentSelection, optionID];
            handleResponseUpdate(updatedValue);
          }
        }
      } else if (MCQType === 'singleChoice') {
        // Handle singleChoice case
        handleResponseUpdate([optionID]);
      } else if (MCQType === 'singleChoiceAndOther') {
        // Handle singleChoiceAndOther case
        if (isTextFieldActive) {
          setTextFieldActive(false);
        }
        handleResponseUpdate([optionID]);
      } else if (MCQType === 'multiChoiceAndOther') {
        const currentSelection =
          response.find((item) => item.code === questionCode)?.value || [];

        if (currentSelection.includes(optionID)) {
          setResponse((prev) => {
            const filterData = currentSelection.filter(
              (item) => item !== optionID,
            );

            return prev.map((item) =>
              item.code === questionCode
                ? { ...item, value: filterData }
                : item,
            );
          });
        } else {
          // If option is not selected, add it
          const updatedValue = [...currentSelection, optionID];
          setResponse((prev) => {
            const existingQuestionResponse = prev.find(
              (item) => item.code === questionCode && item.value[0] !== '',
            );

            if (existingQuestionResponse) {
              // If response for this question already exists, update its value
              return prev.map((item) =>
                item.code === questionCode
                  ? { ...item, value: updatedValue }
                  : item,
              );
            } else {
              // If no response for this question, add a new entry
              return prev.map((item) =>
                item.code === questionCode
                  ? { ...item, value: [optionID] }
                  : item,
              );
            }
          });
        }
      } else if (MCQType === 'nestedMultichoice') {
        const selectedNestedChoice = options.find(
          (item) => item.id === optionID,
        );

        const selectedMealProportion = mealproportion.find(
          (item) => item.id === selectedNestedChoice.id,
        ).portion[0].mealProportion;

        setResponse((prev) => {
          const existingQuestionResponse = prev.find(
            (item) => item.code === questionCode,
          );

          const tagArray = response.find((item) => item.code === 'onb5');

          const filteredOptions =
            selectedNestedChoice.modifications[3].ingredients.filter(
              (category) => {
                if (category.type !== 'Fats') {
                  return {
                    type: category.type,
                    options: category.options.filter((option) =>
                      option.tags.some((tag) => tagArray.value.includes(tag)),
                    ),
                  };
                }
              },
            );

          // Construct the new response for the selected option
          const newNestedChoice = {
            meal: optionID,
            time: '9:00 AM',
            plateSize: 'small_plate',
            mealProportion: selectedMealProportion,
            ingredients: filteredOptions,
          };

          if (existingQuestionResponse.value[0] !== '') {
            // If response for this question already exists, check if the nested choice already exists
            const isDuplicate = existingQuestionResponse.value.some(
              (item) => item.meal === optionID, // Check for duplication based on meal (optionID)
            );

            if (isDuplicate) {
              // If the choice is already selected, remove it from the response
              return prev.map((item) =>
                item.code === questionCode
                  ? {
                      ...item,
                      value: item.value.filter(
                        (nestedItem) => nestedItem.meal !== optionID,
                      ),
                    }
                  : item,
              );
            } else {
              // If it's not a duplicate, add the new nested choice to the value array
              return prev.map((item) =>
                item.code === questionCode
                  ? {
                      ...item,
                      value: [...item.value, newNestedChoice], // Add the new choice
                    }
                  : item,
              );
            }
          } else {
            // If no response for this question, add a new entry with the nested choice

            return prev.map((item) =>
              item.code === questionCode
                ? {
                    ...item,
                    value: [newNestedChoice], // Add the new choice
                  }
                : item,
            );
          }
        });
      }
    };

    const responseValue = response.find((item) => item.code === questionCode);

    return (
      <div
        className={`border-box flex w-full  items-center justify-between rounded-[12px] bg-white-opacity-08 pl-3 pr-5 ${
          responseValue?.value.includes(optionID)
            ? `border-1 border ${questionnaireData.border}`
            : ''
        } ${
          questionCode === 'onb15' &&
          responseValue?.value.find((item) => item.meal === optionID)
            ? `border-1 border ${questionnaireData.border}`
            : ''
        }`}
        onClick={() => handleClick()}
      >
        <div
          className={`flex w-full flex-col justify-center  ${
            questionCode === 'onb1'
              ? 'items-center py-3'
              : 'items-start px-2 py-4'
          }`}
        >
          <p
            className={` text-[14px]  ${
              responseValue?.value.includes(optionID)
                ? `${questionnaireData.text}`
                : 'text-[#b1b1b1]'
            }`}
          >
            {optionValue}
          </p>
          <p
            className={`text-[13px]  ${
              responseValue?.value.includes(optionID)
                ? `${questionnaireData.text}`
                : 'text-[#929292]'
            }`}
          >
            {optionDescription}
          </p>
        </div>
        {RenderSVG(optionID, responseValue?.value.includes(optionID))}
      </div>
    );
  };

  const responseValue = response?.find((item) => item.code === questionCode)
    .value[0];

  return (
    <div>
      <div className="flex flex-col gap-[13px] rounded-xl bg-black-opacity-45 px-3 py-[15px]">
        <div className="text-[14px] text-offwhite">{heading}</div>
        <div
          className={`flex h-full w-full  items-center justify-center gap-2 ${
            questionCode !== 'onb1' ? 'flex-col' : 'flex-row'
          } `}
        >
          {options &&
            options?.map((option, idx) => {
              return (
                <div
                  key={option.id}
                  className="w-full "
                  style={{ marginBlock: target === 'MED' ? '20px' : '' }}
                >
                  <Option
                    MCQType={MCQType}
                    response={response}
                    setResponse={setResponse}
                    optionID={option?.id}
                    optionValue={option?.value}
                    optionDescription={option?.description}
                    questionCode={questionCode}
                    key={option?.id}
                  />
                </div>
              );
            })}
        </div>{' '}
      </div>
      {MCQType === 'singleChoiceAndOther' && (
        <div className="mt-2 flex flex-col gap-[14px] rounded-xl bg-black-opacity-45 px-3 py-[15px]">
          <p className="text-[14px] text-offwhite">Others (please Specify)</p>
          <input
            type={'text'} //text
            value={
              questionCode &&
              options.some((item) => responseValue.includes(item.id))
                ? ''
                : response?.find((item) => item.code === questionCode)?.value[0]
            }
            className="min-h-[52px] w-full rounded-xl bg-white-opacity-08 px-[18px] placeholder:text-[14px]"
            onChange={(e) => {
              setResponse((prev) => {
                const data = prev.map((item) =>
                  item.code === questionCode
                    ? { code: questionCode, value: [e.target.value] }
                    : item,
                );

                return data;
              });
            }}
            placeholder={'Please Specify'}
          />
        </div>
      )}

      {MCQType === 'multiChoiceAndOther' && (
        <div className="mt-2 flex flex-col gap-[14px] rounded-xl bg-black-opacity-45 px-3 py-[15px]">
          <p className="text-[14px] text-offwhite">Others (please Specify)</p>
          <input
            type={'text'} //text
            value={
              questionCode &&
              options &&
              responseValue &&
              options.some((item) => responseValue.includes(item.id))
                ? ''
                : response?.find((item) => item.code === questionCode)?.value[0]
            }
            className="min-h-[52px] w-full rounded-xl bg-white-opacity-08 px-[18px] placeholder:text-[14px]"
            onChange={(e) => {
              if (!isTextFieldActive) {
                setTextFieldActive(true); // Activate the text field if it's not already active
              }

              const currentSelection =
                response.find((item) => item.code === questionCode)?.value ||
                [];

              if (currentSelection.length > 0 && e.target.value !== '') {
                const filteredField = currentSelection.filter((item) => {
                  return (
                    item === 'NONE' || item === 'GYM' || item === 'DUMBBELLS'
                  );
                });

                const data = options.filter((item) =>
                  currentSelection.includes(item.id),
                );

                const selectedData = data.map((item) => item.id);

                // Create a new array by adding the new value to the filtered array
                const newField = [e.target.value, ...selectedData];

                // Update the response state with the new array
                setResponse((prev) =>
                  prev.map(
                    (item) =>
                      item.code === questionCode
                        ? { ...item, value: newField } // Update the value for the matching questionCode
                        : item, // Keep other items unchanged
                  ),
                );
              } else {
                // If currentSelection is empty, directly add the value
                if (currentSelection.length === 1 && e.target.value === '') {
                  const data = options.filter((item) =>
                    currentSelection.includes(item.id),
                  );

                  const selectedData = data.map((item) => item.id);

                  // Create a new array by adding the new value to the filtered array
                  const newField = [e.target.value];

                  setResponse((prev) =>
                    prev.map(
                      (item) =>
                        item.code === questionCode
                          ? { ...item, value: newField } // Update the value for the matching questionCode
                          : item, // Keep other items unchanged
                    ),
                  );
                }
                if (currentSelection.length > 1 && e.target.value === '') {
                  const data = options.filter((item) =>
                    currentSelection.includes(item.id),
                  );

                  const selectedData = data.map((item) => item.id);

                  // Create a new array by adding the new value to the filtered array
                  const newField = [...selectedData];
                  setResponse((prev) =>
                    prev.map((item) =>
                      item.code === questionCode
                        ? { ...item, value: newField } // Initialize the array with the new value
                        : item,
                    ),
                  );
                }
              }
            }}
            placeholder={'Please Specify'}
          />
        </div>
      )}
    </div>
  );
}

export default Options;
