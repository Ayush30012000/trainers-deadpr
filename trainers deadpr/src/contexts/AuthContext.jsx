import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const session = sessionStorage.getItem('admin_session');
        if (session) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (username, password) => {
        if (username === 'maalikaayehai' && password === 'venomXgod@sexy100%') {
            sessionStorage.setItem('admin_session', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('admin_session');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);