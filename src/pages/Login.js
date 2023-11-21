import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { HiOutlineMail, HiArrowNarrowLeft } from 'react-icons/hi';
import { AiFillWarning } from 'react-icons/ai';

const Login = () => {
  const { login, isAuthenticated, resetPasswordLogin, error, isSignUp, reset } =
    useAuth();
  const [showLoginInput, setShowLoginInput] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  // let disableContinue = true;

  function toggleShowPassword(e) {
    e.preventDefault();

    const pwd = document.getElementById('pwd');
    if (pwd.type === 'password') {
      pwd.type = 'text';
      setPasswordType('text');
    } else {
      pwd.type = 'password';
      setPasswordType('password');
    }
  }

  const handleEmailAuth = (e) => {
    e.preventDefault();

    if (email && password) {
      const body = {
        email,
        password,
        isGoogleLogin: false,
      };
      if (resetPassword) {
        resetPasswordLogin(body);
      } else {
        login(body);
      }
    }
  };

  useEffect(() => {
    /* global google */

    const handleGoogleAuth = (res) => {
      const body = {
        credential: res.credential,
        isGoogleLogin: true,
      };
      login(body);
    };

    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleAuth,
      });

      google.accounts.id.renderButton(document.getElementById('loginDiv'), {
        theme: 'filled_black',
        text: 'signin_with',
        shape: 'pill',
      });
    }
  }, [login, showLoginInput]);

  useEffect(() => {
    if (isSignUp === null) navigate('/login');
    else if (isSignUp) navigate('/questionnaire');
    else {
      navigate('/home');
    }
  }, [isSignUp, navigate]);

  function handleBack() {
    setEmail('');
    setPassword('');
    reset();
    setShowLoginInput(false);
    setResetPassword(false);
  }

  return (
    <>
      {showLoginInput ? (
        <LoginInput>
          <HiArrowNarrowLeft
            size={20}
            color={'#5ECC7B'}
            onClick={() => handleBack()}
          />
          <header className="my-6 text-2xl text-green">
            {resetPassword
              ? 'Update your password'
              : 'Enter your log in details'}
          </header>
          <form
            className="mt-4 flex w-full flex-col"
            action="post"
            onSubmit={handleEmailAuth}
          >
            <input
              style={{ borderColor: '#5ECC7B', marginBottom: '2em' }}
              className="textbox"
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              {resetPassword ? (
                <input
                  id="pwd"
                  style={{ borderColor: '#5ECC7B' }}
                  className="textbox"
                  type="password"
                  placeholder="NEW PASSWORD"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              ) : (
                <input
                  id="pwd"
                  style={{ borderColor: '#5ECC7B' }}
                  className="textbox"
                  type="password"
                  placeholder="PASSWORD"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              )}
              {error && (
                <div className="flex">
                  {/* <AiFillWarning size={22} color="red" /> */}
                  <p className="py-2 text-xs text-red">{error}</p>
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <button
                  className="text-sm text-green"
                  type="text"
                  onClick={(e) => toggleShowPassword(e)}
                >
                  {passwordType === 'text' ? 'Hide' : 'Show'}
                </button>
                <button
                  className="text-sm text-green"
                  type="text"
                  onClick={() => {
                    setPassword('');
                    setResetPassword(true);
                  }}
                >
                  {!resetPassword && 'Forgot Password'}
                </button>
              </div>
            </div>
            <button
              disabled={!email || !password}
              type="submit"
              className={`continueButton w-full ${
                !email || !password ? 'bg-darkGray' : 'bg-green'
              }`}
            >
              Continue
            </button>
          </form>
        </LoginInput>
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-evenly py-8">
          {/* DIV 1 */}
          <header className="bg-logo ml-14 h-12 w-44 bg-no-repeat"></header>
          {/* DIV 2 */}
          <section className="mb-48 text-center">
            <div className=" text-3xl font-bold text-white">
              <span className="block">Create Your Account</span>
            </div>
          </section>
          <footer className="flex w-11/12 flex-col items-center">
            <button
              className="flex w-full justify-evenly rounded-xl bg-green px-3.5 py-2.5 text-lg font-semibold text-black"
              onClick={() => setShowLoginInput(true)}
            >
              <HiOutlineMail size={25} />
              <p className="-ml-6">Continue with Email</p>
            </button>
            <div className="my-8 flex w-full flex-row space-x-3">
              <div className="line"></div>
              <div className="relative bottom-4 text-xl">or</div>
              <div className="line"></div>
            </div>
            <div className="flex w-full justify-center" id="loginDiv"></div>
          </footer>
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          {/* <footer>
      Don't have an account?
      <Link to="/signup"> Create One</Link>
    </footer> */}
        </div>
      )}
    </>
  );
};

export default Login;
