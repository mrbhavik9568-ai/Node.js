import mongoose from "mongoose";

const playlistCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PlaylistCategory = mongoose.model(
  "PlaylistCategory",
  playlistCategorySchema
);

export default PlaylistCategory;