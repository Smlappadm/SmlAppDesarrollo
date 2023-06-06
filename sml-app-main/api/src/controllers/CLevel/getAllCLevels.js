const CLevel = require("../../models/CLevel");

const getAllCLevels = async () => {
  const cLevels = await CLevel.find();
  return cLevels;
};

module.exports = getAllCLevels;
