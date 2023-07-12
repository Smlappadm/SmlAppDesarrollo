const Lead = require("../../models/Lead");

const getFreelancers = async () => {
  const corredores = await Lead.distinct("corredor_name", {
    freelancer: true,
  });

  return corredores;
};

module.exports = getFreelancers;
