const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 5000;  // Use environment port if available

// CORS middleware
app.use(cors());
app.use(express.json());

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,  // e.g., db4free.net
  user: process.env.DB_USER,  // e.g., yourusername
  password: process.env.DB_PASS,  // e.g., yourpassword
  database: process.env.DB_NAME,  // e.g., yourdbname
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Sample route to fetch data from the "users" table
app.get("/getdata", (req, res) => {
  const sql = "SELECT * FROM users";  // Change the table name accordingly
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
});

// Start the server on port 5000 or environment-defined port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
