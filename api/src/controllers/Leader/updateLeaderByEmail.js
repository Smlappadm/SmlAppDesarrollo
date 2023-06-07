const Leader = require("../../models/Leader");

const updateLeaderByEmail = async (email, updatedData) => {
  const leader = await Leader.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  return leader;
};

module.exports = updateLeaderByEmail;
