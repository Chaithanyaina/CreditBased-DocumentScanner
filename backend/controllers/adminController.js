const CreditRequest = require("../models/CreditRequest");
const User = require("../models/User");

// Approve or deny credit requests
exports.handleCreditRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const creditRequest = await CreditRequest.findById(requestId);

    if (status === "approved") {
      const user = await User.findById(creditRequest.userId);
      user.credits += creditRequest.requestedCredits;
      await user.save();
    }

    creditRequest.status = status;
    await creditRequest.save();

    res.status(200).json({ message: `Credit request ${status}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get all credit requests
exports.getCreditRequests = async (req, res) => {
  try {
    const requests = await CreditRequest.find({ status: "pending" })
      .populate("userId", "username");
    res.status(200).json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};