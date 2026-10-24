import Song from "../model/Song.js";
import PlaylistCategory from "../model/PlaylistCategory.js";


// =====================================
// POST /songs
// Add new song
// =====================================

export const addSong = async (req, res) => {
  try {
    const { title, artist, category } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Song title is required",
      });
    }

    // Check category
    if (category) {
      const categoryExists =
        await PlaylistCategory.findById(category);

      if (!categoryExists) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
    }

    const song = await Song.create({
      title,
      artist,
      category,
    });

    res.status(201).json({
      message: "Song added successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// GET /songs?category=categoryId
// =====================================

export const getSongs = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const songs = await Song.find(filter).populate(
      "category",
      "name"
    );

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};