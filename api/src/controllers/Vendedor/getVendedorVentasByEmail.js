const Vendedor = require("../../models/Vendedor");

const getVendedorVentasByEmail = async (email) => {
  const vendedor = await Vendedor.findOne({ email: email });

  const filteredLeads = vendedor.leads.filter(
    (item) => item.status === "Agendar 2do llamado"
  );

  const sortClients = filteredLeads.sort((a, b) => {
    const dateA = a.llamada_venta?.dateObject;
    const dateB = b.llamada_venta?.dateObject;

    if (!dateA) return 1;
    if (!dateB) return -1;

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
  //   const sortClients = filteredLeads.sort((a, b) => {
  //     // Obtener los años de los objetos de fecha
  //     const minutosA = a.llamada_venta?.dateObject?.minutos;
  //     const minutosB = b.llamada_venta?.dateObject?.minutos;

  //     // Si alguno de los objetos de fecha es indefinido, colocarlo al final
  //     if (typeof minutosA === 'undefined') return 1;
  //     if (typeof minutosB === 'undefined') return -1;

  //     // Ordenar en función del año
  //     return minutosA - minutosB;
  //   }).sort((a, b) => {
  //     // Obtener los años de los objetos de fecha
  //     const diaA = a.llamada_venta?.dateObject?.hora;
  //     const diaB = b.llamada_venta?.dateObject?.hora;

  //     // Si alguno de los objetos de fecha es indefinido, colocarlo al final
  //     if (typeof horaA === 'undefined') return 1;
  //     if (typeof horaB === 'undefined') return -1;

  //     // Ordenar en función del año
  //     return horaA - horaB;
  //   }).sort((a, b) => {
  //     // Obtener los años de los objetos de fecha
  //     const diaA = a.llamada_venta?.dateObject?.dia;
  //     const diaB = b.llamada_venta?.dateObject?.dia;

  //     // Si alguno de los objetos de fecha es indefinido, colocarlo al final
  //     if (typeof diaA === 'undefined') return 1;
  //     if (typeof diaB === 'undefined') return -1;

  //     // Ordenar en función del año
  //     return diaA - diaB;
  //   }).sort((a, b) => {
  //     // Obtener los años de los objetos de fecha
  //     const mesA = a.llamada_venta?.dateObject?.mes;
  //     const mesB = b.llamada_venta?.dateObject?.mes;

  //     // Si alguno de los objetos de fecha es indefinido, colocarlo al final
  //     if (typeof mesA === 'undefined') return 1;
  //     if (typeof mesB === 'undefined') return -1;

  //     // Ordenar en función del año
  //     return mesA - mesB;
  //   }).sort((a, b) => {
  //     // Obtener los años de los objetos de fecha
  //     const yearA = a.llamada_venta?.dateObject?.year;
  //     const yearB = b.llamada_venta?.dateObject?.year;

  //     // Si alguno de los objetos de fecha es indefinido, colocarlo al final
  //     if (typeof yearA === 'undefined') return 1;
  //     if (typeof yearB === 'undefined') return -1;

  //     // Ordenar en función del año
  //     return yearA - yearB;
  //   });

  return sortClients;
};

module.exports = getVendedorVentasByEmail;
