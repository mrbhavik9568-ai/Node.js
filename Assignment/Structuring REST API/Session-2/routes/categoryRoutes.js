import express from "express";

import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../controller/categoryController.js";

const router = express.Router();

// POST
router.post("/", addCategory);

// GET
router.get("/", getCategories);

// DELETE
router.delete("/:id", deleteCategory);

export default router;