const Leader = require("../../models/Leader");

const updateLeaderById = async (id, updatedData) => {
  const leader = await Leader.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return leader;
};

module.exports = updateLeaderById;
