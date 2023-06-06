const Corredor = require("../../models/Corredor");

const updateCorredorById = async (id, updatedData) => {
  const corredor = await Corredor.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return corredor;
};

module.exports = updateCorredorById;
