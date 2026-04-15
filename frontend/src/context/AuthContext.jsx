import React, {createContext, useState} from 'react';
// import { Navigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken ]=useState(localStorage.getItem('authToken') || null)
    // const navigate = useNaigate();

    const login = (token)=>{
        localStorage.setItem('authToken', token);
        setToken(token);
    }

    const logout = ()=>{
        localStorage.removeItem('authToken');
        setToken(null);
    
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>

    )
}