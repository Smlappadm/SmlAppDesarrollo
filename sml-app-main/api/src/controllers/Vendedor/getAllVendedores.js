const Vendedor = require("../../models/Vendedor");

const getAllVendedores = async () => {
  try {
    const vendedores = await Vendedor.find();
    return vendedores;
  } catch (error) {
    throw new Error("No se pudieron obtener los vendedores");
  }
};

module.exports = getAllVendedores;
