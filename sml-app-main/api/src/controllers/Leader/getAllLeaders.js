const Leader = require("../../models/Leader");

const getAllLeaders = async () => {
  const leaders = await Leader.find();
  return leaders;
};

module.exports = getAllLeaders;
