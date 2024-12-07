import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [sessionTimeout, setSessionTimeout] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the mobile menu

    useEffect(() => {
        const token = localStorage.getItem("token");

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
            setIsTokenValid(false);
            navigate("/");
            return;
        }

        const popupId = setTimeout(() => {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }, remainingTime - 10000);

        const timeoutId = setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            setSessionTimeout(true);
            setIsTokenValid(false);
            navigate("/");
        }, remainingTime);

        return () => {
            clearTimeout(popupId);
            clearTimeout(timeoutId);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const navbarStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(90deg, #6ccbd6, #9e1f34)",
        padding: "1rem 2rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        height: "60px",
    };

    const navLinkStyle = {
        color: "#890d19",
        textDecoration: "none",
        margin: "0 15px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        transition: "color 0.3s ease",
    };

    const activeLinkStyle = {
        color: "#0d1c89",
        textDecoration: "underline",
    };

    const logoutNavLinkStyle = {
        color: "white",
        backgroundColor: "#9e1f34",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "bold",
        display: "inline-block", // Makes it behave like a button
    };

    const popupStyle = {
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#690815",
        color: "white",
        fontSize: "18px",
        borderRadius: "8px",
        zIndex: "1000",
        height: "50px",
        width: "700px",
        padding: "10px",
        textAlign: "center",
    };

    const mobileMenuStyle = {
        display: isMenuOpen ? "block" : "none",
        backgroundColor: "#ffffff",
        position: "absolute",
        top: "60px",
        left: "0",
        width: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: "1000",
    };

    const hamburgerStyle = {
        cursor: "pointer",
        display: "none", // Hide by default
        fontSize: "1.5rem",
        color: "#ffffff",
    };

    // Media query styles
    const mediaQuery = `
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .hamburger {
                display: block;
            }
        }
    `;

    return (
        <>
            <style>{mediaQuery}</style>
            <div style={navbarStyle}>
                {showPopup && (
                    <div style={popupStyle}>
                        <p>Your session will expire in 10 seconds. Please save your work.</p>
                    </div>
                )}

                <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                        className="hamburger"
                        style={hamburgerStyle}
                        onClick={handleMenuToggle}
                    >
                        ☰
                    </span>
                    <div className="nav-links" style={{ display: "flex" }}>
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
                </div>

                {isLoggedIn && (
                    <NavLink
                        to="/"
                        style={logoutNavLinkStyle}
                        onClick={handleLogout} // Trigger logout on click
                    >
                        Logout
                    </NavLink>
                )}
            </div>

            {isMenuOpen && (
                <div style={mobileMenuStyle}>
                    <NavLink
                        to="/dashboard"
                        style={({ isActive }) =>
                            isActive ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/summary"
                        style={({ isActive }) =>
                            isActive ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Summary
                    </NavLink>
                    <NavLink
                        to="/report"
                        style={({ isActive }) =>
                            isActive ? { ...navLinkStyle, ...activeLinkStyle } : navLinkStyle
                        }
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Report
                    </NavLink>
                    <NavLink
                        to="/"
                        style={logoutNavLinkStyle}
                        onClick={handleLogout} // Trigger logout in mobile view
                    >
                        Logout
                    </NavLink>
                </div>
            )}
        </>
    );
}

export default Navbar;
