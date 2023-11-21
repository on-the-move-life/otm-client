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

const Inner = styled.div`
  width: calc(11 * 20.5px - 10px);
  height: calc(15px + 1em);
  max-width: calc(11 * 20.5px - 10px);
`;

const BarContainer = styled.div`
  display: flex;
  gap: 5px;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Block = styled.div`
  flex-grow: 1;
  height: 15px;
  border-radius: 3.33px;
  transition: background-color 0.3s ease-in-out;
`;

const BlockContainer = styled(m.div)`
  position: relative;
  width: 15px;
`;

const Label = styled(m.div)`
  color: white;
`;

const generateGradient = (startHex, endHex) => {
  let gradient = [];
  for (let i = 0; i <= 100; i += 10) {
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

const Testing = ({ progress }) => {
  const gradient = useMemo(() => generateGradient('ACEBC6', '9CC2EB'), []);
  const totalSteps = 11;
  const stepsToFill = Math.floor((progress / 10) * totalSteps);

  return (
    <Container>
      <Inner>
        <BarContainer>
          {[...new Array(totalSteps)].map((_, i) => (
            <BlockContainer key={i}>
              <Block
                style={{
                  backgroundColor: i <= stepsToFill ? gradient[i] : '#242424',
                  width:
                    i === stepsToFill
                      ? `${((progress / 10) * totalSteps - i) * 15}px`
                      : '15px',
                }}
              />
              {i === stepsToFill && stepsToFill !== 0 && stepsToFill !== 10 && (
                <Label layoutId={`percentage-${i}`}>{`${progress}`}</Label>
              )}
              {(i === 0 || i === 10) && <Label>{`${i}`}</Label>}
            </BlockContainer>
          ))}
        </BarContainer>
      </Inner>
    </Container>
  );
};

export default Testing;
