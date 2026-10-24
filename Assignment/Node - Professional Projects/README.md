# Node.js & Express Professional Projects

This repository contains 7 distinct, self-contained backend projects built with Node.js and Express. As per instructions, connected tasks are grouped together into separate project folders.

---

## Summary of Projects

| Project Folder | Description | Key Tech / Features |
| :--- | :--- | :--- |
| **`insta-clone`** | Instagram-like social media backend | User profile, posts, feed (newest first), likes, seeded data |
| **`shop-backend`** | E-commerce shopping cart & product search | Products, `addToCart()`, Zomato-style 5% delivery bill, Flipkart-style search, request logger middleware |
| **`playlist-app`** | Music playlist management system | `Song` class model, `GET /songs`, `POST /songs`, input validation |
| **`poster-maker`** | Canva-style graphic design backend & UI | Static HTML Canva studio UI, 5 templates, Multer logo uploads, background color picker |
| **`movie-booking`** | BookMyShow movie ticket booking platform | `movieRoutes.js`, movie search, ticket booking, seat collision validation, 500 error middleware |
| **`olx-clone`** | Classifieds marketplace listings | Product CRUD, 404 handling, `filter()` deletion, Multer upload security review |
| **`stayez`** | Vacation rental accommodation platform | `Room` class model, `GET /rooms`, case-insensitive location search, seeded vacation homes |

---

## 1. `insta-clone`

### Tasks Implemented:
1. Express project setup, `GET /profile` endpoint returning username, followers, and bio.
2. `POST /post` endpoint accepting `imageUrl` and `caption`, storing in an in-memory array and returning unique `postId`.
3. `GET /feed` returning all posts in reverse order (newest first using `array.reverse()`) with `username` and `caption`.
4. `POST /like` taking a `postId` and incrementing its like count.
5. Seeded with 5 realistic user profiles and 10 sample posts.

### How to Run:
```bash
cd insta-clone
npm install
npm start       # Runs on port 3001
npm test        # Runs automated test suite
```

### Endpoints:
- `GET /profile` - Returns active profile (`travel_with_alex`) or `?username=...`
- `GET /profiles` - Returns all 5 seeded profiles
- `POST /post` - `{ "imageUrl": "https://...", "caption": "My photo caption" }`
- `GET /feed` - Returns all posts in reverse order
- `POST /like` - `{ "postId": 1 }`

---

## 2. `shop-backend`

### Tasks Implemented:
1. Express server with `GET /products` returning sample products (`id`, `name`, `price`).
2. `addToCart(productId, quantity)` function that adds items or updates quantity if already in the cart.
3. `GET /cart/total` calculating items total, 5% delivery charge (Zomato-style), and grand total.
4. `GET /products/search?q=...` case-insensitive search as the user types (Flipkart-style).
5. Custom request logger middleware logging method, URL, status code, and duration.

### How to Run:
```bash
cd shop-backend
npm install
npm start       # Runs on port 3002
npm test        # Runs automated test suite
```

### Endpoints:
- `GET /products` - List of products
- `GET /products/search?q=keyboard` - Search products by name
- `POST /cart/add` - `{ "productId": 1, "quantity": 2 }`
- `GET /cart` - View current items in cart
- `GET /cart/total` - Detailed bill summary with 5% delivery charge
- `DELETE /cart` - Clears the cart

---

## 3. `playlist-app`

### Tasks Implemented:
1. Express server responding with `'Welcome to Playlist App'` on `GET /`.
2. `Song` model using a JavaScript class in `song.js` with `title`, `artist`, and `duration` (in seconds).
3. `GET /songs` returning all songs in JSON format.
4. `POST /songs` accepting `title`, `artist`, and `duration`, returning updated song list.
5. AI-assisted input validation ensuring `duration` is a positive number and `title` is not empty.

### How to Run:
```bash
cd playlist-app
npm install
npm start       # Runs on port 3003
npm test        # Runs automated test suite
```

### Endpoints:
- `GET /` - Responds with `'Welcome to Playlist App'`
- `GET /songs` - Returns list of all songs
- `POST /songs` - `{ "title": "Starboy", "artist": "The Weeknd", "duration": 230 }`

---

