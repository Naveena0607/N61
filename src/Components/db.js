require("dotenv").config(); // Load environment variables from .env

const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Loaded from .env
    user: process.env.DB_USER,       // Loaded from .env
    password: process.env.DB_PASSWORD, // Loaded from .env
    database: process.env.DB_NAME,   // Loaded from .env
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10, // Default to 10
    queueLimit: 0,
});

module.exports = pool.promise();
