const Vendedor = require("../../models/Vendedor");
const Lead = require("../../models/Lead");

const getVendedorVentasByEmail = async (email) => {

  const leads = await Lead.find({ vendedor: email, status: "Agendar 2do llamado"});



  const sortClients = leads.sort((a, b) => {
  // const sortClients = filteredLeads.sort((a, b) => {
    const dateA = a.llamada_venta?.dateObject;
    const dateB = b.llamada_venta?.dateObject;

    if (!dateA.mes) return 1;
    if (!dateB.mes) return -1;

    if (dateA.year !== dateB.year) {
      return dateA.year - dateB.year;
    }

    if (dateA.mes !== dateB.mes) {
      return dateA.mes - dateB.mes;
    }

    if (dateA.dia !== dateB.dia) {
      return dateA.dia - dateB.dia;
    }

    if (dateA.hora !== dateB.hora) {
      return dateA.hora - dateB.hora;
    }

    if (dateA.minutos !== dateB.minutos) {
      return dateA.minutos - dateB.minutos;
    }

    return 0;
  });
  

  return sortClients;
};

module.exports = getVendedorVentasByEmail;
