// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para cambiar el valor de un campo específico en un documento Lead
const setPagoLink = async (body) => {
  // Verificar si el campo a cambiar es "emailApp"
console.log(body)

    // Si es "emailApp", buscar y actualizar todos los registros que tengan el valor especificado

const lead = await Lead.find({ _id: body.id })



    // const leadsearch = await Lead.updateOne(
    //   { _id: body.id },
    //   {
    //     $set: {
    //       linkActivado: true,
    //       linkPago: body.linkPago
    //     },
    //   }
    // );



    // return leadsearch
    return lead
//     // Nota: Esta parte del código borra el valor actual de "emailApp" si hay coincidencias.

//     // No se devuelve nada aquí, ya que la función principal solo debería retornar el lead actualizado.
//   }

//   // Buscar y actualizar el campo específico del documento Lead con el nuevo valor
//   const lead = await Lead.findOneAndUpdate(
//     { _id: id },
//     { [key]: value },
//     { new: true }
//   );

//   // Devolver el documento Lead actualizado
//   return lead;
};

// Exportar la función 'changeLeadEmail' para su uso externo
module.exports = setPagoLink;
