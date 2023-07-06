const Pagos = require("../../models/Pagos");

const postInfoPago = async (info) => {
  const infoSave = await Pagos.create({info: info});
  return infoSave;
};

module.exports = postInfoPago;
