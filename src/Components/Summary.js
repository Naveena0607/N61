import React, { useEffect, useState } from "react";
import { Line, Pie, Radar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Chart.js related modules
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, RadialLinearScale } from 'chart.js';

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, RadialLinearScale);

function Summary() {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState(null);
    const [costReductionData, setCostReductionData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const token = localStorage.getItem("token");
                    
                // Fetch chart data with Authorization header
                const summaryResponse = await axios.get("http://localhost:3000/chart-data/summary", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChartData(summaryResponse.data);

                const costResponse = await axios.get("http://localhost:3000/chart-data/cost-reduction", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCostReductionData(costResponse.data);

                const performanceResponse = await axios.get("http://localhost:3000/chart-data/performance", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPerformanceData(performanceResponse.data);

            } catch (error) {
                // If the token is expired or invalid, handle the error
                if (error.response && error.response.status === 401) {
                    // Remove token from localStorage if expired
                    localStorage.removeItem("token");
                    console.log("Token expired or invalid. Redirecting to login...");
                    navigate("/"); // Redirect to login page
                } else {
                    console.error("Error fetching chart data:", error);
                }
            }
        };

        fetchChartData();
    },  []);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Summary of Innovations in Generative AI</h2>

            {chartData ? (
                <>
                    {/* Line Chart */}
                    <h3 style={styles.subHeader}>Trend Analysis Over Time (Line Chart)</h3>
                    <div style={styles.chartContainer}>
                        <Line data={lineChartData()} options={{ responsive: true }} />
                    </div>
                    <p style={styles.subHeader}>The line chart shows a rise in AI-related research papers from 45 in Q1 to 120 in Q4, 
                        reflecting growing interest and advancements in the field. This trend highlights increasing investment in AI innovations and academic research.</p>
                    <br/> <br/> <br/> <br/>
                    {/* Pie Chart */}
                    <h3 style={styles.subHeader}>AI Adoption by Sector (Pie Chart)</h3>
                    <div style={styles.chartContainer}>
                        <Pie data={pieChartData()} options={{ responsive: true }} />
                    </div>
                    <p style={styles.subHeader}>The pie chart highlights AI adoption, with entertainment (85%) leading, followed by finance (70%), 
                        healthcare (65%), and education (50%). It emphasizes how diverse industries are leveraging AI to enhance operations and user experience.</p>
                    <br/> <br/> <br/> <br/>
                    {/* Radar Chart */}
                    <h3 style={styles.subHeader}>AI Performance Metrics (Radar Chart)</h3>
                    <div style={styles.chartContainer}>
                        <Radar data={radarChartData()} options={{ responsive: true }} />
                    </div>
                    <p style={styles.subHeader}>The radar chart evaluates metrics like latency (90%) and storage (85%), showing strong system efficiency with room for CPU and memory improvement. 
                        These insights are critical for optimizing AI infrastructure performance</p>
                    <br/> <br/> <br/> <br/>
                    {/* Doughnut Chart */}
                    <h3 style={styles.subHeader}>Resource Allocation (Doughnut Chart)</h3>
                    <div style={styles.chartContainer}>
                        <Doughnut data={doughnutChartData()} options={{ responsive: true }} />
                    </div>
                    <p style={styles.subHeader}>The doughnut chart shows resource distribution: compute (30%), storage (25%), networking (20%), and others (25%). 
                        This balanced allocation ensures efficient functioning and scalability of AI systems across multiple use cases.</p>
                    <br/> <br/>   
                </>
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
}

// Data for the Line Chart
const lineChartData = () => ({
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
        {
            label: 'Papers Published',
            data: [45, 75, 90, 120],
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            tension: 0.1,
        },
    ],
});

// Data for the Pie Chart
const pieChartData = () => ({
    labels: ['Healthcare', 'Education', 'Finance', 'Entertainment'],
    datasets: [
        {
            data: [65, 50, 70, 85],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
    ],
});

// Data for the Radar Chart
const radarChartData = () => ({
    labels: ['CPU Usage', 'Memory Usage', 'Network Utilization', 'Latency', 'Storage Usage'],
    datasets: [
        {
            label: 'Performance Metrics',
            data: [80, 60, 75, 90, 85],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
    ],
});

// Data for the Doughnut Chart
const doughnutChartData = () => ({
    labels: ['Compute', 'Storage', 'Networking', 'Other'],
    datasets: [
        {
            data: [25, 30, 20, 25],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
    ],
});

const styles = {
    container: {
        padding: "40px",
        textAlign: "center",
    },
    chartContainer: {
        width: "50%",
        margin: "0 auto 30px",
    },
    subHeader: {
        fontSize: "20px",
        fontWeight: "500",
        color: "#34495e",
        marginBottom: "30px",
    },
    header: {
        textAlign: "center",
        fontSize: "24px",
        color: "#690815",
        marginBottom: "20px",
    },
};

export default Summary;
