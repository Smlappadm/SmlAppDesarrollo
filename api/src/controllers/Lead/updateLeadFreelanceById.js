const Lead = require("../../models/Lead");
const Vendedor = require("../../models/Vendedor");
const Clientes = require("../../models/Clientes");

const updateLeadFreelanceById = async (id, updatedData) => {

  const date = new Date();
  const formattedTime = date.toISOString();
  updatedData.dataLead.updateVendedor = formattedTime;

  if(updatedData.dataLead.status === "Contratado"){
    console.log("Contratado")
    const dateContratado = new Date();
    const formattedTimeContratado = date.toISOString();
    updatedData.dataLead.updateContratado = formattedTimeContratado;
  }
  if(updatedData.dataLead.status === "Rechazado"){
    console.log("Rechazado")
    const dateRechazado = new Date();
    const formattedTimeRechazado  = date.toISOString();
    updatedData.dataLead.updateRechazado  = formattedTimeRechazado ;
  }
  if(updatedData.dataLead.status === "No responde"){
    console.log("No responde")
    const dateNoResponde = new Date();
    const formattedTimeNoResponde  = date.toISOString();
    updatedData.dataLead.updateNoResponde  = formattedTimeNoResponde ;
  }
  if(updatedData.dataLead.status === "Agendar 2do llamado"){
    console.log("Agendar 2do llamado")
    const dateSdoLlamado = new Date();
    const formattedTimeSdoLlamado  = date.toISOString();
    updatedData.dataLead.updateSegundoLlamado  = formattedTimeSdoLlamado;
  }
  if(updatedData.dataLead.status === "incidencia"){
    console.log("Incidencia")
    const dateIncidencia = new Date();
    const formattedTimeIncidencia  = date.toISOString();
    updatedData.dataLead.updateIncidencia  = formattedTimeIncidencia;
  }


  const leadCountCheck = await Lead.findById(id);

  
// console.log("111111111")
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

    
    // console.log("2222222222222")
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

    // console.log("33333333333")
    //Seteo de los detalles de los pagos
    updatedData.dataLead.pagos.detalles = [];
    updatedData.dataLead.pagos.detallesRestantes = [];

    let fechaActual = new Date();
    let prueba = new Date();
    prueba.setDate(prueba.getDate() + 7);
    updatedData.dataLead.pagos.detalles.push({
      contrato: new Date(fechaActual),
      prueba: new Date(prueba),
    });
    //poner la prueba primero
    // updatedData.dataLead.pagos.detallesRestantes.push(new Date(prueba));

    updatedData.dataLead.pagos.detallesRestantes.push("");
    let sumador = 30;
    for (let i = 1; i < updatedData.dataLead.pagos.cuotas; i++) {
      fechaActual.setDate(fechaActual.getDate() + sumador); // Sumar 30 días a la fecha actual
      updatedData.dataLead.pagos.detalles.push(new Date(fechaActual));
      updatedData.dataLead.pagos.detallesRestantes.push(new Date(fechaActual));
    }
    updatedData.dataLead.pagos.detallesRestantes.push("cierre");

    
    

    // console.log("44444444444")
    
    
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
  
  // console.log("555555555")
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

  // console.log("66666666666")
  const data = {
    leadUpdate,
    vendedor,
  };
  return data;
};

module.exports = updateLeadFreelanceById;
