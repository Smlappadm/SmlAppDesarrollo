const Lead = require("../../models/Lead");
const Vendedor = require("../../models/Vendedor");

const updateLeadVendedorById = async (id, updatedData) => {

  // const VendedorArrays = Vendedor.find({
  //   $or: [
  //     { leads_contacted: updatedData.dataVendedor.status },
  //     { declined_leads: updatedData.dataVendedor.status },
  //     { unanswered_leads: updatedData.dataVendedor.status },
  //   ]
  // });

  const leadCountCheck = await Lead.findById(id);
  // console.log(VendedorArrays);
  
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