const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

const postInfoPago = async (info) => {
  const infoSave = await Pagos.create({info: info});
  
  // if(infoSave)
  // const leadUpdate = await Lead.findOneAndUpdate(
  //   { emailApp: objeto.email },
  //   { },
  //   { new: true }
  // );
  
  
  
  return infoSave;

};

module.exports = postInfoPago;
