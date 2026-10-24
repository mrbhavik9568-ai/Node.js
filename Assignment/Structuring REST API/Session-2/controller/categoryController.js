import PlaylistCategory from "../model/PlaylistCategory.js";

// =====================================
// POST /categories
// Add new category
// =====================================

export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const category = await PlaylistCategory.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// GET /categories
// Get all categories
// =====================================

export const getCategories = async (req, res) => {
  try {
    const categories = await PlaylistCategory.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// DELETE /categories/:id
// Delete category
// =====================================

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await PlaylistCategory.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};