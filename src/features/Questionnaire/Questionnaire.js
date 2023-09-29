import React from 'react'
import { QuestionTitle, NextButton, QuestionContent } from '../../components'
import { useDispatch, useSelector } from 'react-redux';

const Questionnaire = () => {

  //state declerations
  const feature1 = useSelector((store) => store.questionnaireReducer.dummy);

  const dispatch = useDispatch();

  // function handleClick() {
  //   dispatch(testFunction1(500));
  // }

  return (
    <div className='flex flex-col justify-evenly items-center h-screen'>
      <QuestionTitle />
      <QuestionContent />
      <NextButton />
    </div>
  )
}

export default Questionnaire;


