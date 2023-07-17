// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para obtener un Corredor por su dirección de correo electrónico
const getCorredorByEmail = async (email) => {
  // Crear una expresión regular para buscar el correo electrónico (ignorando mayúsculas y minúsculas)
  const regex = new RegExp(email, "i");

  // Buscar un Corredor en la base de datos cuyo correo electrónico coincida con la expresión regular
  // Seleccionar solo el campo "leads" del Corredor
  // Limitar los resultados a 10 registros
  const corredor = await Corredor.findOne({ email: { $regex: regex } })
    .select("leads")
    .limit(10);

  // Verificar si se encontró un Corredor y si tiene leads
  if (corredor && corredor.leads) {
    // Filtrar los leads para obtener solo aquellos que no han sido verificados (checked = false)
    const filteredLeads = corredor.leads.filter((lead) => !lead.checked);

    // Devolver los leads filtrados si existen, de lo contrario, retornar null
    return filteredLeads.length > 0 ? filteredLeads : null;
  }

  // Si no se encontró un Corredor o no tiene leads, retornar null
  return null;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getCorredorByEmail;


