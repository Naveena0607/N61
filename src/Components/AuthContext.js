// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around the app
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    //const login = () => setIsLoggedIn(true);
    const login = async (username, password) => {
        try {

            const response = await axios.post("http://localhost:3000/login", { username, password });
            console.log("Login response:", response.data);
            const { token } = response.data;

            // Decode token to extract user info if needed
            const decoded = jwtDecode(token);
            const expirationTime = decoded.exp * 1000;

            setIsLoggedIn(true);
            setToken(token);

            localStorage.setItem("token", token); // Store token in localStorage
            localStorage.setItem("tokenExpiration", expirationTime);
        } catch (error) {
            if (error.response && error.response.data) {
                // Display the specific error message from the server
                throw new Error(error.response.data.message);
            } else {
                // Generic fallback error
                throw new Error("Login failed");
            }
        }
    };

    /*const register = async (username, password, setIsRegister) => {
        try {
            const response = await axios.post("http://localhost:3000/register", { username, password });
            console.log("register response:", response.data);
            const { token } = response.data;

            // Decode token to extract user info if needed
            const decoded = jwtDecode(token);

            setIsRegister(false);
            setToken(token);

            localStorage.setItem("token", token); // Store token in localStorage
        } catch (error) {
            throw new Error("Login failed");
        }
    };*/


    //const logout = () => setIsLoggedIn(false);
    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);