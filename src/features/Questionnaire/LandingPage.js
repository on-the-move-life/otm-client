import { useEffect } from 'react';
import { start } from './QuestionnaireSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext';

const LandingPage = () => {
  const dispatch = useDispatch();
  const { user, getUserFromStorage } = useAuth();

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-around bg-landing-cover bg-cover bg-no-repeat">
      <div className="h-6 w-28">
        <img
          className="h-full w-full"
          src={'/assets/green-logo.svg'}
          alt="green-logo"
        />
      </div>

      <section className="mb-48 text-center">
        <div className=" text-2xl font-extrabold">
          <span className="main-gradient-text uppercase">
            Welcome {user && user.name}
          </span>
        </div>
        {/* <p className="py-2 text-base text-green">
          Your account has been created
        </p> */}
      </section>

      <button
        className="continueButton main-button-gradient"
        onClick={() => dispatch(start())}
      >
        Craft Your Journey
      </button>
    </div>
  );
};

export default LandingPage;
