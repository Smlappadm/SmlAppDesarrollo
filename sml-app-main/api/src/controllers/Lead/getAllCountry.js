const Lead = require("../../models/Lead");

const getAllCountry = async () => {
  const contries = await Lead.distinct("country", { checked: false });
  return contries;
};

module.exports = getAllCountry;