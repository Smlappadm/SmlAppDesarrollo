const Lead = require("../../models/Lead");

const cambioNombreVendedor = async (body) => {
  const { email, name } = body;
  const leadResult = await Lead.updateMany(
    { corredor: email },
    {
      vendedor_name: name,
    }
  );
  return leadResult;
};

module.exports = cambioNombreVendedor;
