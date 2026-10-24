import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my-orders", verifyToken, (req, res) => {

  const orders = [
    {
      orderId: 101,
      itemName: "Pizza",
    },
    {
      orderId: 102,
      itemName: "Burger",
    },
    {
      orderId: 103,
      itemName: "Pasta",
    },
  ];

  res.status(200).json({
    user: req.user,
    orders,
  });
});

export default router;