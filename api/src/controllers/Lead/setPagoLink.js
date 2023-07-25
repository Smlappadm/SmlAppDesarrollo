// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para cambiar el valor de un campo específico en un documento Lead
const setPagoLink = async (body) => {
  // Verificar si el campo a cambiar es "emailApp"
  console.log(body);

  const leadUpdated = await Lead.findByIdAndUpdate(
    body.id,
    {
      $set: {
        linkActivado: true,
        linkPago: body.linkPago,
      },
    },
    { new: true }
  );

  return leadUpdated;
};

// Exportar la función 'changeLeadEmail' para su uso externo
module.exports = setPagoLink;
