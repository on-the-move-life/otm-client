import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { HiOutlineMail, HiArrowNarrowLeft } from 'react-icons/hi';
<<<<<<< Updated upstream
import { AiFillWarning } from 'react-icons/ai';

const Login = () => {
  const { login, isAuthenticated, error, isSignUp, reset } = useAuth();
=======
import { useLocation } from 'react-router';

import axios from 'axios';

const Login = () => {
  const { login, resetPasswordLogin, error, isSignUp, reset, signup, user } =
    useAuth();
>>>>>>> Stashed changes
  const [showLoginInput, setShowLoginInput] = useState(false);
  const [showSignUpInput, setShowSignUpInput] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, getUserFromStoragename] = useState('');

  const [passwordType, setPasswordType] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  const location = useLocation();

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
      let body = {
        email,
        password,
        platform: 'email',
      };
<<<<<<< Updated upstream
      login(body);
=======

      if (showSignUpInput && username) {
        body = { ...body, name: username };
        signup(body);
      } else {
        if (resetPassword) {
          resetPasswordLogin(body);
        } else {
          login(body);
        }
      }
>>>>>>> Stashed changes
    }
  };

  useEffect(() => {
    /* global google */

    console.log(location.key, 'location.key');
    console.log(window.google, 'window.google');

    const handleGoogleAuth = (res) => {
      const body = {
        credential: res.credential,
        platform: 'google',
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
    else if (isSignUp) {
      // updateName();
      console.log('username', username);
      navigate('/questionnaire');
    } else {
      navigate('/home');
    }
  }, [isSignUp, navigate, username]);

  function handleBack() {
    setEmail('');
    setPassword('');
    reset();
    setShowLoginInput(false);
<<<<<<< Updated upstream
=======
    setResetPassword(false);
    setShowSignUpInput(false);
>>>>>>> Stashed changes
  }

  return (
    <>
      {showLoginInput || showSignUpInput ? (
        <LoginInput>
          <HiArrowNarrowLeft
            size={20}
            color={'#5ECC7B'}
            onClick={() => handleBack()}
          />
          <header className="my-6 text-2xl text-green">
<<<<<<< Updated upstream
            Enter your log in details
=======
            {showSignUpInput
              ? 'Add your account details'
              : resetPassword
              ? 'Update your password'
              : 'Enter your login details'}
>>>>>>> Stashed changes
          </header>
          <form
            className="mt-4 flex w-full flex-col"
            action="post"
            onSubmit={handleEmailAuth}
          >
            {showSignUpInput && (
              <input
                style={{ borderColor: '#5ECC7B', marginBottom: '2em' }}
                className="textbox"
                type="text"
                placeholder="NAME"
                required
                value={username}
                onChange={(e) => getUserFromStoragename(e.target.value)}
              />
            )}
            <input
              style={{ borderColor: '#5ECC7B', marginBottom: '2em' }}
              className="textbox"
              type="email"
              placeholder="EMAIL"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <input
                id="pwd"
                style={{ borderColor: '#5ECC7B' }}
                className="textbox"
                type="password"
<<<<<<< Updated upstream
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="relative -top-8 text-sm"
                type="text"
                onClick={(e) => toggleShowPassword(e)}
              >
                {passwordType === 'text' ? 'Hide' : 'Show'}
              </button>
              {error && (
                <div className=" flex">
                  <AiFillWarning size={22} color="red" />
                  <p className="ml-2 text-red-500">{error}</p>
                </div>
              )}
=======
                required
                placeholder={resetPassword ? 'NEW PASSWORD' : 'PASSWORD'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {!resetPassword && error && (
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
                  {showLoginInput && !resetPassword && 'Forgot Password'}
                </button>
              </div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        <div className="flex h-screen flex-col items-center justify-evenly bg-landing-cover bg-cover bg-no-repeat">
          <div className="flex h-screen w-full flex-col items-center justify-between py-16">
            <div className=" mt-8 h-6 w-28">
              <img
                className="h-full w-full"
                src={'/assets/green-logo.svg'}
                alt="green-logo"
              />
            </div>
            <div className="flex h-24 w-24 items-center justify-center">
              <img src={'/assets/icon.svg'} alt="" />
>>>>>>> Stashed changes
            </div>

            <footer className="flex w-11/12 flex-col items-center">
              <button
                className="main-button-gradient flex w-full justify-start rounded-xl px-3.5 py-2.5 text-lg font-semibold text-black"
                onClick={() => {
                  setShowSignUpInput(false);
                  setShowLoginInput(true);
                }}
              >
                <HiOutlineMail size={25} />
                <p className="ml-16 text-base">Login with email</p>
              </button>
              <p className="my-2 text-center">or</p>
              <div
                className="mb-10 flex w-full justify-center"
                id="loginDiv"
              ></div>
              <div className="flex space-x-1">
                <p className="text-lightGray">Don't have an account?</p>
                <button
                  onClick={() => {
                    setShowLoginInput(false);
                    setShowSignUpInput(true);
                  }}
                  type="button"
                  className="text-green underline"
                >
                  Sign up
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
