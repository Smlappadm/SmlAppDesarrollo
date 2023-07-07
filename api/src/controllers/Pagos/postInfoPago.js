const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

const postInfoPago = async (objeto) => {
  const infoSave = await Pagos.create({ info: objeto });

  let leadUpdate = {};
  // if (objeto.status === "complete") {
  // const leadUpdate = await Lead.findOne({ emailApp: objeto.email });
  try {
    leadUpdate = await Lead.findOne({ emailApp: "facutam@gmail.com" });
  
    if (leadUpdate) {
      leadUpdate.pagos.detallesRestantes.shift();
      leadUpdate.pagos.cuotasPagadas++;
      await leadUpdate.save();
  
      console.log("Cambios guardados correctamente:", leadUpdate);
    } else {
      console.log("No se encontró ningún Lead con ese correo electrónico.");
    }
  } catch (error) {
    console.log("Error al guardar los cambios:", error);
  }

  return { info: infoSave, lead: leadUpdate };
};

module.exports = postInfoPago;
