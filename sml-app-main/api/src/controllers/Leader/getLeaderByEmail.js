const Leader = require("../../models/Leader");

const getLeaderByEmail = async (email) => {
  const leader = await Leader.findOne({ email: email });

  return leader;
};

module.exports = getLeaderByEmail;
