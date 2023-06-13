const Corredor = require("../../models/Corredor");

const updateCorredorByEmail = async (email, updatedData) => {
  const corredor = await Corredor.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });
  return corredor;
};

module.exports = updateCorredorByEmail;
