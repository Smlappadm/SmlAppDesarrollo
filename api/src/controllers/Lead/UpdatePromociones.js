// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener un lead por su dirección de correo electrónico de la aplicación (emailApp)
const UpdatePromociones = async ({ emailApp, body }) => {
  // Busca un único registro de lead en la colección 'Lead' que coincida con la dirección de correo electrónico de la aplicación proporcionada (emailApp)
  const client = await Lead.findOneAndUpdate(emailApp, { body }, { new: true });

  return client; // Devuelve el lead encontrado o 'null' si no se encuentra ninguno
};

// Exporta la función para que pueda ser utilizada en otros módulos
module.exports = UpdatePromociones;
