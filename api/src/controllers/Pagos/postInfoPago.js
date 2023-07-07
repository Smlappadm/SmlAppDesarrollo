const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

const postInfoPago = async (objeto) => {
  const infoSave = await Pagos.create({ info: objeto });

  let leadUpdate = "";
  if (objeto.status === "complete") {
    // const leadUpdate = await Lead.findOne({ emailApp: objeto.email });
    const leadUpdate = await Lead.findOne({ emailApp: "facutam@gmail.com" });

    if (leadUpdate) {
      leadUpdate.pagos.detallesRestantes.shift();
      leadUpdate.pagos.cuotasPagadas++;
      await leadUpdate.save();

      console.log(leadUpdate);
    } else {
      console.log("No se encontró ningún Lead con ese correo electrónico.");
    }
  }

  return { info: infoSave, lead: leadUpdate };
};

module.exports = postInfoPago;
