// Importar el modelo de datos del Vendedor (probablemente un esquema de Mongoose)
const Vendedor = require("../../models/Vendedor");
// Importar el modelo de datos del Lead (probablemente un esquema de Mongoose)
const Lead = require("../../models/Lead");

// Función asincrónica para obtener los leads de ventas de un vendedor por su dirección de correo electrónico
const getVendedorVentasByEmail = async (email) => {
  // Buscar todos los leads en la base de datos donde el campo "vendedor" coincide con el correo electrónico proporcionado
  // y el campo "status" es igual a "Agendar 2do llamado"
  const leads = await Lead.find({ vendedor: email, status: "Agendar 2do llamado" });

  // Ordenar los leads encontrados por fecha de llamada de venta
  const sortClients = leads.sort((a, b) => {
    // Obtener las fechas de llamada de venta (se supone que están en la propiedad "llamada_venta" del lead)
    const dateA = a.llamada_venta?.dateObject; // El operador opcional "?." se asegura de que "a.llamada_venta" exista
    const dateB = b.llamada_venta?.dateObject; // El operador opcional "?." se asegura de que "b.llamada_venta" exista

    // Comparar las fechas de llamada de venta para ordenar los leads en orden ascendente
    if (!dateA.mes) return 1; // Si dateA no tiene mes, lo coloca después de dateB
    if (!dateB.mes) return -1; // Si dateB no tiene mes, lo coloca antes de dateA

    // Compara primero por año, luego por mes, día, hora y minutos en caso de empates
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

    // Si llega hasta aquí, significa que las fechas son iguales
    return 0;
  });

  // Devolver el resultado de la consulta (los leads de ventas ordenados por fecha de llamada de venta)
  return sortClients;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getVendedorVentasByEmail;