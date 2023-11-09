import { useAuth } from '../../contexts/AuthContext';
import { start } from './QuestionnaireSlice';
import { useDispatch } from 'react-redux';

const LandingPage = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();

  function startQuestionnaire() {
    // dispatch
    dispatch(start());
  }

  return (
    <div className="flex h-screen flex-col items-center justify-evenly bg-landing-cover bg-contain bg-no-repeat">
      <div className="bg-logo ml-14 h-12 w-44 bg-no-repeat"></div>

      <section className="mb-48 text-center">
        <div className=" text-3xl font-bold text-white">
          <span className="block">WELCOME,</span>
          <span>USER</span>
        </div>
        <p className="py-2 font-semibold leading-6 text-green">
          Your account has been created
        </p>
      </section>

      <button className="continueButton bg-green" onClick={startQuestionnaire}>
        Craft Your Journey
      </button>
    </div>
  );
};

export default LandingPage;
