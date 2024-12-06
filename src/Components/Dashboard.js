import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Dashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Innovations of Generative AI</h2>

            {/* Recent Innovations in Generative AI */}
            <section style={styles.section}>
                <h3 style={styles.subHeader}>Recent Innovations in Generative AI</h3>
                <p style={styles.text}>
                    Over the last six months, Generative AI has witnessed groundbreaking advancements. 
                    Enhanced diffusion models now generate hyper-realistic media. GPT-4 updates have 
                    transformed natural language understanding, while ethical "Constitutional AI" by 
                    Anthropic sets a new standard for responsible AI. Meta and Google are revolutionizing 
                    multi-modal systems, processing data across text, images, and videos seamlessly. 
                    Generative AI is also reshaping healthcare, enabling synthetic medical data generation 
                    for privacy-preserving research. On-device AI for mobile processing ensures Generative AI 
                    capabilities are now at users' fingertips.
                </p>
                <p style={styles.text}>
                    <strong>Source:</strong>{" "}
                    <a href="https://ieeexplore.ieee.org/document/10616299" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       style={styles.link}>
                        Automation of AD-OHC Dashbord and Monitoring of Cloud Resources using Genrative AI to Reduce Costing and Enhance Performance
                    </a>
                </p>
            </section>

            {/* Technical Aspects */}
            <section style={styles.section}>
                <h3 style={styles.subHeader}>Technical Aspects of This Project</h3>
                <p style={styles.text}>
                    This project is a full-stack web application combining a React.js frontend with a Node.js and Express.js backend to deliver secure user authentication. 
                    The frontend uses React Router for smooth navigation and Context API for managing authentication state, with Axios handling API requests. 
                    The user interface is responsive and visually appealing, featuring modern styling and error handling for enhanced user experience.

                    The backend implements RESTful APIs for login and registration, secured with bcrypt for password hashing and JWT for token-based authentication.
                    It ensures secure communication with the database, storing user credentials safely. The authentication flow provides access to protected routes, with robust input validation and CORS configurations for secure API calls.

                    Designed for scalability, the app follows a modular structure, allowing easy feature expansion.
                    It supports deployment on platforms like Netlify, Vercel, or AWS, ensuring a user-friendly, secure, and efficient authentication solution.
                </p>
            </section>

            {/* AI Adoption Rates Table */}
            <section style={styles.section}>
                <h3 style={styles.subHeader}>AI Adoption Rates by Sector</h3>
                
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Sector</th>
                                <th style={styles.tableHeader}>Adoption Rate (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.tableCell}>Healthcare</td>
                                <td style={styles.tableCell}>65</td>
                            </tr>
                            <tr>
                                <td style={styles.tableCell}>Education</td>
                                <td style={styles.tableCell}>50</td>
                            </tr>
                            <tr>
                                <td style={styles.tableCell}>Finance</td>
                                <td style={styles.tableCell}>70</td>
                            </tr>
                            <tr>
                                <td style={styles.tableCell}>Entertainment</td>
                                <td style={styles.tableCell}>85</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
        fontFamily: "'Arial', sans-serif",
        maxWidth: "1500px",
        margin: "30px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 2s ease-in",
    },
    timeoutMessage: {
        textAlign: "center",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "10px",
        borderRadius: "6px",
        marginBottom: "20px",
        border: "1px solid #f5c6cb",
    },
    header: {
        textAlign: "center",
        fontSize: "24px",
        color: "#690815",
        marginBottom: "20px",
    },
    section: {
        margin: "20px 0",
        lineHeight: "1.8",
        padding: "15px",
        backgroundColor: "#ffffff",
        borderRadius: "6px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 2s ease-in",
    },
    subHeader: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#34495e",
        marginBottom: "10px",
    },
    text: {
        fontSize: "20px",
        color: "#555",
        marginBottom: "10px",
    },
    link: {
        color: "#3498db",
        textDecoration: "none",
    },
    tableContainer: {
        overflowX: "auto",
        marginTop: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    tableHeader: {
        backgroundColor: "#3498db",
        color: "#fff",
        padding: "10px",
        textAlign: "left",
    },
    tableCell: {
        padding: "10px",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
    },
    
};

export default Dashboard;

