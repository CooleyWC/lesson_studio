import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({})

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const login = (data) => setUser(data)
    const logout = () => setUser(null)
    const update = (data) => setUser(data)

    return (
        <AuthContext.Provider value={{user, setUser, update, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// export default useAuth;