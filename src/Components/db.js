const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "databasenbad.c9s0a0wim2na.us-east-2.rds.amazonaws.com", // Replace with your MySQL host
    user: "nsurakan",      // Replace with your MySQL username
    password: "Navna*0607",      // Replace with your MySQL password
    database: "nbad_chart_data_db", // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool.promise();
