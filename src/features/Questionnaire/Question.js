import React, { useEffect, useRef, useState } from 'react';
import NextButton from './NextButton';
import { getQuestions, nextSection } from './QuestionnaireSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Error } from '../../components';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inputResponse, setInputResponse] = useState({});
  const [selectedOption, setSelectedOption] = useState({});

  const [disableButton, setDisableButton] = useState(true);
  const answersRef = useRef([]);

  let user = localStorage.getItem('user');
  if (user && !user.includes('undefined')) {
    user = JSON.parse(user);
  }

  const { sections, index } = useSelector(
    (store) => store.questionnaireReducer,
  );

  const sectionCode = sections && sections.at(index).sectionCode;

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (sectionCode) {
      console.log(sectionCode, 'sectionCode');
      dispatch(getQuestions(sectionCode))
        .then(({ questions }) => {
          console.log(questions, 'questions');
          setQuestions(questions);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('There was a problem fetching questionnaire data');
    }
  }, [dispatch, sectionCode]);

  function updateAnswers(questionCode, selectedResponse) {
    // Filter out any existing responses for this questionCode
    answersRef.current = answersRef.current.filter(
      (answer) => answer.questionCode !== questionCode,
    );

    // Add the new response for this questionCode
    answersRef.current.push({
      questionCode,
      response: selectedResponse,
    });

    //filter any empty text responses
    answersRef.current = answersRef.current.filter(
      (answer) => answer.response !== '',
    );

    console.log(answersRef.current, 'answersRef.current');

    if (questions && answersRef.current.length !== questions.length) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }

  function handleSelectedOption(questionCode, selectedOption) {
    setSelectedOption((prevInputResponse) => ({
      ...prevInputResponse,
      [questionCode]: selectedOption,
    }));

    updateAnswers(questionCode, selectedOption);
  }

  function handleInputResponse(e, questionCode) {
    e.preventDefault();

    setInputResponse((prevInputResponse) => ({
      ...prevInputResponse,
      [questionCode]: e.target.value,
    }));

    updateAnswers(questionCode, e.target.value);
  }

  function submitResponse(sectionCode) {
    console.log('ANSWERS', answersRef.current);
    if (!sectionCode) {
      console.log('Section code is missing.');
    }

    dispatch(
      nextSection(
        {
          sectionCode: sectionCode,
          answers: answersRef.current,
        },
        user.email,
      ),
    );

    setInputResponse('');
    answersRef.current = [];
    setDisableButton(true);
  }

  if (error) {
    console.log(error, 'error');
    return <Error>{error}</Error>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="flex w-screen flex-col items-center justify-between px-6">
        {questions &&
          questions.map(
            ({ code, content, inputType, options, description }, index) => {
              return (
                <div key={code} className="mb-8 flex w-full flex-col">
                  <h4
                    className={` ${
                      inputType === 'multichoice' ? 'mb-12' : ''
                    } my-2 text-2xl text-lightPurple`}
                  >
                    {content}
                  </h4>
                  {inputType === 'multichoice' ? (
                    options.map(({ value, id }) => {
                      return (
                        <button
                          onClick={() => handleSelectedOption(code, id)}
                          style={{
                            border:
                              selectedOption[code] === id
                                ? '1px solid #D6B6F0'
                                : 'none',
                          }}
                          className="multichoice"
                          key={id}
                        >
                          {value}
                        </button>
                      );
                    })
                  ) : (
                    <div>
                      <input
                        type={inputType} //text, number
                        value={inputResponse[code] || ''}
                        style={{ borderColor: '#D6B6F0' }}
                        className="textbox"
                        onChange={(e) => handleInputResponse(e, code)}
                        placeholder={description}
                      />
                    </div>
                  )}
                </div>
              );
            },
          )}
      </main>
      <footer className="my-6 flex justify-center">
        <NextButton
          disableButton={disableButton}
          submitResponse={submitResponse}
          sectionCode={sectionCode}
        />
      </footer>
    </>
  );
};

export default Question;
