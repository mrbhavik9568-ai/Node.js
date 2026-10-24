import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    artist: {
      type: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaylistCategory",
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);

export default Song;