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

  if (updatedData.dataLead.status === "Contratado") {
    //Busca un registro que tenga ese emailApp para borrarselo, porque luego se añadira a un nuevo lead
    const emailFilter = updatedData.dataLead.emailApp
      ? updatedData.dataLead.emailApp
      : updatedData.dataVendedor.email;
    const leadEmailAppUpdated = await Lead.updateMany(
      {
        emailApp: {
          $in: [updatedData.dataLead.emailApp, updatedData.dataVendedor.email],
        },
      },
      { $set: { emailApp: "" } },
      { new: true }
    );

    //Setea el Cliente con el email filtado del modelo Cliente
    const filtro = { email: emailFilter };
    const nuevosValores = {
      email: emailFilter,
      name: updatedData.dataVendedor.name,
      rol: "organico",
    };
    const opciones = { upsert: true, new: true };
    const cliente = await Clientes.findOneAndUpdate(
      filtro,
      nuevosValores,
      opciones
    );

    //Seteo de los detalles de los pagos
    updatedData.dataLead.pagos.detalles = [];

    let fechaActual = new Date();
    let prueba = new Date();
    prueba.setDate(prueba.getDate() + 7);
    updatedData.dataLead.pagos.detalles.push({ contrato: fechaActual, prueba: prueba });
    
    let sumador = 0;
    for (let i = 0; i < updatedData.dataLead.pagos.cuotas; i++) {
      fechaActual.setDate(fechaActual.getDate() + sumador);
      updatedData.dataLead.pagos.detalles.push(new Date(fechaActual));
      sumador += 30;
    }
  
    // let detallesArray = [];
    // fechaActual.setDate(fechaActual.getDate() + 30);
    // var diaActualizado = fechaActual.getDate();
    // var mesActualizado = fechaActual.getMonth();
    // console.log(
    //   "Fecha actualizada: " + diaActualizado + "-" + (mesActualizado + 1)
    // );

    // updatedData.dataLead.pagos.detalle =
  }

  // se setea el nuevo lead con la info nueva, incluyendo el emailApp
  if (updatedData.dataLead.emailApp === "") {
    updatedData.dataLead.emailApp = updatedData.dataVendedor.email;
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
