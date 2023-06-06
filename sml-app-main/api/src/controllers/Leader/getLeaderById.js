const Leader = require("../../models/Leader");

const getLeaderById = async (id) => {
  const leader = await Leader.findById(id);
  return leader;
};

module.exports = getLeaderById;
