import React from 'react';
import { useSelector } from 'react-redux';
// import { Progress } from 'rsuite';

const ProgressBar = () => {
  const { index = 0, sections = [] } = useSelector(
    (store) => store.questionnaireReducer,
  );

  return (
    <>
      {sections.length > 0 && (
        <div className="my-12 flex w-full justify-center py-2 text-lightPurple">
          <span>
            {index + 1}/{sections.length}
          </span>
          {/* <Progress.Line percent={30} strokeColor="#ffc107" /> */}
        </div>
      )}
    </>
  );
};

export default ProgressBar;
