const Vendedor = require("../../models/Vendedor");

const getVendedorById = async (id) => {
  const vendedor = await Vendedor.findById(id);
  return vendedor;
};

module.exports = getVendedorById;
