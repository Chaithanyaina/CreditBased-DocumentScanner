const mongoose = require("mongoose");

const creditRequestSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "User ID is required"] 
  },
  requestedCredits: { 
    type: Number, 
    required: [true, "Requested credits amount is required"],
    min: [1, "Minimum 1 credit required"]
  },
  status: { 
    type: String, 
    enum: ["pending", "approved", "denied"], 
    default: "pending" 
  },
  requestDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("CreditRequest", creditRequestSchema);