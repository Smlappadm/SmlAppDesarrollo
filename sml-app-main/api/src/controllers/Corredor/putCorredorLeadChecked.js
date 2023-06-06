const Corredor = require("../../models/Corredor");

const putCorredorLeadChecked = async (email, leadChecked) => {
  try {
    const corredor = await Corredor.findOneAndUpdate(
      { email, "leads._id": leadChecked.id },
      { $set: { "leads.$[leadId].checked": true } },
      { new: true, arrayFilters: [{ "leadId._id": leadChecked.id }] }
    );
    console.log("Información del lead actualizada correctamente:", corredor);
    return corredor;
  } catch (error) {
    console.error("Error al actualizar información del lead:", error);
    throw error;
  }
};

module.exports = putCorredorLeadChecked;
