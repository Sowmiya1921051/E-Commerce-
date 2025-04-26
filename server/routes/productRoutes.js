const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

module.exports = (db, SECRET) => {
  // Add Product route
  router.post('/products', (req, res) => {
    const {
      product_name,
      brand,
      category,
      subcategory,
      description,
      price,
      discount_price,
      stock_quantity,
      sku,
      media_files,
      size_options,
      color_options,
      material,
      weight,
      shipping_charges,
      delivery_time,
      status,
      show_on_homepage,
      trending,
      tags,
      meta_title,
      meta_description,
      slug
    } = req.body;

    // Insert query with 22 fields and 22 placeholders
    const query = `
    INSERT INTO products (
      product_name, brand, category, subcategory, description, price, 
      discount_price, stock_quantity, sku, media_files, size_options, 
      color_options, material, weight, shipping_charges, delivery_time, 
      status, show_on_homepage, trending, tags, meta_title, meta_description, slug
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  

    const values = [
      product_name, brand, category, subcategory, description, price,
      discount_price, stock_quantity, sku, media_files, size_options,
      color_options, material, weight, shipping_charges, delivery_time,
      status, show_on_homepage, trending, tags, meta_title, meta_description, slug
    ];

    // Execute the insert query
    db.execute(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send({ error: 'Error inserting data', details: err });
      }
      res.status(200).send({ message: 'Product added successfully', productId: results.insertId });
    });
  });

  return router;
};
