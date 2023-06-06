const Lead = require("../../models/Lead");

const getAllProfession = async () => {
  const professions = await Lead.distinct("profesion", { checked: false });
  return professions;
};

module.exports = getAllProfession;
