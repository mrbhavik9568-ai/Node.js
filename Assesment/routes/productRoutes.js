const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Helper to safely delete an uploaded image file
const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  const fullPath = path.isAbsolute(imagePath) ? imagePath : path.join(__dirname, '..', imagePath);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error('Error removing file:', err.message);
    }
  }
};

// GET /api/products - Get all products with category populated
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name description')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id - Get single product with category populated
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name description');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products - Create a new product (Admin only + Multer image upload)
router.post('/', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      // If validation fails and file was uploaded, remove uploaded file
      if (req.file) deleteImageFile(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required fields.'
      });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      if (req.file) deleteImageFile(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'Specified category does not exist.'
      });
    }

    // Store relative path so client can access it via static route
    const imagePath = req.file ? `uploads/${req.file.filename}` : '';

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      image: imagePath
    });

    // Populate category before responding
    await product.populate('category', 'name description');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    if (req.file) deleteImageFile(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id - Update product (Admin only + optional new image)
router.put('/:id', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      if (req.file) deleteImageFile(req.file.path);
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const { name, description, price, category } = req.body;

    // If new category provided, verify it exists
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        if (req.file) deleteImageFile(req.file.path);
        return res.status(404).json({ success: false, message: 'Specified category does not exist.' });
      }
      product.category = category;
    }

    if (name) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = Number(price);

    // If new image uploaded, remove old image and set new path
    if (req.file) {
      deleteImageFile(product.image);
      product.image = `uploads/${req.file.filename}`;
    }

    await product.save();
    await product.populate('category', 'name description');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    if (req.file) deleteImageFile(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id - Delete product (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete image file associated with product
    deleteImageFile(product.image);

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
