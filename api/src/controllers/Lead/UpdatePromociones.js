// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener un lead por su dirección de correo electrónico de la aplicación (emailApp)
const UpdatePromociones = async (body) => {
  const { promocion1, promocion2, emailApp } = body;
  const promocion1Date = new Date(promocion1);
  const promocion2Date = new Date(promocion2);

  // Busca un único registro de lead en la colección 'Lead' que coincida con la dirección de correo electrónico de la aplicación proporcionada (emailApp)
  const client = await Lead.findOneAndUpdate(
    { emailApp },
    { promocion1: promocion1Date, promocion2: promocion2Date },
    { new: true }
  );

  return client; // Devuelve el lead encontrado o 'null' si no se encuentra ninguno
};

// Exporta la función para que pueda ser utilizada en otros módulos
module.exports = UpdatePromociones;
