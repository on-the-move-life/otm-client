import React from 'react';
import styled from 'styled-components';
import { useTagAndColor } from '../../hooks/useTagAndColor';

const Container = styled.div`
  width: auto;
  height: 104px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 0.5px solid #383838;
  background: linear-gradient(180deg, #171717 0%, #0f0f0f 100%);
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 15px;
`;
const Heading = styled.div`
  color: var(--Light-gray, #b1b1b1);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 8px;
  font-style: normal;
  font-weight: 510;
  line-height: normal;
  letter-spacing: 3px;
  text-transform: uppercase;
`;
const Score = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  background: var(
    --Green-purple-gradient,
    linear-gradient(96deg, #9bf2c0 1.49%, #91bdf6 103.49%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const ScoreDetail = styled.div`
  color: #545454;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 9.333px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Percentile = styled.span`
  background: var(
    --Green-purple-gradient,
    linear-gradient(96deg, #9bf2c0 1.49%, #91bdf6 103.49%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Card body */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 9.333px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const HorizontalBar = styled.div`
  --color: ${(props) => props.color};
  width: 20px;
  height: 3px;
  border-radius: 5px;
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

function FitnessScore({ score, percentile }) {
  const [tag, color, position, colors, tags] = useTagAndColor(score);

  // Indicator component
  const Indicator = ({ style }) => {
    return (
      <div style={style} className="relative">
        <div className="h-[8px] w-[1px] bg-white"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5"
          height="5"
          viewBox="0 0 2 2"
          className="absolute bottom-0 left-[-2px]"
        >
          <polygon points="0,2 1,0 2,2" fill="white" />
        </svg>
      </div>
    );
  };

  // Score Indicator component
  const ScoreIndicator = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div
          style={{ backgroundColor: color }}
          className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]"
        >
          <TagText>{tag}</TagText>
        </div>

        <div className="relative w-fit">
          <Indicator style={{ position: 'absolute', left: `${position}px` }} />
          <div className="flex w-fit flex-row items-center justify-center gap-[1px]">
            {[...Array(5)].map((_, index) => {
              return (
                <HorizontalBar
                  color={colors[index]}
                  key={Math.random() * 1000}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Container>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-center justify-center w-6/12 gap-2">
          <Heading>Fitness Score</Heading>
          {score ? <Score>{score}</Score> : <Score>-</Score>}
          <ScoreDetail>
            Top <Percentile>{percentile}%</Percentile> of the community
          </ScoreDetail>
        </div>
        <div className="flex flex-col items-center justify-center w-6/12 gap-2">
          <ScoreIndicator />
        </div>
      </div>
    </Container>
  );
}

export default FitnessScore;
