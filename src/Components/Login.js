import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
    const navigate = useNavigate(); // Navigation hook
    const { login } = useAuth();
    const { register } = useAuth();
    

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            await login(username, password);
            navigate("/dashboard"); 
        }catch(err) {
            if (err.response && err.response.data) {
                // Display the specific error message from the server
                setError(err.response.data.message);
            } else {
                // Generic fallback error
                setError("Invalid credentials. Please try again.");
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://157.245.113.57:3000/register", {
                username,
                password,
            });            
            alert("Registration successful! Please log in.");
            setIsRegister(false);
        } catch (err) {
            if (err.response && err.response.data) {
                // Display the specific error message from the server
                setError(err.response.data.message);
            } else {
                // Generic fallback error
                setError("Registration failed. Please try again.");
            }
        }
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Vertically center the box
            height: "100vh", // Make the container cover the full viewport height
            fontFamily: "'Arial', sans-serif",
            backgroundImage: `url("https://t4.ftcdn.net/jpg/06/93/88/11/360_F_693881176_xM8D9zzR7Zi4MDmWoECueSEs0bSHSRpd.jpg")`,
            backgroundSize: "cover", // Ensure the image covers the entire background
            backgroundPosition: "center", // Center the image
            backgroundRepeat: "no-repeat", // Prevent tiling
        },
        formContainer: {
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Add slight transparency for better readability
            padding: "4rem", // Increase padding for a larger box
            maxWidth: "600px", // Adjust maximum width of the box
            borderRadius: "10px",
            marginTop: "10px",
            marginBottom: "150px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add a more prominent shadow
            width: "500px", // Increase the width of the login box
            textAlign: "center",
        },
        input: {
            width: "95%", // Slightly increase input width
            padding: "15px", // Increase padding for larger input fields
            margin: "15px 0", // Add more vertical spacing between inputs
            borderRadius: "8px", // Round the corners more
            border: "1px solid #ccc",
            fontSize: "16px", // Increase font size for better readability
        },
        button: {
            width: "100%",
            padding: "10px", // Increase button padding for a larger button
            backgroundColor: "#690815",
            color: "white",
            border: "none",
            fontWeight: "bold",
            borderRadius: "8px",
            fontSize: "18px", // Increase font size for the button text
            cursor: "pointer",
        },
        buttonHover: {
            backgroundColor: "#a00723",
        },
        heading: {
            fontSize: "2rem", // Increase heading size
            marginBottom: "1.5rem",
            color: "#333",
        },
        toggleLink: {
            color: "#007bff",
            cursor: "pointer",
            marginTop: "15px",
            display: "block",
            fontSize: "18px",
            fontWeight: "bold",
        },
    };
    

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>{isRegister ? "Register" : "Login"}</h2>
                <form onSubmit={isRegister ? handleRegister : handleLogin} aria-labelledby="login-header">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        style={styles.input}
                        onChange={(e)=> setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        style={styles.input}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
                {error && <p style={{color: "red"}}>{error}</p>}
                <span
                    style={styles.toggleLink}
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister
                        ? "Already have an account? Login"
                        : "Don't have an account? Register"}
                </span>
            </div>
        </div>
    );
}

export default Login;
