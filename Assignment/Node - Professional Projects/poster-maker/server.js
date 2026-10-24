/**
 * Poster Maker Backend API
 * 
 * Implements:
 * Task 1: Express server serving static HTML file at root route.
 * Task 2: GET /templates returning 5 Canva-style poster template objects.
 * Task 3: POST /design combining text and templateId into a new design object.
 * Task 4: POST /upload using multer for image/logo file uploads returning file URL.
 * Task 5: AI-assisted background color selection feature to customize design background.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static assets from 'public' directory (Task 1)
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// ==========================================
// TASK 4: MULTER FILE UPLOAD CONFIGURATION
// ==========================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate clean, safe unique filename
    const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + sanitizedOriginalName);
  }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, WEBP, and SVG images are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: fileFilter
});

// ==========================================
// TASK 2: 5 POSTER TEMPLATES (CANVA STYLE)
// ==========================================
const templates = [
  {
    id: 1,
    name: "Minimalist Modern",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    defaultBgColor: "#F3F4F6",
    textColor: "#111827",
    category: "Art & Minimal"
  },
  {
    id: 2,
    name: "Neon Cyberpunk Night",
    imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    defaultBgColor: "#0D0221",
    textColor: "#00F0FF",
    category: "Music & Party"
  },
  {
    id: 3,
    name: "Vintage Botanical",
    imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
    defaultBgColor: "#FDFBF7",
    textColor: "#3D3A37",
    category: "Nature & Retro"
  },
  {
    id: 4,
    name: "Tech Summit Pro",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
    defaultBgColor: "#0F172A",
    textColor: "#38BDF8",
    category: "Corporate & Conference"
  },
  {
    id: 5,
    name: "Sunset Beach Festival",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    defaultBgColor: "#FFF1F2",
    textColor: "#E11D48",
    category: "Festival & Summer"
  }
];

// In-memory store for created designs
let designs = [];
let nextDesignId = 1;

// ==========================================
// ROUTES
// ==========================================

/**
 * TASK 1: Root route serving index.html
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * TASK 2:
 * GET /templates
 * Returns a JSON array of 5 poster template objects (id, name, imageUrl)
 */
app.get('/templates', (req, res) => {
  res.json(templates);
});

/**
 * TASK 3 & TASK 5:
 * POST /design
 * Accepts JSON payload with text, templateId, and optional backgroundColor & logoUrl.
 * Returns a new design object combining text with selected template and background color.
 */
app.post('/design', (req, res) => {
  const { text, templateId, backgroundColor, logoUrl } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: "Poster 'text' is required." });
  }

  if (templateId === undefined || templateId === null) {
    return res.status(400).json({ error: "Field 'templateId' is required." });
  }

  const numericTemplateId = parseInt(templateId, 10);
  const selectedTemplate = templates.find(t => t.id === numericTemplateId);

  if (!selectedTemplate) {
    return res.status(404).json({
      error: `Template with ID ${templateId} not found.`
    });
  }

  // Task 5: Background color support (AI generated feature)
  // Validates hex color or falls back to template's defaultBgColor
  const chosenBgColor = (backgroundColor && /^#([0-9A-F]{3}){1,2}$/i.test(backgroundColor.trim()))
    ? backgroundColor.trim()
    : selectedTemplate.defaultBgColor;

  const newDesign = {
    designId: nextDesignId++,
    text: text.trim(),
    templateId: selectedTemplate.id,
    templateName: selectedTemplate.name,
    templateImageUrl: selectedTemplate.imageUrl,
    backgroundColor: chosenBgColor,
    logoUrl: logoUrl || null,
    createdAt: new Date().toISOString()
  };

  designs.push(newDesign);

  res.status(201).json({
    message: "Design created successfully",
    design: newDesign
  });
});

/**
 * TASK 4:
 * POST /upload
 * Multer endpoint for uploading an image (like a logo)
 * Returns the uploaded file's URL in the response
 */
app.post('/upload', upload.single('logo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a file using the 'logo' field." });
  }

  // Construct accessible URL
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({
    message: "Logo uploaded successfully",
    filename: req.file.filename,
    fileUrl: fileUrl,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

/**
 * TASK 5 (AI Feature Route):
 * PUT /design/:id/color
 * Updates the background color of an existing design
 */
app.put('/design/:id/color', (req, res) => {
  const designId = parseInt(req.params.id, 10);
  const { backgroundColor } = req.body;

  if (!backgroundColor || !/^#([0-9A-F]{3}){1,2}$/i.test(backgroundColor.trim())) {
    return res.status(400).json({
      error: "Invalid hex color format. Example: '#ff5733' or '#fff'"
    });
  }

  const design = designs.find(d => d.designId === designId);
  if (!design) {
    return res.status(404).json({ error: `Design with ID ${designId} not found.` });
  }

  design.backgroundColor = backgroundColor.trim();

  res.json({
    message: "Background color updated successfully",
    design: design
  });
});

// GET /designs - returns list of all created designs
app.get('/designs', (req, res) => {
  res.json(designs);
});

// Error handling middleware for multer / upload errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[poster-maker] Server running on http://localhost:${PORT}`);
  });
}

module.exports = { app, templates, designs };
