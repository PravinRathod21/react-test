// backend/server.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = 5000;

// CORS middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Route
app.get("/getdata", (req, res) => {
  const sql = "SELECT * FROM users"; // change table name
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
