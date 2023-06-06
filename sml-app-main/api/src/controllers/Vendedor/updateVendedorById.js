const Vendedor = require("../../models/Vendedor");

const updateVendedorById = async (id, updatedData) => {
  const vendedor = await Vendedor.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return vendedor;
};

module.exports = updateVendedorById;
