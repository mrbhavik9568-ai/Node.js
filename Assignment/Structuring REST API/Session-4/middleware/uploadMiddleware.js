import multer from "multer";
import path from "path";

// ==========================================
// TASK 1 - AVATAR STORAGE
// ==========================================

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatars/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});


// Avatar file validation
const avatarFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"));
  }
};


// ==========================================
// TASK 1 & 2 - AVATAR UPLOAD
// ==========================================

export const uploadAvatar = multer({
  storage: avatarStorage,

  // Maximum 1 MB
  limits: {
    fileSize: 1024 * 1024,
  },

  fileFilter: avatarFilter,
});


// ==========================================
// TASK 3 - POST IMAGE STORAGE
// ==========================================

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "post-images/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});


// ==========================================
// TASK 5 - FILE EXTENSION VALIDATION
// ==========================================

const postImageFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return cb(
      new Error(
        "Only JPG, JPEG, PNG and GIF files are allowed"
      )
    );
  }

  cb(null, true);
};


// ==========================================
// POST IMAGE UPLOAD
// ==========================================

export const uploadPostImage = multer({
  storage: postStorage,
  fileFilter: postImageFilter,
});