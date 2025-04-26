const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

module.exports = (db, SECRET) => {
  // Signup route
  router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err2) => {
        if (err2) return res.status(500).json({ message: 'Error creating user' });
        res.status(200).json({ message: 'Signup successful' });
      });
    });
  });

  // Login route
  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, results[0].password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });

  return router;
};
