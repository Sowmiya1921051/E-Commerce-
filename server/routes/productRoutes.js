const express = require('express');
const multer = require('multer');
const db = require('../db/db'); // Import the database connection
const router = express.Router();

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/', // temporary location to store uploaded files
  limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB
});

// Handle product creation request
router.post('/', upload.single('media'), (req, res) => {
  const {
    title,
    description,
    status,
    type,
    vendor,
    collections,
    tags,
    category, // ✅ Added category here
  } = req.body;

  // Handle file upload (if a file is provided)
  const media = req.file ? req.file.path : null; // Store file path if uploaded

  // Create SQL query (added `category`)
  const sql = `
    INSERT INTO products (title, description, media, status, type, vendor, collections, tags, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the SQL query
  db.query(
    sql,
    [title, description, media, status, type, vendor, collections, JSON.stringify(tags), category],
    (err, result) => {
      if (err) {
        console.error('Error inserting product:', err);
        return res.status(500).json({ message: 'Error inserting product' });
      }
      res.status(200).json({ message: 'Product added successfully', productId: result.insertId });
    }
  );
});

module.exports = router;
