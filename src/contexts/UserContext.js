import { useContext, createContext, useState } from 'react';

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{
            setUserData,
            userData
        }}>
            {children}
        </UserContext.Provider>
    )
}

// custom hook
export function useUserContext() {
    const context = useContext(UserContext);
    if (context === undefined)
        throw new Error('UserContext was used outside the UserContextProvider');
    return context;
}