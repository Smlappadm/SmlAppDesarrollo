const Lead = require("../../models/Lead");

const cambioNombreEmpleado = async (body) => {
  const { email, name } = body;
  const leadResult = await Lead.updateMany(
    { corredor: email },
    {
      corredor_name: name,
      freelancer: name,
    }
  );
  return leadResult;
};

module.exports = cambioNombreEmpleado;
