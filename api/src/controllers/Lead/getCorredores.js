const Lead = require("../../models/Lead");

const getCorredores = async () => {
  const corredores = await Lead.find({ corredor: { $ne: "" } }).distinct(
    "corredor"
  );
  return corredores;
};

module.exports = getCorredores;
