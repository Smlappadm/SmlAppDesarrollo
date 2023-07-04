const Pagos = require("../../models/Pagos");

const limpiezaBaseFunction = async (info) => {
  const infoSave = await Pagos.create({info: info});
  return infoSave;
};

module.exports = limpiezaBaseFunction;
