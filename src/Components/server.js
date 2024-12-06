const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./db");
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Mock credentials (for testing)
//const USERNAME = "Naveena";
//const PASSWORD = "Naveena";
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key"; // Replace with a strong secret key

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login endpoint

app.post("/login", async(req, res) => {
    const { username, password } = req.body;

    /*// Check if credentials are valid
    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({ token });
    }
    
    return res.status(401).json({ message: "Invalid credentials" });*/
    try {
        // Fetch user from database
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = rows[0];

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "30m" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Protected route example
/*app.get("/protected", (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return res.status(200).json({ message: "Protected data", user: decoded });
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
});*/

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ message: 'Access denied, token missing' });
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(401).json({ message: 'Invalid or expired token' });
      req.user = user;
      next(); // Proceed to the next middleware/route handler
    });
  };



app.get("/chart-data/summary", authenticateJWT,async (req, res) => {
    try {
        const [rows] = await db.query("SELECT quarter, papers_published FROM summary_data");
        const labels = rows.map(row => row.quarter);
        const data = rows.map(row => row.papers_published);
        console.log(data)
        res.json({
            labels,
            datasets: [
                {
                    label: "AI Innovations (Number of Papers Published)",
                    data,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        });
    } catch (error) {
        console.error("Error fetching summary data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint: Get cost reduction data for D3 graph
app.get("/chart-data/cost-reduction", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT resource, reduction FROM cost_reduction");
      res.json(rows);
    } catch (err) {
      console.error("Error fetching cost reduction data:", err);
      res.status(500).json({ message: "Error fetching cost reduction data" });
    }
  });
  
  // Endpoint: Get performance metrics data for D3 graph
  app.get("/chart-data/performance", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT quarter, CPU, Latency, IOPS FROM performance_metrics");
      res.json(rows);
    } catch (err) {
      console.error("Error fetching performance metrics data:", err);
      res.status(500).json({ message: "Error fetching performance metrics data" });
    }
  });



  app.get("/chart-data/reports", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT sector, adoption_rate FROM reports_data");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching reports data:", err);
        res.status(500).json({ message: "Error fetching reports data" });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));