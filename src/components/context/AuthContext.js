import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider =  ({ children }) => {
   
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user:null,
        token:null
    });

    const [loading, setLoading] = useState(true);

    const login = (user,token) => {
        setAuthState({
            isAuthenticated: true,
            user,
            token
        
        });
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token);
   
       
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user: null,
            following:null,
        });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');
      
        if (storedUser && storedToken) {
            setAuthState({
                isAuthenticated: true,
                user: storedUser,
                token: storedToken
            });
            
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ authState, login, logout,loading }}>
            {children}
        </AuthContext.Provider>
    );


};


export default AuthProvider;
