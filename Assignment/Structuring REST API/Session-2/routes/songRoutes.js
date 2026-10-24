import express from "express";

import {
  addSong,
  getSongs,
} from "../controller/songController.js";

const router = express.Router();

router.post("/", addSong);

router.get("/", getSongs);

export default router;