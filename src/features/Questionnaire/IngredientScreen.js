import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { mealproportion, mealResponse } from './utils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
  },
  components: {
    MuiStaticTimePicker: {
      defaultProps: {
        components: {
          ActionBar: () => null, // Removes Cancel and OK buttons
        },
      },
    },
  },
});

const IngredientScreen = ({
  response,
  setResponse,
  ingredient,
  setShowIngredientScreen,
}) => {
  const tagArray = response.find((item) => item.code === 'onb5');

  const ingredientResponse = response
    .find((item) => item.code === 'onb15')
    .value.find((item) => item.meal === ingredient.id).ingredients;

  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [showIngredient, setShowIngredients] = useState(null);
  const [ingredientType, setIngredientType] = useState(ingredientResponse);
  const [filteredOptions, setFilteredOptions] = useState(null);

  console.log(filteredOptions);

  useEffect(() => {
    const filterOptions = ingredient.modifications.map((item, index) => {
      if (index === 3) {
        let mealType = tagArray.value;

        if (mealType[0] === 'non_vegetarian') {
          mealType = ['vegetarian', 'non_vegetarian'];
        }
        if (mealType[0] === 'pescatarian') {
          mealType = ['vegetarian', 'pescatarian'];
        }
        if (mealType[0] === 'eggetarian') {
          mealType = ['vegetarian', 'eggetarian'];
        }
        const newIngredients = item.ingredients.map((category) => ({
          ...category, // Spread to preserve other properties
          options: category.options
            .filter((option) =>
              option.tags.some((tag) => mealType.includes(tag)),
            )
            .map((item) => item.name),
        }));

        return {
          ...item, // Spread the original item properties
          ingredients: newIngredients, // Replace ingredients with filtered and mapped ones
        };
      }
      return item; // Return unmodified items for other indices
    });

    setFilteredOptions(filterOptions);
  }, [ingredient]);

  const ress = response
    .find((item) => item.code === 'onb15')
    .value.find((item) => item.meal === ingredient.id).time;

  useEffect(() => {
    if (ingredientType.length > 0) {
      setResponse((prevResponse) =>
        prevResponse.map((item) => {
          if (item.code === 'onb15') {
            return {
              ...item,
              value: item.value.map((mealObj) =>
                mealObj.meal === ingredient.id
                  ? { ...mealObj, ingredients: ingredientType }
                  : mealObj,
              ),
            };
          }
          return item;
        }),
      );
    }
  }, [ingredientType]);

  const getTime = (e) => {
    const now = dayjs();
    const dateString = `${now.format('YYYY-MM-DD')} ${e}`;
    const currentTime = dayjs(dateString, 'YYYY-MM-DD h:mm A');
    return currentTime;
  };

  const handleTime = (e) => {
    const date = new Date(e);

    setSelectedTime(e);
    // Convert to desired time format
    const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Fixed minutes as 00
    const amPm = date.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${minutes} ${amPm}`;

    setResponse((prevResponse) =>
      prevResponse.map((item) => {
        if (item.code === 'onb15') {
          return {
            ...item,
            value: item.value.map((mealObj) =>
              mealObj.meal === ingredient.id
                ? { ...mealObj, time: formattedTime }
                : mealObj,
            ),
          };
        }
        return item;
      }),
    );
  };
  const handleIngredientTabs = (e) => {
    if (showIngredient === e) {
      setShowIngredients(null);
    }
    if (showIngredient !== e) {
      setShowIngredients(e);
    }
  };

  const updateIngredients = ({ ingredient }) => {
    const existingType = ingredientType.find(
      (item) => item.type === showIngredient,
    );

    let existingIngredient = existingType?.options?.some(
      (item) => item === ingredient,
    );

    if (existingIngredient) {
      setIngredientType((prevData) => {
        // Check if the type already exists in the state
        const existingType = prevData.find(
          (item) => item.type === showIngredient,
        );

        if (existingType) {
          // If the type exists, update the options array by removing the ingredient
          return prevData.map((item) =>
            item.type === showIngredient
              ? {
                  ...item,
                  options: item.options.filter(
                    (option) => option !== ingredient, // Remove the ingredient if it exists
                  ),
                }
              : item,
          );
        }
      });
    } else {
      setIngredientType((prevData) => {
        // Check if the type already exists in the state
        const existingType = prevData.find(
          (item) => item.type === showIngredient,
        );

        if (existingType) {
          // If the type exists, update the options array
          return prevData.map((item) =>
            item.type === showIngredient
              ? {
                  ...item,
                  options: item.options.includes(ingredient)
                    ? item.options // Do nothing if the option already exists
                    : [...item.options, ingredient], // Add the new option
                }
              : item,
          );
        } else {
          // If the type doesn't exist, add a new entry
          return [...prevData, { type: showIngredient, options: [ingredient] }];
        }
      });
    }
  };

  const updatePlateSize = (newPlateSize) => {
    setResponse((prevResponse) =>
      prevResponse.map((item) => {
        if (item.code === 'onb15') {
          return {
            ...item,
            value: item.value.map((mealObj) =>
              mealObj.meal === ingredient.id
                ? { ...mealObj, plateSize: newPlateSize }
                : mealObj,
            ),
          };
        }
        return item;
      }),
    );
  };

  const handleMealProportion = (proportionData) => {
    setResponse((prevResponse) =>
      prevResponse.map((item) => {
        if (item.code === 'onb15') {
          return {
            ...item,
            value: item.value.map((mealObj) =>
              mealObj.meal === ingredient.id
                ? { ...mealObj, mealProportion: proportionData }
                : mealObj,
            ),
          };
        }
        return item;
      }),
    );

    if ('carbs' in proportionData) {
      setResponse((prevResponse) =>
        prevResponse.map((item) => {
          if (item.code === 'onb15') {
            return {
              ...item,
              value: item.value.map((mealObj) =>
                mealObj.meal === ingredient.id
                  ? {
                      ...mealObj,
                      ingredients: filteredOptions[3].ingredients.filter(
                        (item) => item.type !== 'Fats',
                      ),
                    }
                  : mealObj,
              ),
            };
          }
          return item;
        }),
      );

      setIngredientType(
        filteredOptions[3].ingredients.filter((item) => item.type !== 'Fats'),
      );
    }

    if ('fats' in proportionData) {
      setResponse((prevResponse) =>
        prevResponse.map((item) => {
          if (item.code === 'onb15') {
            return {
              ...item,
              value: item.value.map((mealObj) =>
                mealObj.meal === ingredient.id
                  ? {
                      ...mealObj,
                      ingredients: filteredOptions[3].ingredients.filter(
                        (item) => item.type !== 'Carbs',
                      ),
                    }
                  : mealObj,
              ),
            };
          }
          return item;
        }),
      );
      setIngredientType(
        filteredOptions[3].ingredients.filter((item) => item.type !== 'Carbs'),
      );
    }
  };

  const IngredientResponse = response
    .find((item) => item.code === 'onb15')
    .value.find((item) => item.meal === ingredient.id);

  const foodImg = mealResponse[ingredient.id].img;

  return (
    <div className="fixed bottom-0 left-0 z-20 h-[100%] w-screen overflow-y-scroll bg-black-opacity-71 px-4 py-5 pb-[110px]">
      <div className="mt-[30px] flex w-full justify-between">
        <div className="flex w-full items-center gap-2">
          <img src={foodImg} alt="food" /> {ingredient.value}
        </div>

        <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white-opacity-08 ">
          <RxCross1
            onClick={() => setShowIngredientScreen(false)}
            className=""
          />
        </div>
      </div>
      <div className="mt-[41px] flex flex-col gap-5 ">
        <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
          <div className="mb-[14px] font-sfpro text-[14px] text-offwhite">
            {ingredient.modifications[0].content}
          </div>
          <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid black',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: 'background.default', // Use theme's default background
                }}
              >
                <StaticTimePicker
                  value={getTime(ress) ? getTime(ress) : selectedTime}
                  onChange={(newValue) => handleTime(newValue)}
                  components={{
                    ActionBar: () => null, // Removes OK/Cancel buttons
                  }}
                  sx={{
                    '& .MuiClock-root': {
                      backgroundColor: 'background.paper', // Optional styling for clock
                    },
                    '& .MuiDialogActions-root': {
                      display: 'none',
                    },
                    '& .MuiClockNumber-root': {
                      color: 'text.primary', // Optional styling for clock numbers
                    },
                  }}
                />
              </Box>
            </LocalizationProvider>
          </ThemeProvider>

          <time />
        </div>
        <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
          <div className="font-sfpro text-[14px] text-offwhite">
            {ingredient.modifications[2].content}
            <div className="mt-[17px] flex w-full gap-2">
              <div
                onClick={() => updatePlateSize('small_plate')}
                className={`flex h-[92px] w-full flex-col justify-between rounded-[12px] bg-black px-3 py-2  ${
                  IngredientResponse.plateSize === 'small_plate'
                    ? 'border border-green text-green'
                    : 'text-white'
                }`}
              >
                <div>Small Plate</div>
                <div className="flex justify-end">
                  <div
                    className={`flex h-[36px]  w-[36px] items-center justify-center rounded-full border-4 ${
                      IngredientResponse.plateSize === 'small_plate'
                        ? 'border-green'
                        : 'border-white'
                    } `}
                  >
                    <div
                      className={`h-[20px] w-[20px]  rounded-full border-[1px] ${
                        IngredientResponse.plateSize === 'small_plate'
                          ? 'border-green'
                          : 'border-white'
                      } `}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => updatePlateSize('large_plate')}
                className={`flex h-[92px] w-full flex-col justify-between rounded-[12px] bg-black px-3 py-2 ${
                  IngredientResponse.plateSize === 'large_plate'
                    ? 'border border-green text-green'
                    : 'text-white'
                }`}
              >
                <div>Large Plate</div>
                <div className="flex justify-end">
                  <div
                    className={`flex h-[50px]  w-[50px] items-center justify-center rounded-full border-4  ${
                      IngredientResponse.plateSize === 'large_plate'
                        ? 'border-green'
                        : 'border-white'
                    } `}
                  >
                    <div
                      className={`h-[30px] w-[30px]  rounded-full border-[1px] ${
                        IngredientResponse.plateSize === 'large_plate'
                          ? 'border-green'
                          : 'border-white'
                      } `}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white-opacity-08 px-4 py-[15px]">
          {mealproportion.map((item) => {
            if (item.id === ingredient.id) {
              return (
                <div>
                  <div className="font-sfpro text-[14px] text-offwhite">
                    {item.portion.length === 1 ? 'Recommended' : 'Choose your'}{' '}
                    meal proportion
                  </div>
                  <div className="mt-[31px] flex flex-col gap-2">
                    {item.portion.map((data, i, proportion) => (
                      <div
                        className={`rounded-xl bg-black-opacity-45 ${
                          proportion.length === 1 && 'border border-green'
                        }  ${
                          IngredientResponse.mealProportion.carbs ===
                            data.mealProportion.carbs && 'border border-green'
                        }`}
                        onClick={() =>
                          handleMealProportion(data.mealProportion)
                        }
                        key={i}
                      >
                        <img className="pt-3" src={data.img} alt="food" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else return null;
          })}
        </div>
      </div>

      <div className="mt-[24px] pb-[37px]">
        <div className="font-sfpro text-[14px] ">
          {ingredient.modifications[3].content}
        </div>

        <div className=" font-sfpro text-sm text-white-opacity-23">
          {ingredient.modifications[3].description}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {filteredOptions
          ?.find((item) => item.target.includes('ingredients'))
          ?.ingredients.filter((item) =>
            IngredientResponse.ingredients.some(
              (foodType) => foodType.type === item.type,
            ),
          )
          .map((item) => (
            <div key={item.id}>
              <div className="items-center rounded-xl bg-white-opacity-08 px-4 py-[19px] capitalize">
                <div
                  className="flex w-full justify-between"
                  onClick={() => handleIngredientTabs(item.type)}
                >
                  <div className="flex w-full justify-between pr-3 text-center font-sfpro text-sm text-customWhiteSecond">
                    {item.type}
                    <div className="text-center text-xs text-green">
                      {(() => {
                        const matchedData = ingredientType?.find(
                          (data) => data?.type === item?.type,
                        );

                        return `${
                          matchedData?.options?.length
                            ? matchedData.options.length
                            : '0'
                        } selected`;
                      })()}
                    </div>
                  </div>
                  <img
                    src="assets/arrow-down-gree.svg"
                    className={`${
                      showIngredient === item.type && 'rotate-180'
                    }`}
                    alt="arrow"
                  />
                </div>
                {showIngredient === item.type && (
                  <div className="mt-[22px] flex flex-col gap-2">
                    {item.options.map((ingredient) => (
                      <div
                        onClick={() => updateIngredients({ ingredient })}
                        className={`rounded-xl  px-[23px] py-[11px] text-[16px]  bg-blend-luminosity ${
                          IngredientResponse.ingredients.some((item) =>
                            item.options.includes(ingredient),
                          )
                            ? 'border border-green bg-dark-green-opacity-66 text-green'
                            : 'bg-black-opacity-45 text-offwhite'
                        } `}
                      >
                        {ingredient}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="fixed bottom-6 left-0 z-[150] w-full px-4">
        <button
          style={{ fontWeight: 500 }}
          className=" flex min-h-[54px] w-full items-center justify-center rounded-xl bg-customWhiteSecond text-center text-black"
          onClick={() => setShowIngredientScreen(false)}
        >
          Done
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default IngredientScreen;
