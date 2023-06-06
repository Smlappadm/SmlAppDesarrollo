const Corredor = require("../../models/Corredor");

const getAllCorredores = async () => {
  const corredor = await Corredor.find();
  return corredor;
};

module.exports = getAllCorredores;
