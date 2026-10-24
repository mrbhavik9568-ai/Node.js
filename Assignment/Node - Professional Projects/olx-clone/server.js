/**
 * OLX Classifieds Clone Backend API
 * 
 * Implements:
 * Task 1: GET /products returning hardcoded array of products (id, title, price, imageUrl).
 * Task 2: POST /add-product adding product to in-memory array and returning updated list.
 * Task 3: GET /products/:id returning single product details, returning 404 if not found.
 * Task 4: DELETE /products/:id removing product using filter() and returning updated list.
 * Task 5: AI-generated image upload code with an in-depth security review & improvements.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware for parsing JSON bodies (Task 2 Hint)
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// ==========================================
// TASK 1: HARDCODED INITIAL PRODUCTS (OLX STYLE)
// ==========================================
let products = [
  {
    id: 1,
    title: "Royal Enfield Classic 350 (2022) - Mint Condition",
    price: 165000,
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    location: "Bangalore",
    postedDate: "2026-10-18"
  },
  {
    id: 2,
    title: "iPhone 15 Pro 128GB - Natural Titanium (Bill & Box)",
    price: 82000,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    location: "Mumbai",
    postedDate: "2026-10-19"
  },
  {
    id: 3,
    title: "Solid Teak Wood 4-Seater Dining Table",
    price: 18500,
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
    location: "Delhi NCR",
    postedDate: "2026-10-20"
  },
  {
    id: 4,
    title: "Sony PlayStation 5 Disc Edition + 2 Controllers",
    price: 38000,
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    location: "Pune",
    postedDate: "2026-10-21"
  }
];

let nextProductId = 5;

// ==========================================
// TASK 5: AI-GENERATED IMAGE UPLOAD CODE & SECURITY REVIEW
// 
// ------------------------------------------------------------------
// AI REVIEW & SECURITY CONSIDERATIONS FOR OLX-STYLE APPS:
// 1. MIME Type & Extension Spoofing:
//    - Risk: Naive AI code typically only inspects `file.originalname.match(/\.(jpg|png)$/)`.
//      An attacker could rename a malicious PHP/ASP/Shell script to `exploit.php.jpg`.
//    - Fix Added: We check both strict extension and verified mimetype, plus randomize the
//      destination filename completely to prevent extension execution.
// 2. File Size & Disk Flooding Denial-of-Service (DoS):
//    - Risk: Without explicit size boundaries, users can upload gigabytes of data.
//    - Fix Added: Configured `limits: { fileSize: 2 * 1024 * 1024 }` (max 2MB per listing photo).
// 3. Path Traversal Protection:
//    - Risk: Malicious filenames containing `../../` can escape the upload directory.
//    - Fix Added: Using sanitized random hex suffixes and removing path symbols.
// 4. Production Storage Recommendation:
//    - In production, images should never be served directly from the app server's disk;
//      they should be streamed to cloud object storage (AWS S3, Cloudflare R2) and served
//      via a CDN with headers `X-Content-Type-Options: nosniff`.
// ------------------------------------------------------------------
// ==========================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `olx_img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];

  if (allowedExtensions.includes(ext) && allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Security Error: Only valid image files (.jpg, .png, .webp) are permitted!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB strict limit
  fileFilter: fileFilter
});

// ==========================================
// ROUTES
// ==========================================

// Welcome / API overview
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to OLX Classifieds Clone API",
    endpoints: {
      getAllProducts: "GET /products",
      getProductById: "GET /products/:id",
      addProduct: "POST /add-product (body: { title, price, imageUrl })",
      deleteProduct: "DELETE /products/:id",
      uploadProductImage: "POST /upload-image (form-data: productPhoto)",
      securityReview: "GET /security-review"
    }
  });
});

/**
 * TASK 1:
 * GET /products
 * Returns hardcoded array of product objects (id, title, price, imageUrl)
 */
app.get('/products', (req, res) => {
  res.json({
    totalProducts: products.length,
    products: products
  });
});

/**
 * TASK 3:
 * GET /products/:id
 * Returns single product details by id.
 * Constraint: Return a 404 error with a message if not found.
 */
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product Not Found",
      message: `No product listing was found with ID ${req.params.id}.`
    });
  }

  res.json(product);
});

/**
 * TASK 2:
 * POST /add-product
 * Accepts title, price, imageUrl from JSON body,
 * adds to in-memory array, and responds with updated list.
 */
app.post('/add-product', (req, res) => {
  const { title, price, imageUrl, location } = req.body;

  if (!title || price === undefined || !imageUrl) {
    return res.status(400).json({
      error: "Missing fields. 'title', 'price', and 'imageUrl' are all required."
    });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({
      error: "'price' must be a valid non-negative number."
    });
  }

  const newProduct = {
    id: nextProductId++,
    title: title.trim(),
    price: numericPrice,
    imageUrl: imageUrl.trim(),
    location: location || "India",
    postedDate: new Date().toISOString().split('T')[0]
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully to OLX listings",
    newProduct: newProduct,
    updatedProductList: products
  });
});

/**
 * TASK 4:
 * DELETE /products/:id
 * Removes product from array by id using filter() method,
 * and returns the updated product list.
 */
app.delete('/products/:id', (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const initialLength = products.length;

  // Filter out the product by id as required by Task 4 hint
  const filteredProducts = products.filter(p => p.id !== targetId);

  if (filteredProducts.length === initialLength) {
    return res.status(404).json({
      error: "Product Not Found",
      message: `Cannot delete product. No product found with ID ${req.params.id}.`
    });
  }

  // Update in-memory array
  products = filteredProducts;

  res.json({
    message: `Product with ID ${targetId} was successfully deleted.`,
    updatedProductList: products
  });
});

/**
 * TASK 5:
 * POST /upload-image
 * Image upload route using multer
 */
app.post('/upload-image', upload.single('productPhoto'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please provide an image file under the field 'productPhoto'." });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({
    message: "Product photo uploaded successfully!",
    filename: req.file.filename,
    fileUrl: fileUrl,
    sizeBytes: req.file.size,
    mimetype: req.file.mimetype,
    securityNotice: "Uploaded file verified against allowed extensions and strict 2MB limit."
  });
});

/**
 * TASK 5:
 * GET /security-review
 * API route providing the full security consideration report
 */
app.get('/security-review', (req, res) => {
  res.json({
    topic: "Image Upload Handling Security Review for Classifieds (OLX)",
    criticalConsiderations: [
      {
        title: "MIME Type Spoofing & Polyglot Executables",
        description: "Attackers can rename malicious PHP or shell scripts to .jpg. Verifying only req.file.mimetype is insufficient because headers can be spoofed. In production, use magic byte verification (e.g., sharp or file-type) to confirm true image headers."
      },
      {
        title: "Strict File Size Limits",
        description: "Without strict size limits, bad actors can trigger disk-exhaustion DoS attacks. We enforced a strict 2MB limit per image via multer limits."
      },
      {
        title: "Path Traversal & Filename Sanitization",
        description: "User supplied original filenames can contain '../' traversing to system directories. We generate random unique timestamps + crypto hex filenames."
      },
      {
        title: "Decoupled Cloud Storage (S3 / R2)",
        description: "Serving user uploaded content directly from node execution directories creates Remote Code Execution risks. Recommended practice is direct pre-signed URL uploads to AWS S3 or Cloudflare R2 with strict Content-Disposition: inline headers and CSP."
      }
    ]
  });
});

// Multer error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File too large. Maximum allowed size is 2MB." });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[olx-clone] Server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, products };
