const Lead = require("../../models/Lead");

const getAllCountryFreelance = async (email) => {
  const contries = await Lead.distinct("country", { checked: true, view: true, vendedor: email, status: "Sin contactar" });
  return contries;
};

module.exports = getAllCountryFreelance;