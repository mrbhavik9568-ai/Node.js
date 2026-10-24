import express from "express";

const router = express.Router();


// ==========================================
// REGISTER
// POST /users/register
// ==========================================

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    message: "User registered successfully",
    user: {
      name,
      email,
    },
  });
});


// ==========================================
// LOGIN
// POST /users/login
// ==========================================

router.post("/login", (req, res) => {
  const { email } = req.body;

  res.status(200).json({
    message: "User login successful",
    email,
  });
});


export default router;