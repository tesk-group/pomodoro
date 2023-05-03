import { Children, createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setUser: () => {},
    setToken: () => {},
})

export const ContextProvider = ( { children } ) => {
    const [currentUser, setUser] = useState({});
    const [userToken, _setToken] = useState(localStorage.getItem('TOKEN') || '');

    const setToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setToken(token);
    }
    return (
        <StateContext.Provider 
            value={{ 
                currentUser,
                setUser,
                userToken,
                setToken,
            }}
        >
            {children};
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);