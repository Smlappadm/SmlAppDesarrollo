const Corredor = require("../../models/Corredor");

const updateLeadsCorredorByEmail = async (email, newLeads) => {
  const corredor = await Corredor.findOne({ email });

  if (!corredor) {
    throw new Error("Corredor no encontrado");
  }

  corredor.leads = newLeads;
  const updatedCorredor = await corredor.save();
  return updatedCorredor;
};

module.exports = updateLeadsCorredorByEmail;
