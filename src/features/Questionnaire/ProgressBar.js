import React from 'react';
import { useSelector } from 'react-redux';
import { Progress } from 'rsuite';

const ProgressBar = () => {
  const { index, sections } = useSelector(
    (store) => store.questionnaireReducer,
  );

  return (
    <div className="text-lightPurple my-12 flex w-full justify-center py-2">
      <span>
        {index + 1}/{sections.length}
      </span>
      {/* <Progress.Line percent={30} strokeColor="#ffc107" /> */}
    </div>
  );
};

export default ProgressBar;
