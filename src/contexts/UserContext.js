import { useContext, useReducer, createContext } from 'react';

//create a new context
const UserContext = createContext();

const initialState = {
  user: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'error':
      return {
        ...state,
        error: action.payload,
        user: null,
      };

    default:
      throw new Error('Unknown action');
  }
}

//create a provider function that will wrap the application
function UserProvider({ children }) {
  const [{ user, error }, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
}

//create a custom hook
function useUser() {
    const context = useContext(UserContext);
    if (context === undefined)
      throw new Error('UserContext was used outside the UserProvider');

    return context;
  }

  export { UserProvider, useUser };