const CreditRequest = require("../models/CreditRequest");
const User = require("../models/User");

exports.requestCredits = async (req, res) => {
  try {
    const { requestedCredits } = req.body;
    
    // Get userId from authenticated user
    const creditRequest = new CreditRequest({
      userId: req.userId,  // Changed from req.body to req.userId
      requestedCredits
    });

    await creditRequest.save();

    // Update user's credit requests
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { creditRequests: creditRequest._id } }
    );

    res.status(201).json({ 
      message: "Credit request submitted successfully",
      requestId: creditRequest._id
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};