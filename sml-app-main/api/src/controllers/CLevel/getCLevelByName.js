const CLevel = require("../../models/CLevel");

const getCLevelByName = async (Name) => {
  const regex = new RegExp(Name, "i");
  const cLevels = await CLevel.find({ Name: { $regex: regex } });
  return cLevels;
};

module.exports = getCLevelByName;
