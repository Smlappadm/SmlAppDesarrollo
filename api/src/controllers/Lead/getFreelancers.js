const Lead = require("../../models/Lead");

const getFreelancers = async () => {
  const corredores = await Lead.distinct("corredor_name", {
    freelancer: true,
  });

  const correosSet = new Set();

  corredores.forEach((corredor) => {
    const correo = corredor.split("fullName=")[0];
    correosSet.add(correo);
  });

  const correos = Array.from(correosSet);

  return corredores;
};

module.exports = getFreelancers;
