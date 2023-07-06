const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

const postInfoPago = async (objeto) => {
  const infoSave = await Pagos.create({info: objeto});
  
  if(objeto.status === "complete"){
  const leadUpdate = await Lead.find({ emailApp: objeto.email });

  leadUpdate.pagos.cuotasPagadas ++;
  leadUpdate.save();
  }
  
  
  
  return {info: infoSave, lead: leadUpdate};

};

module.exports = postInfoPago;
