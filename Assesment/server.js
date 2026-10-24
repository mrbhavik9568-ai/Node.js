const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Built-in & Third-party Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check / Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to E-Commerce Product & Category REST API',
    endpoints: {
      auth: '/api/auth (register, login)',
      categories: '/api/categories (GET, POST, PUT, DELETE)',
      products: '/api/products (GET, POST, PUT, DELETE)'
    }
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Central Error Handling Middleware (Handles Multer & generic errors cleanly)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Max size allowed is 2MB.' });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err.message === 'Only JPEG and PNG images are allowed!') {
    return res.status(400).json({ success: false, message: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} -> http://localhost:${PORT}`);
});
