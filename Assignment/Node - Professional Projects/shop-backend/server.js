/**
 * Shop Backend API
 * 
 * Implements:
 * Task 1: Express server with GET /products returning sample products.
 * Task 2: addToCart(productId, quantity) function managing an in-memory cart array.
 * Task 3: GET /cart/total calculating subtotal, 5% delivery charge, and grand total.
 * Task 4: GET /products/search filtering products by name (case-insensitive).
 * Task 5: Request logger middleware logging every request's method, URL, and timestamp.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware for parsing JSON bodies
app.use(express.json());

// ==========================================
// TASK 5: AI-ASSISTED REQUEST LOGGER MIDDLEWARE
// Logs every request's HTTP method, URL, and timestamp
// ==========================================
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  
  // Track response completion time
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode} (${duration}ms)`);
  });

  next();
};

// Register logger middleware globally
app.use(requestLogger);

// ==========================================
// TASK 1: SAMPLE PRODUCTS DATA
// ==========================================
const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 2999,
    category: "Electronics",
    inStock: true
  },
  {
    id: 2,
    name: "Ergonomic Mechanical Keyboard",
    price: 4499,
    category: "Accessories",
    inStock: true
  },
  {
    id: 3,
    name: "Ultra-Fast Gaming Mouse",
    price: 1299,
    category: "Accessories",
    inStock: true
  },
  {
    id: 4,
    name: "4K Ultra-HD Monitor 27-inch",
    price: 18999,
    category: "Displays",
    inStock: true
  },
  {
    id: 5,
    name: "USB-C Multiport Docking Station",
    price: 3199,
    category: "Accessories",
    inStock: true
  }
];

// In-memory Shopping Cart array
let cart = [];

// ==========================================
// TASK 2: addToCart FUNCTION
// Adds product or updates quantity if already in cart
// ==========================================
function addToCart(productId, quantity) {
  const numericId = parseInt(productId, 10);
  const qty = parseInt(quantity, 10);

  if (isNaN(numericId) || isNaN(qty) || qty <= 0) {
    throw new Error("Invalid productId or quantity. Quantity must be a positive integer.");
  }

  const product = products.find(p => p.id === numericId);
  if (!product) {
    throw new Error(`Product with ID ${numericId} not found.`);
  }

  // Check if item already exists in the cart
  const existingCartItem = cart.find(item => item.productId === numericId);

  if (existingCartItem) {
    existingCartItem.quantity += qty;
    existingCartItem.itemTotal = existingCartItem.quantity * existingCartItem.price;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      itemTotal: product.price * qty
    });
  }

  return cart;
}

// Reset cart helper (useful for testing)
function clearCart() {
  cart = [];
  return cart;
}

// ==========================================
// ROUTES
// ==========================================

// Welcome / API overview
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Shop Backend API",
    endpoints: {
      products: "GET /products",
      searchProducts: "GET /products/search?q=keyboard",
      addToCart: "POST /cart/add (body: { productId, quantity })",
      viewCart: "GET /cart",
      cartTotal: "GET /cart/total",
      clearCart: "DELETE /cart"
    }
  });
});

/**
 * TASK 1:
 * GET /products
 * Returns JSON array of sample products (each with id, name, and price)
 */
app.get('/products', (req, res) => {
  res.json(products);
});

/**
 * TASK 4:
 * GET /products/search
 * Filters products by name (case-insensitive) as the user types
 */
app.get('/products/search', (req, res) => {
  const query = (req.query.q || req.query.name || "").trim().toLowerCase();

  if (!query) {
    return res.json({
      query: "",
      totalResults: products.length,
      products: products
    });
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  res.json({
    query: query,
    totalResults: filteredProducts.length,
    products: filteredProducts
  });
});

/**
 * TASK 2 & Route integration:
 * POST /cart/add
 * Calls addToCart(productId, quantity) and returns updated cart
 */
app.post('/cart/add', (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const updatedCart = addToCart(productId, quantity);
    res.json({
      message: "Item added to cart successfully",
      cart: updatedCart
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /cart - view current cart
app.get('/cart', (req, res) => {
  res.json({
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    items: cart
  });
});

/**
 * TASK 3:
 * GET /cart/total
 * Calculates and returns total price of all items in cart + 5% delivery charge (Zomato-style)
 */
app.get('/cart/total', (req, res) => {
  if (cart.length === 0) {
    return res.json({
      message: "Your cart is empty",
      items: [],
      subtotal: 0,
      deliveryCharge: 0,
      grandTotal: 0
    });
  }

  // Calculate items subtotal
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // 5% delivery charge (standard Zomato/delivery fee model)
  const deliveryChargeRate = 0.05;
  const deliveryCharge = Math.round(subtotal * deliveryChargeRate * 100) / 100;
  const grandTotal = Math.round((subtotal + deliveryCharge) * 100) / 100;

  res.json({
    billSummary: {
      itemsCount: cart.reduce((acc, i) => acc + i.quantity, 0),
      items: cart,
      subtotal: subtotal,
      deliveryFeeBreakdown: {
        rate: "5%",
        amount: deliveryCharge
      },
      grandTotal: grandTotal,
      currency: "INR"
    }
  });
});

// DELETE /cart - Clear cart
app.delete('/cart', (req, res) => {
  clearCart();
  res.json({ message: "Cart cleared successfully", cart: [] });
});

// Export app and helper functions
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[shop-backend] Server is running on http://localhost:${PORT}`);
  });
}

module.exports = { app, addToCart, clearCart, products };
