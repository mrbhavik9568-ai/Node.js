import express from "express";

import orderRoutes from "./routes/orderRoutes.js";
import { generateAuthToken } from "./utils/generateToken.js";

const app = express();
const PORT = 8000;

app.use(express.json());


// ==========================================
// Generate Token - Testing Purpose
// ==========================================

app.get("/login", (req, res) => {

  const user = {
    id: 1,
    email: "user@gmail.com",
  };

  const token = generateAuthToken(user);

  res.status(200).json({
    message: "Login successful",
    token: token,
  });
});


// ==========================================
// Order Routes
// ==========================================

app.use("/", orderRoutes);


// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});