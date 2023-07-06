const Pagos = require("../../models/Pagos");

const postInfoPago = async ({info: objeto}) => {
  const infoSave = await Pagos.create(objeto);
  return infoSave;
};

module.exports = postInfoPago;
