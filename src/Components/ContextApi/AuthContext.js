// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedToken = localStorage.getItem("userData");

                if (storedToken) {
                    const parsedToken = JSON.parse(storedToken);

                    if (parsedToken?.token !== undefined && parsedToken?.token !== null) {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${parsedToken.token}`;
                        const { data } = await axios.get('http://localhost:4000/userAuth');

                        if (data.success) {
                            dispatch(true);
                        } else {
                            dispatch(false);
                        }
                    } else {
                        dispatch(false);
                    }
                } else {
                    dispatch(false);
                }
            } catch (error) {
                console.error('Error while fetching data:', error);
                dispatch(false);
            }
        };

        fetchData();
    }, []);
    const contextValue = {
        state
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
