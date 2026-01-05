import React, {createContext, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken ]=useState(localStorage.getItem('authToken') || null)
    // const navigate = useNavigate();

    const login = (token)=>{
        localStorage.setItem('authToken', token);
        setToken(token);
    }

    const logout = ()=>{
        localStorage.removeItem('authToken');
        setToken(null);
        // navigate('/login');
    
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>

    )
}