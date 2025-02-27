const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Regular user registration
router.post("/register", register);

// User login
router.post("/login", login);

module.exports = router;