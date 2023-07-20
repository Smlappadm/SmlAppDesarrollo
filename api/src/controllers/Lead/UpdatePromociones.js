const Lead = require("../../models/Lead");

const UpdatePromociones = async (body) => {
  const { emailApp, promociones } = body;

  // Convertir las fechas de promociones a objetos Date
  const promocionesObj = {};
  for (const key in promociones) {
    promocionesObj[key] = new Date(promociones[key]);
  }

  // Buscar un único registro de lead en la colección 'Lead' que coincida con la dirección de correo electrónico de la aplicación proporcionada (emailApp)
  const client = await Lead.findOne({ emailApp });

  if (!client) {
    // Si no se encuentra el cliente, puedes manejar el caso según tus necesidades
    return null;
  }

  // Actualizar las promociones con el objeto promocionesObj
  client.promociones = promocionesObj;

  // Obtén la cantidad de promociones
  const cantidadPromociones = Object.keys(promocionesObj).length;

  // Ahora, guarda los cambios actualizados en la base de datos
  await client.save();

  return client; // Devuelve el lead actualizado y la cantidad de promociones
};

module.exports = UpdatePromociones;
