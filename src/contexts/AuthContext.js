import { useContext, useReducer, createContext } from "react";

import axios from "axios";

const LOGIN_URL = "http://localhost:882/auth/login";

//create a new context
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isSignUp: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isSignUp: false,
        error: null
      };

    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isSignUp: true,
        error: null
      };

    case "logout":
      return { ...state, user: null, isAuthenticated: false, error: null  };

    case "error":
      return {...state, isAuthenticated: false, error: action.payload, user: null}

    default:
      throw new Error("Unknown action");
  }
}

//create a provider function that will wrap the application
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isSignUp, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(body) {
    // api call
    axios.post(LOGIN_URL, body).then((res) => {
      const user = res.data?.user;
      const isSignUp = res.data?.isSignUp;

      if (user.email) {
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: isSignUp ? "signup" : "login", payload: user });
      }
    }).catch((error)=> {
      dispatch({type: "error", payload: error.message})
    })
  }

  function logout() {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ isSignUp, user, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//create a custom hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
