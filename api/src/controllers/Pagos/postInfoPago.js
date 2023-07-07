const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

const postInfoPago = async (objeto) => {

  console.log("wwwww")
  const infoSave = await Pagos.create({info: objeto});
  
  let leadUpdate = ""
  // if(objeto.status === "complete"){
  if(true){
  // const leadUpdate = await Lead.find({ emailApp: objeto.email });
  leadUpdate = await Lead.find({ emailApp: "facutam@gmail.com" });
console.log(leadUpdate)
  // leadUpdate.pagos.cuotasPagadas ++;
  // await leadUpdate.save();
  }
  
  
  

  return {info: infoSave, lead: leadUpdate};

};

module.exports = postInfoPago;
