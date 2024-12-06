import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {

    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [sessionTimeout, setSessionTimeout] = useState(false); // To track session timeout state

    const [isTokenValid, setIsTokenValid] = useState(true);
   const [showPopup, setShowPopup] = useState(false);
   useEffect(() => {
        const token = localStorage.getItem("token");

        // Redirect to login page if no token is found
        if (!token) {
            setIsTokenValid(false);
            navigate("/");
            return;
        }

        const expiration = localStorage.getItem("tokenExpiration");
    const remainingTime = expiration - Date.now();

    if (remainingTime <= 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        setIsTokenValid(false); // Invalidate session
        navigate("/"); // Redirect to login
        return;
    }

    // Trigger popup message 10 seconds before timeout
    const popupId = setTimeout(() => {
        setShowPopup(true); // Show the popup message
        setTimeout(() => {
            setShowPopup(false); // Hide popup after 3 second
        }, 3000);
    }, remainingTime - 10000); // 10 seconds before timeout

    // Timeout to log out the user after the remaining session time
    const timeoutId = setTimeout(() => {
        localStorage.removeItem("token"); // Clear token
        localStorage.removeItem("tokenExpiration");
        setSessionTimeout(true); // Show timeout message
        setIsTokenValid(false); // Invalidate session
        navigate("/"); // Redirect to login
    }, remainingTime);

        // Cleanup function to clear timeout when component unmounts
        return () => {
            clearTimeout(popupId);
            clearTimeout(timeoutId);
        };
    }, []);


    const handleLogout = () => {
        logout(); // Call the logout function
        navigate("/"); // Redirect to the homepage or login page
    };

    const navbarStyle = {
        display: "flex",
        justifyContent: "space-between", // Space between links and logout button
        backgroundColor: "#6ccbd6",
        alignItems: "center",
        background: "linear-gradient(90deg, #6ccbd6, #9e1f34)", // Gradient background
        padding: "1rem 2rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        height: "60px", // Increase height of the navbar
    };

    const navLinkStyle = {
        color: "#890d19",
        textDecoration: "none",
        margin: "0 25px", // Adds spacing between items
        fontSize: "1.8rem",
        fontWeight: "bold",
        transition: "color 0.3s ease",
    };

    const activeLinkStyle = {
        color: "#0d1c89",
        textDecoration: "underline",
    };

    const logoutButtonStyle = {
        color: "white",
        backgroundColor: "#9e1f34",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1.5rem",
        fontWeight: "bold",
    };
   const popupStyle ={
        position: "fixed",
        top:"20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#690815",  // Solid background color
        color: "white",  // Text color
        fontSize: "18px",
        borderRadius: "8px",
        zIndex: "1000",
        height: "50px",
        width: "700px",
        padding: "10px",
        textAlign: "center",
    }
    


    return (
        <div style={navbarStyle}>
             {showPopup && (
                <div style={popupStyle}>
                    <p>Your session will expire in 10 seconds. Please save your work.</p>
                </div>
            )}
            <div>
            <NavLink
                to="/dashboard"
                style={({ isActive }) =>
                    isActive ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle
                }
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/summary"
                style={({ isActive }) =>
                    isActive ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle
                }
            >
                Summary
            </NavLink>
            <NavLink
                to="/report"
                style={({ isActive }) =>
                    isActive ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle
                }
            >
                Report
            </NavLink>
            </div>
            {isLoggedIn && (
                <button style={logoutButtonStyle} onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
        
    );
}

export default Navbar;
