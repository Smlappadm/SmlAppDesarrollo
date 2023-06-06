const CLevel = require("../../models/CLevel");

const getCLevelById = async (id) => {
  const cLevel = await CLevel.findById(id);
  return cLevel;
};

module.exports = getCLevelById;
