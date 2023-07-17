const Lead = require("../../models/Lead");

const cambioNombreLeader = async (body) => {
  const { email, name } = body;

  const corredorUpdateResult = await Lead.updateMany(
    { corredor: email },
    { $set: { corredor_name: name } }
  );

  const vendedorUpdateResult = await Lead.updateMany(
    { vendedor: email },
    { $set: { vendedor_name: name } }
  );

  return {
    corredorUpdateResult,
    vendedorUpdateResult,
  };
};

module.exports = cambioNombreLeader;
