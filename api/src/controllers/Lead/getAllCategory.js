const Lead = require("../../models/Lead");

const getAllCategory = async () => {
  const professions = await Lead.distinct("category", { checked: false });
  return professions;
};

module.exports = getAllCategory;
