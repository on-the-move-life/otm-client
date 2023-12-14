import { useContext, useReducer, createContext } from 'react';

import axios from 'axios';
//create a new context
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isSignUp: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isSignUp: false,
        error: null,
      };

    case 'signup':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isSignUp: true,
        error: null,
      };

    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        isSignUp: null,
      };

    case 'error':
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        user: null,
        isSignUp: null,
      };

    case 'getUserFromStorage':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case 'reset':
      return initialState;

    case 'resetPasswordLogin':
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        user: action.payload,
        isSignUp: false,
      };

    case 'resetError':
      return {
        ...state,
        error: null,
      };

    default:
      throw new Error('Unknown action');
  }
}

//create a provider function that will wrap the application
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isSignUp, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function login(body) {
    // api call
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, body)
      .then((res) => {
        console.log(res.data, 'RES DATA');
        const user = res.data?.user;

        if (user.email) {
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({ type: 'login', payload: user });
        }
      })
      .catch(({ response }) => {
        console.log(response, 'ERROR');
        dispatch({ type: 'error', payload: response.data.msg });
      });
  }

  async function signup(body) {
    // api call
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, body)
      .then((res) => {
        console.log(res.data, 'RES DATA');
        const user = res.data?.user;

        if (user.email) {
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({ type: 'signup', payload: user });
        }
      })
      .catch(({response}) => {
        console.log(response, 'ERROR');
        dispatch({ type: 'error', payload: response.data.msg });
      });
  }

  async function resetPasswordLogin(body) {
    // api call
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/reset-password`, body)
      .then((res) => {
        const userFromResponse = res.data?.user;

        if (userFromResponse.email) {
          localStorage.setItem('user', JSON.stringify(userFromResponse));
          dispatch({ type: 'login', payload: userFromResponse });
        }
      })
      .catch(({ response }) => {
        console.log(error, 'ERROR');
        dispatch({ type: 'error', payload: response.data.msg });
      });
  }

  function logout() {
    localStorage.removeItem('user');
    dispatch({ type: 'logout' });
  }

  function reset() {
    dispatch({ type: 'reset' });
  }

  function resetError() {
    dispatch({ type: 'resetError' });
  }

  function getUserFromStorage() {
    let user = localStorage.getItem('user');
    if (user && !user.includes('undefined')) {
      user = JSON.parse(user);
      dispatch({ type: 'getUserFromStorage', payload: user });
      return user;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isSignUp,
        signup,
        getUserFromStorage,
        user,
        isAuthenticated,
        resetPasswordLogin,
        login,
        resetError,
        logout,
        error,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//create a custom hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside the AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
