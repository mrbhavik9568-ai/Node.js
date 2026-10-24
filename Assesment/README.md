# E-Commerce Product & Category REST API

A clean, modular RESTful API built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, **JWT Authentication**, and **Multer** for file uploads.

---

## Section A: Conceptual Understanding

### 1. Why Express is preferred over plain Node HTTP servers for REST APIs
- **Built-in Routing**: Plain Node.js `http` module requires manually parsing URLs and matching HTTP methods (`req.url`, `req.method`) using complex `if/else` or `switch` blocks. Express provides clean, declarative routing (e.g., `router.get()`, `router.post()`).
- **Middleware Pipeline**: Express offers a standardized middleware chain (`(req, res, next) => {}`) for parsing bodies, handling authentication, logging, and input validation without deeply nested callback code.
- **Request & Response Helpers**: Express simplifies sending JSON, setting status codes, parsing query parameters, route parameters, and cookies (e.g., `res.status(200).json(...)`).
- **Error Handling**: Built-in centralized error-handling mechanism makes API error management consistent across the entire application.

---

### 2. Designing RESTful routes for products and categories
REST (Representational State Transfer) uses standard HTTP verbs applied to resource-oriented URIs:
- **Categories**:
  - `GET /api/categories` — Retrieve all categories
  - `GET /api/categories/:id` — Retrieve a specific category
  - `POST /api/categories` — Create a new category
  - `PUT /api/categories/:id` — Update an existing category
  - `DELETE /api/categories/:id` — Delete a category
- **Products**:
  - `GET /api/products` — Retrieve all products (populated with category details)
  - `GET /api/products/:id` — Retrieve a single product
  - `POST /api/products` — Create a new product (with image upload)
  - `PUT /api/products/:id` — Update a product
  - `DELETE /api/products/:id` — Delete a product

---

### 3. Middleware usage for request validation
- **Decoupling Concerns**: Middleware separates validation logic from business/controller logic. The controller only handles valid data.
- **Fail Fast Principle**: If required fields (e.g., product title, price, or valid category ObjectId) are missing or invalid, the validation middleware halts the request immediately with an HTTP 400 response, avoiding unnecessary database operations.
- **Security & Sanitization**: Validates file MIME types, limits payload sizes (e.g., Multer file size caps), and prevents injection attacks before the request reaches database queries.

---

### 4. JWT authentication flow for protected APIs
1. **Login/Authentication**: The client sends credentials (`email`, `password`) via `POST /api/auth/login`.
2. **Token Generation**: The server verifies the credentials against the database. If valid, the server signs a JSON Web Token (JWT) containing payload claims (e.g., `userId`, `role`) with a secret key.
3. **Token Transmission**: The client receives the JWT and stores it (e.g., in localStorage, secure cookie, or memory).
4. **Authorized Requests**: For subsequent requests to protected endpoints, the client attaches the token in the `Authorization` header:
   ```http
   Authorization: Bearer <token>
   ```
5. **Token Verification**: The server's `verifyToken` middleware parses the header, verifies the signature and expiration, and attaches the decoded user payload to `req.user`.
6. **Role Check**: Middleware like `isAdmin` inspects `req.user.role === 'admin'`. If valid, `next()` is called; otherwise, HTTP 403 Forbidden is returned.

---

### 5. Why API contracts are critical before frontend integration
- **Parallel Development**: Frontend and backend teams can work simultaneously without waiting for implementation completion once schemas, endpoints, request formats, and response models are agreed upon.
- **Reduced Miscommunication & Bugs**: Explicitly defines status codes, error structures, payload shapes, and field names (e.g., camelCase vs snake_case).
- **Mocking & Automated Testing**: Frontend developers can mock API responses based on the contract to build UI components and automated tests before the backend is live.
- **Consistency**: Prevents breaking changes and streamlines API evolution and versioning.

---

## Project Structure

```
├── config/
│   └── db.js                 # Mongoose database connection
├── middleware/
│   ├── auth.js               # JWT verification & Admin role guard
│   └── upload.js             # Multer upload with image type & 2MB size filter
├── models/
│   ├── Category.js           # Category Schema
│   ├── Product.js            # Product Schema with ref to Category
│   └── User.js               # User Schema (supports 'user' and 'admin' roles)
├── routes/
│   ├── authRoutes.js         # Register & Login routes (returns JWT)
│   ├── categoryRoutes.js     # Category CRUD endpoints
│   └── productRoutes.js      # Product CRUD endpoints (with Multer & populate)
├── uploads/                  # Local folder for stored images
├── .env                      # Environment variables
├── .env.example              # Example environment variables template
├── package.json              # Project dependencies & scripts
├── postman_collection.json   # Ready-to-import Postman Collection
├── server.js                 # Express server entry point
└── README.md                 # Project documentation & Theory answers
```

---

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or verify `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_api
JWT_SECRET=supersecretjwtkey_assessment_2026
```

### 3. Start the Server
```bash
# Production mode
npm start

# Development mode (auto-reload)
npm run dev
```

The server will run at `http://localhost:5000`.

---

## API Endpoints Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register user (`name`, `email`, `password`, `role`) |
| POST | `/api/auth/login` | Public | Login with `email` and `password`, returns JWT |

### Categories (`/api/categories`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/categories` | Public | Get all categories |
| GET | `/api/categories/:id` | Public | Get category by ID |
| POST | `/api/categories` | Admin | Create category (`name`, `description`) |
| PUT | `/api/categories/:id` | Admin | Update category |
| DELETE | `/api/categories/:id` | Admin | Delete category |

### Products (`/api/products`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Public | Get all products with `.populate('category')` |
| GET | `/api/products/:id` | Public | Get product by ID with `.populate('category')` |
| POST | `/api/products` | Admin | Create product with image (`multipart/form-data`) |
| PUT | `/api/products/:id` | Admin | Update product (optional new image) |
| DELETE | `/api/products/:id` | Admin | Delete product & remove its image |

---

## Postman Testing
1. Import `postman_collection.json` into Postman.
2. Run **Auth > 2. Login Admin**. The test script automatically saves the JWT token into the collection variable `{{token}}`.
3. Use the **Categories** and **Products** folders; protected routes automatically use `Bearer {{token}}`.
