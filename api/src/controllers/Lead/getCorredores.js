const Lead = require("../../models/Lead");

const getCorredor = async () => {
  const corredor = await Lead.find({ corredor: { $ne: "" } });
  return corredor;
};

module.exports = getCorredor;
