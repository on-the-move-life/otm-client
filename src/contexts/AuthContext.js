import { useContext, useReducer, createContext } from 'react';

import axios from 'axios';

const LOGIN_URL = 'https://otm-main-production.up.railway.app/auth';

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
      .post(`${LOGIN_URL}/login`, body)
      .then((res) => {
        const user = res.data?.user;
        const isSignUp = res.data?.isSignUp;

        if (user.email) {
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({ type: isSignUp ? 'signup' : 'login', payload: user });
        }
      })
      .catch(({ response }) => {
        console.log(response, 'ERROR');
        dispatch({ type: 'error', payload: response.data.msg });
      });
  }

  async function resetPasswordLogin(body) {
    console.log(body, 'reset password');
    // api call
    axios
      .post(`${LOGIN_URL}/reset-password`, body)
      .then((res) => {
        const user = res.data?.user;

        if (user.email) {
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({ type: 'login', payload: user });
        }
      })
      .catch((error) => {
        console.log(error, 'ERROR');
        dispatch({ type: 'error', payload: error.response.msg });
      });
  }

  function logout() {
    localStorage.removeItem('user');
    dispatch({ type: 'logout' });
  }

  function reset() {
    dispatch({ type: 'reset' });
  }

  return (
    <AuthContext.Provider
      value={{
        isSignUp,
        user,
        isAuthenticated,
        resetPasswordLogin,
        login,
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
