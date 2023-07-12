const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

const postInfoPago = async (objeto) => {
  const infoSave = await Pagos.create({ info: objeto });

  let leadUpdate = {};
  // if (objeto.status === "complete") {
  // const leadUpdate = await Lead.findOne({ emailApp: objeto.email });
  leadUpdate = await Lead.findOne({ emailApp: "facutam@gmail.com" });

  leadUpdate.pagos.detallesRestantes.shift();
  leadUpdate.pagos.cuotasPagadas++;

  await Lead.updateOne(
    { emailApp: "facutam@gmail.com" },
    leadUpdate, // Pasar leadUpdate directamente como objeto de actualización
    { new: true }
  );

  return { info: infoSave, lead: leadUpdate };
};

module.exports = postInfoPago;