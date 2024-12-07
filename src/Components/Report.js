import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Chart.js related modules
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
} from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale, RadialLinearScale);

function Reports() {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://138.197.45.35:3000/chart-data/reports", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const pieData = {
                    labels: response.data.map(d => d.sector),
                    datasets: [
                        {
                            label: "Adoption Rate (%)",
                            data: response.data.map(d => d.adoption_rate),
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                        },
                    ],
                };

                const barData = {
                    labels: response.data.map(d => d.sector),
                    datasets: [
                        {
                            label: "Adoption Rate (%)",
                            data: response.data.map(d => d.adoption_rate),
                            backgroundColor: "#36A2EB",
                        },
                    ],
                };

                setChartData({ pieData, barData });
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    console.log("Token expired or invalid. Redirecting to login...");
                    navigate("/");
                } else {
                    console.error("Error fetching chart data:", error);
                }
            }
        };

        fetchChartData();
    }, []);

    return (
        <div style={styles.container}>
            <h2 id="reports-header" style={styles.header}>
                AI Adoption Rates in Different Sectors
            </h2>
            {chartData ? (
                <>
                    {/* Pie Chart */}
                    <div style={styles.chartContainer} aria-labelledby="reports-header" aria-describedby="pie-chart-description">
                        <Pie data={chartData.pieData} options={{ responsive: true }} />
                    </div>
                    <p id="pie-chart-description" style={styles.text}>
                        This pie chart represents the adoption rate of AI in various sectors. The healthcare sector leads, followed by entertainment and finance, showing the increasing importance of AI technologies across industries.
                        <br />
                        <strong>Source:</strong> MySQL Database
                    </p>

                    {/* Bar Chart */}
                    <div style={styles.chartContainer} aria-labelledby="reports-header" aria-describedby="bar-chart-description">
                        <Bar data={chartData.barData} options={{ responsive: true }} />
                    </div>
                    <p id="bar-chart-description" style={styles.text}>
                        This bar chart highlights the adoption rates of AI across different sectors in a comparative format, emphasizing the dominance of healthcare and entertainment industries in leveraging AI technologies.
                        <br />
                        <strong>Source:</strong> MySQL Database
                    </p>
                </>
            ) : (
                <p style={styles.text}>Loading chart data...</p>
            )}
        </div>
    );
}

// Styling for the component
const styles = {
    container: {
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
    },
    header: {
        textAlign: "center",
        fontSize: "24px",
        color: "#690815",
        marginBottom: "20px",
    },
    chartContainer: {
        width: "90%",
        maxWidth: "600px",
        margin: "20px auto",
    },
    text: {
        fontSize: "16px",
        textAlign: "center",
        color: "#34495e",
        margin: "20px auto",
        lineHeight: "1.5",
    },
    "@media (min-width: 768px)": {
        text: {
            fontSize: "18px",
        },
        chartContainer: {
            maxWidth: "700px",
        },
    },
    "@media (max-width: 768px)": {
        text: {
            fontSize: "14px",
        },
    },
};

export default Reports;
