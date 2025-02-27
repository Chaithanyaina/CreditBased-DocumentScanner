const Document = require("../models/Document");
const User = require("../models/User");
const { textMatching } = require("../utils/textMatching");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

exports.uploadDocument = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const content = await readFile(req.file.path, "utf8");
    
    if (user.credits < 1) {
      // Clean up uploaded file if credits insufficient
      await promisify(fs.unlink)(req.file.path);
      return res.status(400).json({ error: "Insufficient credits" });
    }

    const document = new Document({
      userId: req.userId,
      filename: req.file.originalname,
      content,
      uploadDate: new Date()
    });

    await document.save();
    user.credits -= 1;
    user.scanHistory.push(document._id);
    await user.save();

    const matches = await textMatching(content);
    res.status(200).json({ 
      message: "Document scanned successfully",
      matches,
      remainingCredits: user.credits
    });

  } catch (err) {
    // Clean up file on error
    if (req.file) await promisify(fs.unlink)(req.file.path);
    res.status(400).json({ error: err.message });
  }
};