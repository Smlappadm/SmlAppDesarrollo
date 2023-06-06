const Vendedor = require("../../models/Vendedor");

const getVendedorByEmail = async (email) => {
  const vendedor = await Vendedor.findOne({ email: email });

  return vendedor;
};

module.exports = getVendedorByEmail;
