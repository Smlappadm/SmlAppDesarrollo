const Lead = require("../../models/Lead");

const getCorredores = async () => {
  const corredores = await Lead.distinct("corredor_name", {
    freelancer: false,
  });

  return corredores;
};

module.exports = getCorredores;
