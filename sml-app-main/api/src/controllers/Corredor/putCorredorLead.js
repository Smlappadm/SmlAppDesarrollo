const Corredor = require("../../models/Corredor");

const putCorredorLead = async (email, leadUnchecked10) => {
  try {
    const corredor = await Corredor.findOneAndUpdate(
      { email },
      { $push: { leads: leadUnchecked10 } },
      { new: true }
    );
    console.log("Información del lead agregada correctamente:", corredor);
    return corredor;
  } catch (error) {
    console.error("Error al agregar información del lead:", error);
    throw error;
  }
};

module.exports = putCorredorLead;
