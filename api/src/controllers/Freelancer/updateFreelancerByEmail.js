// Importamos el modelo de Freelancer desde la ruta relativa "../../models/Freelancer"
const Freelancer = require("../../models/Freelancer");

// Función asincrónica para actualizar los datos de un freelancer por su dirección de correo electrónico (email)
const updateFreelancerByEmail = async (email, updatedData) => {
  // Buscamos al freelancer por su email y actualizamos sus campos con los valores proporcionados en el objeto "updatedData"
  // Utilizamos { new: true } para que se devuelva el freelancer actualizado después de realizar la actualización
  const corredor = await Freelancer.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });

  return corredor; // Devolvemos el freelancer actualizado con los cambios realizados
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = updateFreelancerByEmail;
