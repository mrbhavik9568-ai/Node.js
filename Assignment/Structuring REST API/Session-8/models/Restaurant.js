import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: String,
});

export default mongoose.model("Restaurant", restaurantSchema);