import { useDispatch, useSelector } from 'react-redux';
import { finish } from './QuestionnaireSlice';

const NextButton = ({ submitResponse, disableButton, sectionCode }) => {
  const { sections, index } = useSelector(
    (store) => store.questionnaireReducer,
  );
  const dispatch = useDispatch();

  function handleNext() {
    submitResponse(sectionCode);
    if (sections && index === sections.length - 1) {
      dispatch(finish());
    }
  }

  return (
    <button
      className={`w-11/12 rounded-xl bg-lightPurple px-2.5 py-3.5 font-semibold text-black`}
      // disabled={disableButton}
      onClick={handleNext}
    >
      {sections && index === sections.length - 1 ? 'SUBMIT' : 'NEXT'}
    </button>
  );
};

export default NextButton;
