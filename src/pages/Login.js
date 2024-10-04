//Login.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { HiOutlineMail, HiArrowNarrowLeft } from 'react-icons/hi';
import AnimatedComponent from '../components/AnimatedComponent';
import styled from 'styled-components';

const Login = () => {
  const {
    login,
    resetPasswordLogin,
    error,
    isSignUp,
    reset,
    signup,
    resetError,
  } = useAuth();
  const [showLoginInput, setShowLoginInput] = useState(false);
  const [showSignUpInput, setShowSignUpInput] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, getUserFromStoragename] = useState('');

  const [passwordType, setPasswordType] = useState('');
  const [confirmPasswordType, setConfirmPasswordType] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  const GradientText = styled.div`
    background: linear-gradient(to right, #d6b6f0, #848ce9);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `;

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

  function toggleShowConfirmPassword(e) {
    e.preventDefault();

    const confirmpwd = document.getElementById('confirmpwd');
    if (confirmpwd.type === 'password') {
      confirmpwd.type = 'text';
      setConfirmPasswordType('text');
    } else {
      confirmpwd.type = 'password';
      setConfirmPasswordType('password');
    }
  }

  const handleEmailAuth = (e) => {
    setButtonClicked(true);
    e.preventDefault();

    if (email && password) {
      let body = {
        email,
        password,
        platform: 'email',
      };

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
    }
  };

  useEffect(() => {
    /* global google */

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
  }, [login, showLoginInput, showSignUpInput]);

  useEffect(() => {
    if (isSignUp === null) navigate('/login');
    else if (isSignUp) {
      navigate('/questionnaire');
    } else {
      navigate('/home');
    }
  }, [isSignUp, navigate, username]);

  function handleBack() {
    setEmail('');
    setPassword('');
    getUserFromStoragename('');
    reset();
    setShowLoginInput(false);
    setResetPassword(false);
    setShowSignUpInput(false);
  }

  useEffect(() => {
    if (error !== null && buttonClicked === true) {
      setButtonClicked(false);
    }
    console.log('error', error);
    console.log('button Clicked', buttonClicked);
  }, [buttonClicked, error]);

  return (
    <>
      {showLoginInput || showSignUpInput ? (
        <LoginInput>
          <HiArrowNarrowLeft
            size={20}
            color={'#7e87ef'}
            onClick={() => handleBack()}
          />
          <header className="my-6 text-2xl text-blue">
            {showSignUpInput
              ? 'Add your account details'
              : resetPassword
              ? 'Update your password'
              : 'Enter your login details'}
          </header>
          <form
            className="mt-4 flex w-full flex-col"
            action="post"
            onSubmit={handleEmailAuth}
          >
            {showSignUpInput && (
              <input
                style={{ borderColor: '#7e87ef', marginBottom: '2em' }}
                className="textbox"
                type="text"
                placeholder="NAME"
                required
                value={username}
                onChange={(e) => getUserFromStoragename(e.target.value)}
              />
            )}
            <input
              style={{ borderColor: '#7e87ef', marginBottom: '2em' }}
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
                style={{ borderColor: '#7e87ef' }}
                className="textbox"
                type="password"
                required
                placeholder={resetPassword ? 'NEW PASSWORD' : 'PASSWORD'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {error && (
                <div className="flex">
                  {/* <AiFillWarning size={22} color="red" /> */}
                  <p className="py-2 text-xs text-red">{error}</p>
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <button
                  className="text-sm text-blue"
                  type="text"
                  onClick={(e) => toggleShowPassword(e)}
                >
                  {passwordType === 'text' ? 'Hide' : 'Show'}
                </button>
                <button
                  className="text-sm text-blue"
                  type="text"
                  onClick={() => {
                    setPassword('');
                    setResetPassword(true);
                    resetError();
                  }}
                >
                  {showLoginInput && !resetPassword && 'Forgot Password'}
                </button>
              </div>
            </div>
            {showSignUpInput && (
              <div>
                <input
                  id="confirmpwd"
                  style={{ borderColor: '#7e87ef' }}
                  className="textbox"
                  type="password"
                  required
                  placeholder={'CONFIRM PASSWORD'}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                {error && (
                  <div className="flex">
                    {/* <AiFillWarning size={22} color="red" /> */}
                    <p className="py-2 text-xs text-red">{error}</p>
                  </div>
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    className="text-sm text-blue"
                    type="text"
                    onClick={(e) => toggleShowConfirmPassword(e)}
                  >
                    {confirmPasswordType === 'text' ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={
                !error &&
                (!email ||
                  !password ||
                  buttonClicked ||
                  !confirmPassword ||
                  password !== confirmPassword)
              }
              type="submit"
              className={`continueButton w-full ${
                !error &&
                (!email ||
                  !password ||
                  buttonClicked ||
                  !confirmPassword ||
                  password !== confirmPassword)
                  ? 'bg-darkGray'
                  : 'bg-blue'
              }`}
            >
              Continue
            </button>
          </form>
        </LoginInput>
      ) : (
        <AnimatedComponent>
          <div className="flex h-screen flex-col items-center justify-evenly bg-landing-cover bg-cover bg-no-repeat">
            <div className="flex h-screen w-full flex-col items-center justify-between py-16">
              <div className="mt-8 h-6 ">
                <img
                  loading="lazy"
                  src={'/assets/otm_logo_lifestyle.svg'}
                  alt="otm logo"
                  className=""
                />
              </div>

              <div className="flex flex-col items-center">
                <img loading="lazy" src={'/assets/your_fitness.svg'} alt="" />
                <GradientText className="mt-1 text-[44px]">
                  Lifestyle
                </GradientText>
                <p className="text-[32px] leading-[34px] text-offwhite">
                  coach for life
                </p>
              </div>

              <footer className="flex w-11/12 flex-col items-center">
                <button
                  className="lifestyle-gradient-button relative flex w-full justify-start rounded-xl px-[30px] py-[14px]  text-lg font-semibold text-black"
                  onClick={() => {
                    setShowSignUpInput(false);
                    setShowLoginInput(true);
                  }}
                >
                  <HiOutlineMail size={25} className="absolute z-10" />
                  <p className="w-full text-center text-base font-medium">
                    Login with email
                  </p>
                </button>
                <p className="my-2 text-center">or</p>
                <div
                  className="mb-10 flex w-full justify-center"
                  id="loginDiv"
                ></div>

                <div className="flex space-x-1 text-[14px]">
                  <p className="text-lightGray">Don't have an account?</p>
                  <button
                    onClick={() => {
                      setShowLoginInput(false);
                      setShowSignUpInput(true);
                    }}
                    type="button"
                    className=" text-blue underline"
                  >
                    Sign up
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </AnimatedComponent>
      )}
    </>
  );
};

export default Login;
