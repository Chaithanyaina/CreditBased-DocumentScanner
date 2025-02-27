const express = require("express");
const { authenticate } = require("../utils/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("scanHistory")
      .populate("creditRequests");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;