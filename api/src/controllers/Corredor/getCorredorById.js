const Corredor = require("../../models/Corredor");

const getCorredorById = async (id) => {
  const corredor = await Corredor.findById(id);
  return corredor;
};

module.exports = getCorredorById;
