const express = require('express');
const multer = require('multer');
const db = require('../db/db'); // Import the database connection
const router = express.Router();

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/', // temporary location to store uploaded files
  limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB
});

// POST: Create a new product
router.post('/', upload.single('media'), (req, res) => {
  const {
    title,
    description,
    status,
    type,
    vendor,
    collections,
    tags,
    category,
  } = req.body;

  const media = req.file ? req.file.path : null;

  const sql = `
    INSERT INTO products (title, description, media, status, type, vendor, collections, tags, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

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

// ✅ GET: Fetch all products
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM products ORDER BY id DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Error fetching products' });
    }
    // Convert stringified tags back to JSON
    const parsedResults = results.map(product => ({
      ...product,
      tags: JSON.parse(product.tags || '[]'),
    }));

    res.status(200).json(parsedResults);
  });
});

module.exports = router;
