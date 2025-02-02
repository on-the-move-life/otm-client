import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const HorizontalBar = styled.div`
  --color: ${(props) => props.color};
  width: ${(props) => `${props.width}px`};
  height: 12px;
  border-radius: 6px;
  background: var(--color);
`;

const TagText = styled.p`
  color: #000;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 590;
  line-height: normal;
  letter-spacing: -0.36px;
  text-transform: capitalize;
`;

// Score Indicator component
const ScoreIndicator = ({ height, weight }) => {
  const barLength = 76; // each bar lenght in px
  const tags = useMemo(
    () => ['Underweight', 'Normal Weight', 'Overweight', 'Obese'],
    [],
  );
  const colors = useMemo(
    () => ['#DDF988', '#5ECC7B', '#F5C563', '#FA5757'],
    [],
  );
  const healthStatus = useMemo(
    () => ['underweight', 'healthy', 'overweight', 'obesity'],
    [],
  );
  const [score, setScore] = useState(0);
  const [tagColorPosition, setTagAndColorPosition] = useState([
    tags[0],
    colors[0],
    0,
    colors,
    tags,
    healthStatus[0],
  ]);

  useEffect(() => {
    const bmi = calculateBMI(weight, height);
    setScore(bmi);
    try {
      const [tag, color, position, colors, tags, healthStatus] =
        setTagAndColorAndPosition(bmi);
      setTagAndColorPosition([
        tag,
        color,
        position,
        colors,
        tags,
        healthStatus,
      ]);
    } catch (e) {
      console.log('error : ', e);
      const position = 0;
      // return [tag, color, position, colors<array>, tags<array>, healthStatus]
      setTagAndColorPosition([
        tags[0],
        colors[0],
        position,
        colors,
        tags,
        healthStatus[0],
      ]);
    }
  }, [height, weight, score, colors, tags, healthStatus]);

  // function to calculate the BMI given inputs height in cm and weight in kg
  function calculateBMI(weight, height) {
    // Convert height from centimeters to meters
    height /= 100;

    // Calculate BMI using the formula: BMI = weight(kg) / height(m)^2
    const bmi = weight / (height * height);

    // Truncate the BMI result to 1 decimal place
    const truncatedBMI = parseFloat(bmi.toFixed(1));

    return truncatedBMI;
  }

  const setTagAndColorAndPosition = useCallback(
    (score) => {
      // index of the tag
      let index = 0;
      if (score < 18.5) index = 0;
      else if (score >= 18.5 && score < 25) index = 1;
      else if (score >= 25 && score < 29.9) index = 2;
      else index = 3;

      // position of the bar
      let position = 0;
      if (score >= 29.9) {
        position = 3 * barLength + ((score - 29.9) * barLength) / 50 - 9; // normalised to 50 units per bar length(80px)
        if (position >= 4 * barLength) {
          position = 4 * barLength - 9;
        }
      } else if (score >= 25) {
        position = 2 * barLength + ((score - 25) * barLength) / (29.9 - 25) - 9; // normalised to (29.9 - 25) units per bar length(80px)
      } else if (score >= 18.5) {
        position =
          1 * barLength + ((score - 18.5) * barLength) / (25 - 18.5) - 9; // normalised to (25 - 18.5) units per bar length(80px)
      } else {
        position = ((score - 0) * barLength) / (18.5 - 0) - 9; // normalised to (18.5 - 0) units per bar length(80px)
      }

      return [
        tags[index],
        colors[index],
        position,
        colors,
        tags,
        healthStatus[index],
      ];
    },
    [colors, tags],
  );

  // Indicator component
  const Indicator = ({ style, bgColor }) => {
    return (
      <div
        style={{ ...style, backgroundColor: bgColor }}
        className={`relative flex h-[18px] w-[18px] items-center justify-center rounded-full`}
      >
        <div className="h-[12px] w-[12px] rounded-full bg-white"></div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-[9rem]">
      <div className="flex w-full flex-col items-center justify-center gap-[4rem]">
        <div className="flex w-full flex-col items-center justify-center">
          <p
            className="font-futura text-[90px] uppercase"
            style={{
              color: tagColorPosition[1],
            }}
          >
            {score}
          </p>
          <p
            className="textbox-text relative text-center uppercase tracking-wider"
            style={{ top: '-25px' }}
          >
            current bmi
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <div className="relative flex w-full flex-col items-center justify-center gap-4">
            <div className="relative w-fit">
              <div
                className={`absolute top-[-37px] z-[70] flex h-[50px] w-[100px] flex-row items-start justify-center bg-cover bg-no-repeat text-[12px] font-bold text-black`}
                style={{
                  left: `${tagColorPosition[2] - 41}px`,
                  backgroundImage: `url(${'/assets/scoreIndicator_dialogue.svg'})`,
                }}
              >
                <TagText className="relative z-50 pt-[5px]">Your BMI</TagText>
              </div>
              <Indicator
                style={{
                  position: 'absolute',
                  left: `${tagColorPosition[2]}px`,
                  top: '-3px',
                }}
                bgColor={tagColorPosition[1]}
              />
              <div className="flex w-fit flex-row items-center justify-center gap-[1px]">
                {[...Array(4)].map((_, index) => {
                  return (
                    <HorizontalBar
                      color={colors[index]}
                      key={Math.random() * 1000}
                      width={barLength}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <p
            className="mt-[10px] text-center font-sfpro text-[18px] text-offwhite"
            style={{ fontWeight: 300, lineHeight: '25px' }}
          >
            Your current BMI according to your height & weight is {score}, which
            is{' '}
            <span style={{ color: tagColorPosition[1] }}>
              {tagColorPosition[5]}
            </span>
            !!
          </p>
        </div>
      </div>
      {/* <div className='text-[20px] text-[#8c8c8c] capitalize'>This is a small congratulatory or encouraging comment!!!</div> */}
    </div>
  );
};

export default ScoreIndicator;
