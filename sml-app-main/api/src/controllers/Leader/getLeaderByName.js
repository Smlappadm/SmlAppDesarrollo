const Leader = require("../../models/Leader");

const getLeaderByName = async (name) => {
  const regex = new RegExp(name, "i");
  const leader = await Leader.find({ name: { $regex: regex } });
  return leader;
};

module.exports = getLeaderByName;
