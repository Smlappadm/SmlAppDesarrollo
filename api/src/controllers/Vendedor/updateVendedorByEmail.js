const Vendedor = require("../../models/Vendedor");

const updateVendedorByEmail = async (email, updatedData) => {
  const vendedor = await Vendedor.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  return vendedor;
};

module.exports = updateVendedorByEmail;
