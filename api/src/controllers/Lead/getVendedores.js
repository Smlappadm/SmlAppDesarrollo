const Lead = require("../../models/Lead");

const getVendedores = async () => {
  const vendedores = await Lead.distinct("vendedor_name", { vendedor_name: { $ne: "" } });

  const correosSet = new Set();

  vendedores.forEach((vendedor) => {
    const correo = vendedor.split("fullName=")[0];
    correosSet.add(correo);
  });

  const correos = Array.from(correosSet);

  return correos;
};

module.exports = getVendedores;
