import React from 'react';
import AnalyseMealComp from './components/AnalyseMealComp';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MealUploadHeading = styled.h1`
  color: var(--White, #fff);
  text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
`;

const MealUpload = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-h-screen w-full flex-col px-4 py-8 justify-center overflow-y-scroll">
        <div className="flex h-full w-full flex-col items-start justify-between">
          <div className="mb-4">
            <HiArrowNarrowLeft
              size={20}
              onClick={() => {
                navigate('/home');
              }}
            />
          </div>
          <div className='w-full flex flex-row justify-between items-center'>
            <MealUploadHeading>Meal Upload</MealUploadHeading>
          </div>
        </div>

        <div className='w-full'>
          <AnalyseMealComp />
        </div>
      </div>
    </>
  );
};

export default MealUpload;
