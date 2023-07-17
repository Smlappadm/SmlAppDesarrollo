const Lead = require("../../models/Lead");

const cambioNombreCorredor = async (body) => {
  const { email, name } = body;
  const leadResult = await Lead.updateMany(
    { corredor: email },
    {
      corredor_name: name,
    }
  );
  return leadResult;
};

module.exports = cambioNombreCorredor;
