const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

const postInfoPago = async (objeto) => {


  const infoSave = await Pagos.create({info: objeto});
  
  let leadUpdate = ""
  if(objeto.status === "complete"){
  // if(true){
  const leadUpdate = await Lead.find({ emailApp: objeto.email });
  // leadUpdate = await Lead.updateOne({ emailApp: "facutam@gmail.com" });
  // leadUpdate = await Lead.updateOne(
  //   { emailApp: objeto.email},
  //   {
  //     $set: {
  //       status: "Sin contactar",
  //       status_op: "",
  //       llamados: 0,
  //       vendedor: "",
  //       vendedor_name: "",
  //       corredor: "",
  //       corredor_name: "",
  //       checked: false,
  //       freelancer: false,
  //       view: false,
  //       deleted: false,
  //     },
  //   }
  // );
  console.log(leadUpdate)
  // leadUpdate.pagos.cuotasPagadas ++;
  // await leadUpdate.save();
  }
  
  
  

  return {info: infoSave, lead: leadUpdate};

};

module.exports = postInfoPago;
