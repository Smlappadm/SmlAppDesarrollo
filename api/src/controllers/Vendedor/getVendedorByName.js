const Vendedor = require("../../models/Vendedor");

const getVendedorByName = async (name) => {
  const regex = new RegExp(name, "i"); // 'i' indica que la búsqueda es insensible a mayúsculas y minúsculas
  const vendedor = await Vendedor.find({ name: { $regex: regex } });
  return vendedor;
};

module.exports = getVendedorByName;
