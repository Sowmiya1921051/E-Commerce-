const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');  // Required to handle file paths
require('dotenv').config();

const productRoutes = require('./routes/productRoutes'); // Import the product routes file

const app = express();
const port = 5000;
const SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to DB
db.connect(err => {
  if (err) {
    console.error('DB error:', err);
  } else {
    console.log('MySQL Connected!');
  }
});

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the folder where the images will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, Date.now() + ext); // Add a timestamp to avoid filename conflicts
  }
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage: storage });

// Image upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  // Save file details into DB if needed (Optional)
  const fileName = req.file.filename;
  const filePath = `/uploads/${fileName}`;

  // SQL Query to insert file details (optional)
  const query = 'INSERT INTO images (image_name, image_path) VALUES (?, ?)';
  db.query(query, [fileName, filePath], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Database error', error: err });
    }

    // Respond with the uploaded file's path for frontend
    res.status(200).send({
      message: 'File uploaded successfully',
      filePath: filePath,  // Path to image
    });
  });
});

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use productRoutes for product-related API requests
app.use('/api/products', productRoutes); // All /api/products routes will be handled by productRoutes

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
