import React, { createContext, useContext, useState } from 'react';

// create context for user data
const AuthContext = createContext({})

// useAuth hook
export const useAuth = ()=>{
    return useContext(AuthContext)
}

// create a provider component
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const login = (data) => setUser(data)
    const logout = () => setUser(null)
    const update = async (data) => {
        setUser(data)
        console.log('after update', user)
    }

    return (
        <AuthContext.Provider value={{user, setUser, update, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// export default useAuth;