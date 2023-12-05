import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LandingPage, ProgressBar, Question } from '../Questionnaire';
import { getSections, setLoading } from './QuestionnaireSlice';
import { Error, Loader } from '../../components';
import { LoadingPage } from '../../pages';

const Questionnaire = () => {
  //getting state from the store

  const { status, error } = useSelector((store) => store.questionnaireReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());

    dispatch(getSections());
  }, [dispatch]);

  return (
    <>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error>{error}</Error>}
      {status === 'ready' && <LandingPage />}
      {status === 'active' && (
        <>
          <ProgressBar />
          <Question />
        </>
      )}

      {status === 'finish' && <LoadingPage />}
    </>
  );
};

export default Questionnaire;
