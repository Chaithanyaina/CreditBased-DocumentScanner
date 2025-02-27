const express = require("express");
const router = express.Router();
const { 
  handleCreditRequest,
  getCreditRequests 
} = require("../controllers/adminController");
const { authenticate, adminCheck } = require("../utils/authMiddleware");

// Admin-only routes
router.get("/credit-requests", authenticate, adminCheck, getCreditRequests);
router.post("/handle-request", authenticate, adminCheck, handleCreditRequest);

module.exports = router;