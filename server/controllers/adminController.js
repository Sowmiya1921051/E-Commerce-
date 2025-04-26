const db = require("../db/db");
const bcrypt = require("bcryptjs");

exports.signupAdmin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password are required" });

  // Check if admin already exists
  const checkSql = "SELECT * FROM admins WHERE username = ?";
  db.query(checkSql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      return res.status(409).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertSql = "INSERT INTO admins (username, password) VALUES (?, ?)";

    db.query(insertSql, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      res.status(201).json({ message: "Admin created", id: result.insertId });
    });
  });
};

exports.getAllAdmins = (req, res) => {
  const sql = "SELECT id, username FROM admins";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    res.status(200).json(results);
  });
};