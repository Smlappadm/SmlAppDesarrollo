const Lead = require("../../models/Lead");
const Vendedor = require("../../models/Vendedor");
const Clientes = require("../../models/Clientes");

const updateLeadVendedorById = async (id, updatedData) => {



  const leadCountCheck = await Lead.findById(id);


  if (!updatedData.dataLead.llamados) {
    updatedData.dataLead.llamados = 0;
  }

  if (
    updatedData.dataLead.status === "No responde" &&
    leadCountCheck.llamados < 2
  ) {
    updatedData.dataLead.llamados++;
    updatedData.dataVendedor.llamados = updatedData.dataLead.llamados;
  } else if (
    updatedData.dataLead.status === "No responde" &&
    leadCountCheck.llamados === 2
  ) {
    updatedData.dataLead.llamados = 0;
    updatedData.dataLead.status = "Rechazado";
    updatedData.dataLead.status_op = "3 llamados";
    updatedData.dataVendedor.status = "Rechazado";
    updatedData.dataVendedor.status_op = "3 llamados";
  }


 
//   console.log("primero")
// console.log(updatedData.dataLead.emailApp)
// console.log("segundo")
// console.log(updatedData.dataVendedor.email)
  if (updatedData.dataLead.status === "Contratado") {
    const emailFilter = updatedData.dataLead.emailApp ? updatedData.dataLead.emailApp : updatedData.dataVendedor.email;
    const leadEmailAppUpdated = await Lead.updateMany(
      { emailApp:  { $in: [updatedData.dataLead.emailApp, updatedData.dataVendedor.email] }},
      { $set: { emailApp: ""} },
      { new: true }
    );
    console.log()

    // const emailFilter2 = updatedData.dataLead.emailApp ? updatedData.dataLead.emailApp : updatedData.dataVendedor.email;
    const filtro = { email: emailFilter};
    const nuevosValores = { email: emailFilter, name: updatedData.dataVendedor.name, rol: "organico"};
    const opciones = { upsert: true, new: true };
    const cliente = await Clientes.findOneAndUpdate(filtro, nuevosValores, opciones);
  }

  const leadUpdate = await Lead.findByIdAndUpdate(id, updatedData.dataLead, {
    new: true,
  });



  const valor = updatedData.dataVendedor;

  let vendedor = [];
  vendedor = await Vendedor.findOneAndUpdate(
    { email: updatedData.dataLead.vendedor, "leads.name": valor.name },
    { $set: { "leads.$": valor } },
    { new: true }
  );



  if (!vendedor) {
    vendedor = await Vendedor.findOneAndUpdate(
      { email: updatedData.dataLead.vendedor },
      { $addToSet: { leads: { $each: [valor] } } },
      { new: true }
    );
  } else {
    await vendedor.save();
  }

  const data = {
    leadUpdate,
    vendedor,
  };
  return data;
};

module.exports = updateLeadVendedorById;