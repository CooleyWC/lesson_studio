import React, { createContext, useContext, useState } from 'react';

// create context for user data
const AuthContext = createContext({})

// useAuth hook
export const useAuth = ()=>{
    return useContext(AuthContext)
}

// create a provider component
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(false)

    const login = () => setUser(true)
    const logout = () => setUser(false)

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// export default useAuth;