const Lead = require("../../models/Lead");

const getAllProfessionFreelance = async (email) => {
  const professions = await Lead.distinct("profesion", { checked: true, view: true, vendedor: email, status: "Sin contactar" });
  return professions;
};

module.exports = getAllProfessionFreelance;