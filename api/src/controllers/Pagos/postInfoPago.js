const Pagos = require("../../models/Pagos");

const postInfoPago = async (objeto) => {
  const infoSave = await Pagos.create(objeto);
  return infoSave;
};

module.exports = postInfoPago;
