const express = require("express");
const { requestCredits } = require("../controllers/creditController");
const { authenticate } = require("../utils/authMiddleware");

const router = express.Router();

router.post("/request", authenticate, requestCredits);

module.exports = router;