import React, { createContext, useState } from 'react';

// create context for user data
const AuthContext = createContext({})


// create a provider component
export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(null)

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;