## 4. `poster-maker`

### Tasks Implemented:
1. Express server serving static HTML at the root route (`public/index.html`).
2. `GET /templates` returning 5 Canva-style poster templates (`id`, `name`, `imageUrl`).
3. `POST /design` accepting `text` and `templateId`, returning a combined design object.
4. `POST /upload` using `multer` to handle image/logo uploads and returning the file URL.
5. AI-generated background color selection feature integrated into design creation and editing (`PUT /design/:id/color`).

### How to Run:
```bash
cd poster-maker
npm install
npm start       # Runs on port 3004
npm test        # Runs automated test suite
```
Open `http://localhost:3004` in your browser to use the interactive Canva-style studio!

### Endpoints:
- `GET /` - Interactive Canva-like poster creation studio
- `GET /templates` - List of 5 poster templates
- `POST /design` - `{ "text": "Tech Summit", "templateId": 1, "backgroundColor": "#0f172a" }`
- `POST /upload` - Multipart form upload (`logo` field)
- `PUT /design/:id/color` - `{ "backgroundColor": "#ff5733" }`

---

## 5. `movie-booking`

### Tasks Implemented:
1. `movieRoutes.js` route returning 5 upcoming movies (`title`, `language`, `releaseDate`) at `GET /movies`.
2. `POST /book-ticket` accepting `movieId`, `seatNumber`, and `userEmail`, returning confirmation.
3. `GET /search-movies?q=...` case-insensitive title search like BookMyShow using `Array.filter()` and `.toLowerCase()`.
4. Error handling middleware (`err, req, res, next`) returning a 500 status code JSON response.
5. AI-generated seat collision validation preventing duplicate seat bookings.

### How to Run:
```bash
cd movie-booking
npm install
npm start       # Runs on port 3005
npm test        # Runs automated test suite
```

### Endpoints:
- `GET /movies` - List of upcoming movies (add `?simulateError=true` to test 500 error middleware)
- `GET /search-movies?q=avatar` - Search movies by title
- `POST /book-ticket` - `{ "movieId": 1, "seatNumber": "E12", "userEmail": "user@example.com" }`
- `GET /booked-seats/:movieId` - View booked seats for a movie

---

## 6. `olx-clone`

### Tasks Implemented:
1. `GET /products` returning hardcoded array of products (`id`, `title`, `price`, `imageUrl`).
2. `POST /add-product` accepting product data via JSON body and returning updated list.
3. `GET /products/:id` returning product details with 404 error if not found.
4. `DELETE /products/:id` removing product by id using `filter()` and returning updated list.
5. Image upload endpoint (`POST /upload-image`) using Multer accompanied by an in-depth security analysis in `SECURITY_REVIEW.md`.

### How to Run:
```bash
cd olx-clone
npm install
npm start       # Runs on port 3006
npm test        # Runs automated test suite
```

### Endpoints:
- `GET /products` - View all product listings
- `GET /products/:id` - View single product (returns 404 if not found)
- `POST /add-product` - `{ "title": "MacBook Air", "price": 89000, "imageUrl": "..." }`
- `DELETE /products/:id` - Delete listing by ID
- `POST /upload-image` - Multipart image upload
- `GET /security-review` - API route summarizing security considerations

---

## 7. `stayez`

### Tasks Implemented:
1. Vacation rental platform entry file `app.js` displaying `'Welcome to StayEZ'` on homepage.
2. `Room` model in `room.js` with `title`, `location`, `price`, and `amenities` (array).
3. `GET /rooms` endpoint returning hardcoded array of room objects in JSON format.
4. `GET /rooms/search?location=...` filtering rooms matching the given location using `req.query`.
5. Seeded with 5 realistic room listings across vacation destinations (Goa, Manali, Jaipur, Munnar, Mumbai).

### How to Run:
```bash
cd stayez
npm install
npm start       # Runs on port 3007
npm test        # Runs automated test suite
```

### Endpoints:
- `GET /` - Displays `'Welcome to StayEZ'`
- `GET /rooms` - Returns all 5 seeded room listings
- `GET /rooms/search?location=Goa` - Search rooms by location (case-insensitive)
- `POST /rooms` - Add a new vacation room listing
