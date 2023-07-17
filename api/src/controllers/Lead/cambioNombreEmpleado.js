const Lead = require("../../models/Lead");

const cambioNombreFreelancer = async (body) => {
  const { email, name } = body;
  const leadResult = await Lead.updateMany(
    { corredor: email, freelancer: true },
    {
      corredor_name: name,
      vendedor_name: name,
    }
  );
  return leadResult;
};

module.exports = cambioNombreFreelancer;
