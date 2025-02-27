const express = require("express");
const { uploadDocument } = require("../controllers/scanController");
const { authenticate } = require("../utils/authMiddleware");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/upload", 
  authenticate, 
  upload.single("file"), // Add Multer middleware here
  uploadDocument
);

module.exports = router;