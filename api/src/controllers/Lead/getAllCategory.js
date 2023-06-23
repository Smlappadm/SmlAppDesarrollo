const Lead = require("../../models/Lead");

const getAllCategory = async () => {
  const categories = await Lead.distinct("category", { checked: false });
  return categories;
};

module.exports = getAllCategory;
