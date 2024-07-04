//AuthContext.js
import { useContext, useReducer, createContext } from 'react';
import { uiVersion } from '../components/FeatureUpdatePopup';

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
      const isSignUp = action.payload['isSignUp']
      delete action.payload['isSignUp']
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isSignUp,
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
      case 'adminLogin':
        return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAdmin: true,
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
        const user = res.data?.user;

        if (user.email) {
          localStorage.setItem('user', JSON.stringify(user));

          user['isSignUp'] = res.data['isSignUp']
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
        const user = res.data?.user;

        if (user.email) {
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({ type: 'signup', payload: user });
        }
        // make an API call to update the lastSeen version -> Feature Update Pop-up
        const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
        const payload = {
          lastSeenUiVersion: uiVersion,
        };
        memberCode && uiVersion && 
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/member/${memberCode}`,
            payload,
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch(({ response }) => {
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
  async function adminLogin(body) {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/admin-login`, body)
      .then((res) => {
        const user = res.data?.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'adminLogin', payload: user });
        }
      })
      .catch(({ response }) => {
        console.log(response, 'ERROR');
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
  function resetError() {
    dispatch({ type: 'resetError' });
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
        adminLogin,
        resetError,
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
