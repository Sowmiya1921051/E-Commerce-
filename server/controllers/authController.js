const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Make sure dotenv is loaded at the start of your app
require('dotenv').config();

exports.signup = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  db.query("SELECT * FROM admins WHERE username = ?", [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password (outside of db.query callback to avoid using async in a callback)
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: "Password hashing failed" });

      db.query(
        "INSERT INTO admins (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Failed to create user" });
          }
          return res.status(201).json({ message: "User created successfully" });
        }
      );
    });
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  db.query("SELECT * FROM admins WHERE username = ?", [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Ensure that JWT_SECRET is loaded correctly
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  });
};


// Optional: simple get API to fetch admins
exports.getAdmins = (req, res) => {
  db.query("SELECT id, username FROM admins", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch admins" });
    res.status(200).json(results);
  });
};
