const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

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

// Import routes
const authRoutes = require('./routes/auth')(db, SECRET);
app.use('/api', authRoutes);
const productRoutes = require('./routes/productRoutes')(db, SECRET); // ✅
app.use('/api', productRoutes); // ✅ matches /api/products



app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
