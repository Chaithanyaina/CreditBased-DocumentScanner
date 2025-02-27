const User = require("../models/User");
const cron = require("node-cron");

const resetDailyCredits = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      await User.updateMany({}, { $set: { credits: 20 } });
      console.log("Daily credits reset");
    } catch (err) {
      console.error("Credit reset error:", err);
    }
  });
};

module.exports = resetDailyCredits;