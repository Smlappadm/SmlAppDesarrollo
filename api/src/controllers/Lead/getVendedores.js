const Lead = require("../../models/Lead");

const getVendedores = async () => {
  const vendedores = await Lead.distinct("vendedor_name", {
    freelancer: false,
  });

  return vendedores;
};

module.exports = getVendedores;
