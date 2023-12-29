import { useMemo } from 'react';
import { m } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 2em;
  height: auto;
`;

const BarContainer = styled.div`
  display: flex;
  gap: 5px;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Inner = styled.div`
  width: calc(26 * 20.5px - 10px);
  height: calc(15px + 1em);
  max-width: calc(26 * 20.5px - 10px);
`;

const Block = styled.div`
  flex-grow: 1;
  height: 10px;
  border-radius: 3.33px;
  transition: background-color 0.3s ease-in-out;
`;

const BlockContainer = styled(m.div)`
  position: relative;
  width: 100%;
`;

const Label = styled(m.div)`
  color: white;
`;

const generateGradient = (startHex, endHex, total) => {
  let gradient = [];
  for (let i = 0; i <= 100; i += total) {
    const ratio = i / 100;
    const start = parseInt(startHex.slice(0, 2), 16);
    const end = parseInt(endHex.slice(0, 2), 16);
    const r = Math.round(start * (1 - ratio) + end * ratio)
      .toString(16)
      .padStart(2, '0');
    const startG = parseInt(startHex.slice(2, 4), 16);
    const endG = parseInt(endHex.slice(2, 4), 16);
    const g = Math.round(startG * (1 - ratio) + endG * ratio)
      .toString(16)
      .padStart(2, '0');
    const startB = parseInt(startHex.slice(4, 6), 16);
    const endB = parseInt(endHex.slice(4, 6), 16);
    const b = Math.round(startB * (1 - ratio) + endB * ratio)
      .toString(16)
      .padStart(2, '0');
    gradient.push(`#${r}${g}${b}`);
  }
  return gradient;
};

const SkillScore = ({ progress, total }) => {
  const gradient = useMemo(
    () => generateGradient('ACEBC6', '9CC2EB', total),
    [],
  );
  const totalSteps = total + 1;
  const stepsToFill = Math.floor((progress / total) * total);

  return (
    <Container>
      <Inner>
        <BarContainer>
          {[...new Array(totalSteps)].map((_, i) => (

            <BlockContainer key={i}>
              <Block
                style={{
                  backgroundColor: i <= stepsToFill ?  '#DDF988' : '#242424',
                  width:
                    i === stepsToFill
                      ? `${((progress / total) * totalSteps - i) * 15}px`
                      : '5px',
                }}
              />
              {/* {i === stepsToFill &&
                stepsToFill !== 0 &&
                stepsToFill !== total && (
                  <Label layoutId={`percentage-${i}`}>{`${progress}`}</Label>
                )}
              {(i === 0 || i === total) && <Label>{`${i}`}</Label>} */}
            </BlockContainer>
          ))}
        </BarContainer>
      </Inner>
    </Container>
  );
};

export default SkillScore;
