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
      <div className="flex flex-col justify-center w-full h-screen px-4 py-8">
        <div className="flex h-fit">
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start justify-between w-full h-full">
              <div className="mb-4">
                <HiArrowNarrowLeft
                  size={20}
                  onClick={() => {
                    navigate('/nutrition');
                  }}
                />
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <MealUploadHeading>Meal Upload</MealUploadHeading>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto">
          <AnalyseMealComp />
        </div>
      </div>
    </>
  );
};

export default MealUpload;
