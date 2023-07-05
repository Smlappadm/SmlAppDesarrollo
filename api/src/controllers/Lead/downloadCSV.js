const Lead = require("../../models/Lead");

const dowloadCSV = async (niveles) => {
  const leads = await Lead.find({ nivel: { $in: niveles } });
  return leads;
};

module.exports = dowloadCSV;
